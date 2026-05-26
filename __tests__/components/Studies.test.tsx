import { render, screen, fireEvent, act } from "@testing-library/react";
import { expect, test, describe, vi, beforeEach, afterEach } from "vitest";
import Studies from "@/components/Studies";

describe("Componente Studies", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("deve renderizar o titulo da secao e o card do material de estudo", () => {
    render(<Studies />);

    expect(screen.getByText("Estudos e Sermões")).toBeInTheDocument();
    expect(
      screen.getByText(/Aprofunde-se na Palavra com materiais, esboços e slides dos nossos estudos e sermões/i)
    ).toBeInTheDocument();

    // Valida o card do estudo 'Identidade'
    expect(screen.getByText("Identidade")).toBeInTheDocument();
    expect(screen.getByText("Material completo com slides e anotações do sermão.")).toBeInTheDocument();

    const accessBtn = screen.getByText("Acessar Material");
    expect(accessBtn).toBeInTheDocument();
    expect(accessBtn).toHaveAttribute(
      "href",
      "https://drive.google.com/drive/folders/1z8BIYng0VzO4jLmLzbyUd1mekA1RVHkc?usp=drive_link"
    );
  });

  test("deve exibir a notificacao de redirecionamento (Toast) ao clicar no botao de material e sumir apos 3 segundos", () => {
    render(<Studies />);

    // Toast nao deve existir ou nao estar ativo antes do clique
    expect(screen.queryByText("Redirecionando para o material...")).toBeNull();

    const accessBtn = screen.getByText("Acessar Material");
    fireEvent.click(accessBtn);

    // O Toast deve aparecer imediatamente
    expect(screen.getByText("Redirecionando para o material...")).toBeInTheDocument();

    // Avanca o tempo do cronometro em 3 segundos envelopado no act para renderizar o estado do React 18
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // O Toast deve sumir apos a conclusao do temporizador
    expect(screen.queryByText("Redirecionando para o material...")).toBeNull();
  });
});
