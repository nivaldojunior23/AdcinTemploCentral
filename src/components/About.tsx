"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { src: "/IMG_0313.jpg", alt: "Comunhão 1" },
  { src: "/_MG_9677.jpg", alt: "Comunhão 2" },
  { src: "/_MG_9704.jpg", alt: "Comunhão 3" },
  { src: "/_MG_9819.jpg", alt: "Comunhão 4" },
  { src: "/_MG_9846.jpg", alt: "Comunhão 5" },
  { src: "/_MG_9878.jpg", alt: "Comunhão 6" },
];

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="sobre" className="about section">
      <div className="container about-container">
        {/* About Text - animate on scroll */}
        <motion.div 
          className="about-text"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2>QUEM SOMOS</h2>
          <h3>Somos uma família de fé.</h3>
          <p>
            Uma igreja firmada na Palavra, que ama o Senhor Jesus e
            comprometida em cuidar de pessoas.
          </p>
          <p>
            Cremos que a igreja não é um prédio, é gente. <br />
            Não é um evento, é comunhão. <br />
            Não é apenas um culto, é um estilo de vida. <br />
          </p>
          <p>
            Não importa de onde você vem ou qual é a sua história, na nossa
            casa sempre haverá um lugar especial para você. Junte-se a nós
            nesta jornada de fé!
          </p>
        </motion.div>

        {/* Interactive Image Slider */}
        <motion.div 
          className="about-image-wrapper"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="about-image">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentSlide}
                src={slides[currentSlide].src}
                alt={slides[currentSlide].alt}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8 }}
                style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
              />
            </AnimatePresence>
          </div>
          
          {/* Slides navigation dots */}
          <div className="about-slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                aria-label={`Ir para foto ${index + 1}`}
                onClick={() => setCurrentSlide(index)}
                className={`about-slider-dot ${index === currentSlide ? "active" : ""}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
