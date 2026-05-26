import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache on server/CDN for 1 hour to prevent API quota depletion

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID || process.env.YOUTUBE_CHANNEL_I;

  // Mock data for graceful fallback if environment variables are not yet configured or fail
  const mockVideo = {
    id: "z_5qxDDBwn0",
    title: "A Importância da Oração — Devocional Diário",
    thumbnail: "/_MG_9831.jpg", // high quality fallback image
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    url: "https://youtube.com/@adcintemplocentral",
    isMock: true,
  };

  // If no environment variables are set, return mock data immediately
  if (
    !apiKey || 
    apiKey === "SUA_YOUTUBE_API_KEY_AQUI" || 
    !channelId || 
    channelId === "SEU_YOUTUBE_CHANNEL_ID_AQUI"
  ) {
    console.log("YouTube API credentials not configured. Returning mock data.");
    return NextResponse.json(mockVideo);
  }

  try {
    // 1. Fetch the 25 latest videos from the channel to ensure we have standard videos (e.g. cuts and devotionals)
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&key=${apiKey}&maxResults=25`;
    
    const searchResponse = await fetch(searchUrl, {
      next: { revalidate: 3600 } // 1 hour caching in Next.js
    });

    if (!searchResponse.ok) {
      console.warn(`YouTube Search API returned status ${searchResponse.status}. Falling back to mock data.`);
      return NextResponse.json(mockVideo);
    }

    const searchData = await searchResponse.json();
    
    if (!searchData.items || searchData.items.length === 0) {
      console.warn("YouTube Search API returned empty list. Falling back to mock data.");
      return NextResponse.json(mockVideo);
    }

    // 2. Extract video IDs to query their details/durations
    const videoIds = searchData.items.map((item: { id: { videoId: string } }) => item.id.videoId).filter(Boolean);
    if (videoIds.length === 0) {
      console.warn("No video IDs found in search results. Falling back to mock data.");
      return NextResponse.json(mockVideo);
    }

    // 3. Query the v3/videos endpoint for contentDetails (duration) and snippet
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds.join(",")}&key=${apiKey}`;
    const videosResponse = await fetch(videosUrl, {
      next: { revalidate: 3600 }
    });

    if (!videosResponse.ok) {
      console.warn(`YouTube Videos API returned status ${videosResponse.status}. Falling back to mock data.`);
      return NextResponse.json(mockVideo);
    }

    const videosData = await videosResponse.json();
    if (!videosData.items || videosData.items.length === 0) {
      console.warn("YouTube Videos API returned empty details. Falling back to mock data.");
      return NextResponse.json(mockVideo);
    }

    // Sort videosData.items to match the original chronological order of videoIds
    const orderedVideos = [...videosData.items].sort((a: any, b: any) => {
      return videoIds.indexOf(a.id) - videoIds.indexOf(b.id);
    });

    // Helper to parse ISO 8601 duration (e.g., PT1H2M10S, PT45S, PT1M) to seconds
    const parseISO8601Duration = (durationStr: string): number => {
      const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
      const matches = durationStr.match(regex);
      if (!matches) return 0;
      
      const hours = parseInt(matches[1] || '0', 10);
      const minutes = parseInt(matches[2] || '0', 10);
      const seconds = parseInt(matches[3] || '0', 10);
      
      return hours * 3600 + minutes * 60 + seconds;
    };

    // 4. Find the first video that is between 60 seconds (not a Short) and 45 minutes (preaching cuts and devotionals)
    let selectedVideo = null;
    for (const item of orderedVideos) {
      const durationStr = item.contentDetails?.duration || "";
      const durationSeconds = parseISO8601Duration(durationStr);
      
      // Target only preaching cuts and devotionals (between 1 and 45 minutes)
      if (durationSeconds > 60 && durationSeconds < 2700) {
        selectedVideo = item;
        break;
      }
    }

    // 5. Fallback if all recent uploads are Shorts or full Lives (very unlikely but ensures stability)
    if (!selectedVideo) {
      console.warn("All recent fetched uploads are Shorts or full Lives. Using the first video as fallback.");
      selectedVideo = orderedVideos[0];
    }

    const videoId = selectedVideo.id;
    const title = selectedVideo.snippet.title;
    // Get maximum quality thumbnail if possible, fallback to high or medium
    const thumbnail = selectedVideo.snippet.thumbnails.maxres?.url || 
                      selectedVideo.snippet.thumbnails.high?.url || 
                      selectedVideo.snippet.thumbnails.medium?.url;
    const publishedAt = selectedVideo.snippet.publishedAt;

    const formattedVideo = {
      id: videoId,
      title: title,
      thumbnail: thumbnail,
      publishedAt: publishedAt,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      isMock: false,
    };

    return NextResponse.json(formattedVideo);
  } catch (error) {
    console.error("Error fetching YouTube video:", error);
    // Graceful degradation
    return NextResponse.json(mockVideo);
  }
}
