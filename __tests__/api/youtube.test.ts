import { GET } from "@/app/api/youtube/route";
import { expect, test, describe, vi, beforeEach, afterEach } from "vitest";

describe("YouTube API Route", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  test("deve retornar o video simulado (mock) quando as variaveis de ambiente nao estao configuradas", async () => {
    process.env.YOUTUBE_API_KEY = "";
    process.env.YOUTUBE_CHANNEL_ID = "";

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.isMock).toBe(true);
    expect(data.title).toBe("A Importância da Oração — Devocional Diário");
    expect(data.id).toBe("z_5qxDDBwn0");
  });

  test("deve retornar o video simulado (mock) se as variaveis contiverem os placeholders padroes", async () => {
    process.env.YOUTUBE_API_KEY = "SUA_YOUTUBE_API_KEY_AQUI";
    process.env.YOUTUBE_CHANNEL_ID = "SEU_YOUTUBE_CHANNEL_ID_AQUI";

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.isMock).toBe(true);
  });

  test("deve buscar com sucesso da API do Google se as chaves forem validas", async () => {
    process.env.YOUTUBE_API_KEY = "chave-de-api-valida";
    process.env.YOUTUBE_CHANNEL_ID = "id-do-canal-valido";

    const fetchMock = vi.spyOn(global, "fetch").mockImplementation((url) => {
      const urlString = url.toString();
      if (urlString.includes("googleapis.com/youtube/v3/search")) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              items: [{ id: { videoId: "youtube-video-123" } }]
            }),
            { status: 200 }
          )
        );
      }
      if (urlString.includes("googleapis.com/youtube/v3/videos")) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              items: [{
                id: "youtube-video-123",
                snippet: {
                  title: "Mensagem de Fe e Esperanca",
                  thumbnails: {
                    high: { url: "https://exemplo.com/thumb.jpg" }
                  },
                  publishedAt: "2026-05-25T15:00:00Z"
                },
                contentDetails: {
                  duration: "PT15M30S" // 15min e 30s
                }
              }]
            }),
            { status: 200 }
          )
        );
      }
      return Promise.reject(new Error("URL nao mockada"));
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.isMock).toBe(false);
    expect(data.id).toBe("youtube-video-123");
    expect(data.title).toBe("Mensagem de Fe e Esperanca");
    expect(data.thumbnail).toBe("https://exemplo.com/thumb.jpg");
    expect(data.url).toBe("https://www.youtube.com/watch?v=youtube-video-123");

    fetchMock.mockRestore();
  });

  test("deve se recuperar graciosamente e retornar o video simulado em caso de erro de rede na API do Google", async () => {
    process.env.YOUTUBE_API_KEY = "chave-de-api-valida";
    process.env.YOUTUBE_CHANNEL_ID = "id-do-canal-valido";

    const fetchMock = vi.spyOn(global, "fetch").mockImplementation(() => {
      return Promise.reject(new Error("Erro de conexao com a API do Google"));
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.isMock).toBe(true);
    expect(data.title).toBe("A Importância da Oração — Devocional Diário");

    fetchMock.mockRestore();
  });
});
