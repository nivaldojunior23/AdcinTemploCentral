"use client";

export default function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
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
    <footer className="footer">
      <div className="container footer-container">
        {/* Column 1: Brand Info */}
        <div className="footer-brand">
          <h3>Adcin Templo Central</h3>
          <p>Uma igreja família para você e sua casa.</p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-links">
          <h4>Navegação</h4>
          <ul>
            <li>
              <a href="#inicio" onClick={(e) => scrollToSection(e, "inicio")}>
                Início
              </a>
            </li>
            <li>
              <a href="#sobre" onClick={(e) => scrollToSection(e, "sobre")}>
                Sobre Nós
              </a>
            </li>
            <li>
              <a href="#cultos" onClick={(e) => scrollToSection(e, "cultos")}>
                Cultos
              </a>
            </li>
            <li>
              <a href="#youtube" onClick={(e) => scrollToSection(e, "youtube")}>
                Vídeos
              </a>
            </li>
            <li>
              <a href="#estudos" onClick={(e) => scrollToSection(e, "estudos")}>
                Estudos
              </a>
            </li>
            <li>
              <a href="#localizacao" onClick={(e) => scrollToSection(e, "localizacao")}>
                Localização
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Connect Info */}
        <div className="footer-social">
          <h4>Conecte-se conosco</h4>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/adcin.templocentral?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.facebook.com/adcin.templocentral"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.youtube.com/@adcintemplocentral."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Adcin Templo Central. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
