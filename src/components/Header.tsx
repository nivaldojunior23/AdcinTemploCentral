"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme === "dark" || (!savedTheme && prefersDark) ? "dark" : "light";
    
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  // Handle scroll events for transparent-to-opaque and scroll-spy
  useEffect(() => {
    const handleScroll = () => {
      // Background scroll effect
      setScrolled(window.scrollY > 50);

      // Scroll Spy to highlight active section
      const sections = ["inicio", "sobre", "cultos", "youtube", "estudos", "localizacao"];
      const scrollPosition = window.scrollY + 120; // offset for header

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
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
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-container">
        <a href="#inicio" onClick={(e) => scrollToSection(e, "inicio")} className="logo">
          <div className="logo-wrapper">
            <img
              src="/adcinvetor.svg"
              alt="Adcin Logo"
              className="logo-img-dark"
            />
          </div>
          <span>Templo Central</span>
        </a>

        {/* Menu Toggle for Mobile */}
        <input 
          type="checkbox" 
          id="menu-toggle" 
          className="menu-checkbox" 
          checked={menuOpen} 
          onChange={() => setMenuOpen(!menuOpen)}
        />
        <label htmlFor="menu-toggle" className="menu-icon">
          {menuOpen ? <i className="fas fa-times" aria-hidden="true"></i> : <i className="fas fa-bars" aria-hidden="true"></i>}
        </label>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          <ul>
            <li>
              <a 
                href="#inicio" 
                onClick={(e) => scrollToSection(e, "inicio")}
                className={activeSection === "inicio" ? "active" : ""}
              >
                Início
              </a>
            </li>
            <li>
              <a 
                href="#sobre" 
                onClick={(e) => scrollToSection(e, "sobre")}
                className={activeSection === "sobre" ? "active" : ""}
              >
                Sobre Nós
              </a>
            </li>
            <li>
              <a 
                href="#cultos" 
                onClick={(e) => scrollToSection(e, "cultos")}
                className={activeSection === "cultos" ? "active" : ""}
              >
                Cultos
              </a>
            </li>
            <li>
              <a 
                href="#youtube" 
                onClick={(e) => scrollToSection(e, "youtube")}
                className={activeSection === "youtube" ? "active" : ""}
              >
                Vídeos
              </a>
            </li>
            <li>
              <a 
                href="#estudos" 
                onClick={(e) => scrollToSection(e, "estudos")}
                className={activeSection === "estudos" ? "active" : ""}
              >
                Estudos
              </a>
            </li>
            <li>
              <a 
                href="#localizacao" 
                onClick={(e) => scrollToSection(e, "localizacao")}
                className={activeSection === "localizacao" ? "active" : ""}
              >
                Localização
              </a>
            </li>
            <li>
              {/* Theme Switch Switcher */}
              <label className="theme-switch" htmlFor="theme-toggle">
                <input
                  type="checkbox"
                  id="theme-toggle"
                  aria-label="Alternar tema"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                />
                <div className="slider">
                  <div className="knob">
                    {theme === "dark" ? (
                      <i className="fas fa-moon" style={{ fontSize: 12, color: "#6366f1" }} aria-hidden="true"></i>
                    ) : (
                      <i className="fas fa-sun" style={{ fontSize: 12, color: "#f59e0b" }} aria-hidden="true"></i>
                    )}
                  </div>
                </div>
              </label>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
