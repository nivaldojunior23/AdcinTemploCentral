"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
  isMock: boolean;
}

export default function YouTubeSection() {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        const res = await fetch("/api/youtube");
        if (res.ok) {
          const data = await res.json();
          setVideo(data);
        }
      } catch (err) {
        console.error("Failed to load latest YouTube video", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestVideo();
  }, []);

  // Format date helper (e.g. "21 de Maio de 2026")
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <section id="youtube" className="youtube-section section bg-light">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Mensagens & Devocionais
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Acompanhe nossas ministrações, devocionais e mensagens edificantes diretamente no YouTube. 
          Um espaço preparado para fortalecer a sua jornada de fé onde quer que você esteja.
        </motion.p>

        {loading ? (
          /* Loading Skeleton card */
          <div className="youtube-hero-card">
            <div className="youtube-thumbnail-container skeleton" />
            <div className="youtube-info-container" style={{ flex: 0.8, display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="skeleton skeleton-text" style={{ width: "30%", height: 30, borderRadius: 20 }} />
              <div className="skeleton skeleton-text" style={{ width: "90%", height: 28 }} />
              <div className="skeleton skeleton-text" style={{ width: "80%", height: 28 }} />
              <div className="skeleton skeleton-text" style={{ width: "50%", height: 20 }} />
              <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
                <div className="skeleton" style={{ width: 140, height: 48, borderRadius: 9999 }} />
                <div className="skeleton" style={{ width: 160, height: 48, borderRadius: 9999 }} />
              </div>
            </div>
          </div>
        ) : video ? (
          /* High-Fidelity Video Hero Card */
          <motion.div 
            className="youtube-hero-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
          >
            {/* Left side: Video Thumbnail & Play trigger overlay */}
            <div className="youtube-thumbnail-container">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="youtube-thumbnail"
              />
              <a 
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="youtube-play-btn"
                aria-label="Assistir no YouTube"
              >
                <i className="fas fa-play" style={{ marginLeft: 6 }} aria-hidden="true"></i>
              </a>
            </div>

            {/* Right side: Video Info */}
            <div className="youtube-info-container">
              <span className="youtube-badge">
                <i className="fab fa-youtube" style={{ color: "#ff0000", marginRight: 6, fontSize: "1rem" }} aria-hidden="true"></i> Último Vídeo
              </span>
              
              <h3 className="youtube-title">{video.title}</h3>
              
              <p className="youtube-date">
                <i className="far fa-calendar-alt" style={{ marginRight: 8, verticalAlign: "middle" }} aria-hidden="true"></i>
                {formatDate(video.publishedAt)}
              </p>

              <div className="youtube-btn-group">
                <a 
                  href={video.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn youtube-btn-watch"
                >
                  Assistir Agora
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="align-center" style={{ padding: 40 }}>
            <p className="section-subtitle">Não foi possível carregar o último vídeo no momento. Visite nosso canal diretamente.</p>
            <a 
              href="https://youtube.com/@adcintemplocentral" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Acessar Canal do YouTube
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
