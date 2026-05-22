"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Location() {
  return (
    <section id="localizacao" className="location section">
      <div className="container align-center">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Onde Estamos
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Estamos de portas abertas esperando por você. Venha nos fazer uma
          visita!
        </motion.p>

        <div className="location-content">
          {/* Info Card - slides from left */}
          <motion.div 
            className="location-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3>Endereço</h3>
            <p>
              <MapPin size={22} style={{ flexShrink: 0 }} /> 
              <span>Cidade Nova III, R. SN 06, 100 - Cidade Nova, Ananindeua - PA, 67130-820</span>
            </p>
            <p>
              <a
                href="https://wa.me/5591988254884?text=A%20paz%20do%20Senhor%2C%20quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20Templo%20Central"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <Phone size={22} style={{ flexShrink: 0 }} /> 
                <span>(91) 98825-4884</span>
              </a>
            </p>
            <p>
              <Mail size={22} style={{ flexShrink: 0 }} />
              <span>adcin.tc@gmail.com</span>
            </p>
          </motion.div>

          {/* Map Container - slides from right */}
          <motion.div 
            className="location-map"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.679014502915!2d-48.4057302!3d-1.3692777999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a46002680bafab%3A0x437493a6b086c09!2sADCIN%20-%20Templo%20Central!5e0!3m2!1spt-BR!2sbr!4v1773232418049!5m2!1spt-BR!2sbr"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            >
            </iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
