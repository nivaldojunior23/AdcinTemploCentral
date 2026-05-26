"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const scrollToLocation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("localizacao");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="inicio" className="hero">
      {/* Premium Ambient Corner Glows from post graphic */}
      <div className="hero-glows" />
      
      {/* Visual background animated particles overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/40 pointer-events-none" style={{ zIndex: 2 }} />
      
      {/* Minimalist corner tags from post graphic */}
      <div className="hero-decor-tag top-left"></div>
      <div className="hero-decor-tag bottom-left"></div>
      <div className="hero-decor-tag bottom-right">CRTC</div>
      
      <div className="hero-content container" style={{ position: "relative", zIndex: 3 }}>
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          UMA FAMÍLIA <br /> <span className="highlight-text">PARA PERTENCER</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          A ADCIN – Templo Central é uma casa onde pessoas reais encontram um
          Deus real, onde ninguém precisa fingir ser perfeito para ser amado,
          onde caminhamos juntos, aprendendo a seguir a Cristo todos os dias.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="https://www.youtube.com/@adcintemplocentral./streams"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Assista Online
          </a>
          <a 
            href="#localizacao" 
            onClick={scrollToLocation} 
            className="btn btn-secondary"
          >
            Como Chegar
          </a>
        </motion.div>
      </div>
    </section>
  );
}
