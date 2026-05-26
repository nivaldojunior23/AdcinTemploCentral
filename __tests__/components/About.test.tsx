import { render, screen, fireEvent, act } from "@testing-library/react";
import { expect, test, describe, vi, beforeEach, afterEach } from "vitest";
import About from "@/components/About";

describe("Componente About", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("deve renderizar os textos quem somos e historia da igreja", () => {
    render(<About />);

    expect(screen.getByText("QUEM SOMOS")).toBeInTheDocument();
    expect(screen.getByText("Somos uma família de fé.")).toBeInTheDocument();
    expect(
      screen.getByText(/Uma igreja firmada na Palavra, que ama o Senhor Jesus e comprometida em cuidar de pessoas/i)
    ).toBeInTheDocument();
  });

  test("deve carregar os dots de navegacao do slider de imagens e mudar o slide ativo ao clicar", () => {
    render(<About />);

    // Deve ter 6 slides de imagem (conforme definido em slides array)
    const dots = screen.getAllByRole("button", { name: /Ir para foto/i });
    expect(dots).toHaveLength(6);

    // O primeiro slide deve estar ativo inicialmente
    expect(dots[0]).toHaveClass("active");
    expect(dots[1]).not.toHaveClass("active");

    // Clica no segundo dot
    fireEvent.click(dots[1]);
    expect(dots[1]).toHaveClass("active");
    expect(dots[0]).not.toHaveClass("active");

    // Clica no ultimo dot
    fireEvent.click(dots[5]);
    expect(dots[5]).toHaveClass("active");
    expect(dots[1]).not.toHaveClass("active");
  });

  test("deve avancar o slide automaticamente a cada 3 segundos", () => {
    render(<About />);

    const dots = screen.getAllByRole("button", { name: /Ir para foto/i });
    expect(dots[0]).toHaveClass("active");

    // Avanca o tempo do cronometro em 3 segundos envelopado no act para renderizar o estado do React 18
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(dots[1]).toHaveClass("active");
    expect(dots[0]).not.toHaveClass("active");

    // Avanca mais 3 segundos
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(dots[2]).toHaveClass("active");
    expect(dots[1]).not.toHaveClass("active");
  });
});
