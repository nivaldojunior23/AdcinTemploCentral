import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, describe, vi, beforeEach } from "vitest";
import WhatsAppButton from "@/components/WhatsAppButton";

describe("Componente WhatsAppButton", () => {
  beforeEach(() => {
    // Restaura a rolagem para 0 antes do teste
    window.scrollY = 0;
  });

  test("deve renderizar o botao de WhatsApp com link correto e iniciar sem a classe de exibicao", () => {
    render(<WhatsAppButton />);

    const whatsappLink = screen.getByLabelText("Fale conosco no WhatsApp");
    expect(whatsappLink).toBeInTheDocument();
    expect(whatsappLink).toHaveAttribute("target", "_blank");
    expect(whatsappLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(whatsappLink.getAttribute("href")).toContain("wa.me/5591988254884");

    // Inicialmente nao deve ter a classe show-btn (scrollY e 0)
    expect(whatsappLink).not.toHaveClass("show-btn");
    expect(whatsappLink).toHaveClass("floating-whatsapp");
  });

  test("deve adicionar a classe show-btn ao rolar a pagina mais de 400px", () => {
    render(<WhatsAppButton />);

    const whatsappLink = screen.getByLabelText("Fale conosco no WhatsApp");
    expect(whatsappLink).not.toHaveClass("show-btn");

    // Simula a rolagem para 500px (maior que 400px)
    Object.defineProperty(window, "scrollY", { value: 500, writable: true });
    fireEvent.scroll(window);

    // O botao deve agora conter a classe show-btn
    expect(whatsappLink).toHaveClass("show-btn");

    // Simula rolar de volta para cima
    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    fireEvent.scroll(window);

    // A classe show-btn deve ser removida
    expect(whatsappLink).not.toHaveClass("show-btn");
  });
});
