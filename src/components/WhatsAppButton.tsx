"use client";

import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="https://wa.me/5591988254884?text=A%20paz%20do%20Senhor%2C%20quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20Templo%20Central"
      className={`floating-whatsapp ${show ? "show-btn" : ""}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
    >
      <i className="fab fa-whatsapp" style={{ color: "white" }} aria-hidden="true"></i>
    </a>
  );
}
