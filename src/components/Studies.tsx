"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";

export default function Studies() {
  const [showToast, setShowToast] = useState(false);

  const handleRedirect = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <section id="estudos" className="study section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Estudos e Sermões
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Aprofunde-se na Palavra com materiais, esboços e slides dos nossos
          estudos e sermões.
        </motion.p>

        <div className="study-grid">
          <motion.div 
            className="study-card"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          >
            <div className="study-icon">
              <BookOpen size={30} />
            </div>
            
            <div className="study-content">
              <h3>Identidade</h3>
              <p className="study-desc">
                Material completo com slides e anotações do sermão.
              </p>
            </div>
            
            <a
              href="https://drive.google.com/drive/folders/1z8BIYng0VzO4jLmLzbyUd1mekA1RVHkc?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary study-btn"
              onClick={handleRedirect}
            >
              Acessar Material
              <ExternalLink size={16} style={{ marginLeft: 8 }} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Toast Notification Container */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            className="custom-toast show"
            initial={{ opacity: 0, y: 30, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            Redirecionando para o material...
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
