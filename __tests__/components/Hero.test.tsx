import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, describe, vi, beforeEach } from "vitest";
import Hero from "@/components/Hero";

describe("Componente Hero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("deve renderizar o titulo principal, descricao e botoes", () => {
    render(<Hero />);

    // Verifica o titulo principal com quebra de linha
    expect(screen.getByText(/UMA FAMÍLIA/i)).toBeInTheDocument();
    expect(screen.getByText(/PARA PERTENCER/i)).toBeInTheDocument();

    // Verifica a descricao de boas-vindas
    expect(
      screen.getByText(/A ADCIN – Templo Central é uma casa onde pessoas reais encontram um Deus real/i)
    ).toBeInTheDocument();

    // Verifica os botoes de acao
    const watchOnlineBtn = screen.getByText("Assista Online");
    const getDirectionsBtn = screen.getByText("Como Chegar");

    expect(watchOnlineBtn).toBeInTheDocument();
    expect(watchOnlineBtn).toHaveAttribute(
      "href",
      "https://www.youtube.com/@adcintemplocentral./streams"
    );

    expect(getDirectionsBtn).toBeInTheDocument();
    expect(getDirectionsBtn).toHaveAttribute("href", "#localizacao");
  });

  test("deve disparar a rolagem suave ao clicar em Como Chegar se o elemento existir", () => {
    // Cria um elemento mockado no DOM com o ID 'localizacao'
    const dummyElement = document.createElement("div");
    dummyElement.setAttribute("id", "localizacao");
    // Mock getBoundingClientRect para evitar undefined errors
    dummyElement.getBoundingClientRect = vi.fn().mockReturnValue({ top: 500 });
    document.body.appendChild(dummyElement);

    render(<Hero />);

    const getDirectionsBtn = screen.getByText("Como Chegar");
    fireEvent.click(getDirectionsBtn);

    // Verifica se a funcao window.scrollTo mockada no setup.ts foi chamada
    expect(window.scrollTo).toHaveBeenCalled();

    // Limpa o DOM criado para este teste
    document.body.removeChild(dummyElement);
  });
});
