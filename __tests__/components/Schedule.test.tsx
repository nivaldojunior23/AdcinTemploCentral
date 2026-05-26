import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "vitest";
import Schedule from "@/components/Schedule";

describe("Componente Schedule", () => {
  test("deve renderizar o titulo da secao e a grade de cultos", () => {
    render(<Schedule />);

    expect(screen.getByText("Nossos Cultos e Reuniões")).toBeInTheDocument();
    expect(
      screen.getByText(/Reserve um tempo para estar na casa de Deus. Escolha o melhor horário para você e sua família/i)
    ).toBeInTheDocument();

    // Deve renderizar os 5 cultos da lista
    expect(screen.getByText("Culto do Meio Dia")).toBeInTheDocument();
    expect(screen.getByText("Culto de Ensino")).toBeInTheDocument();
    expect(screen.getByText("Escola Bíblica")).toBeInTheDocument();
    
    // Como temos dois cultos com o nome 'Culto de Adoração' (quarta e domingo),
    // podemos verificar se a quantidade retornada de matches do titulo e de 2 elementos
    const cultosAdoracao = screen.getAllByText("Culto de Adoração");
    expect(cultosAdoracao).toHaveLength(2);

    // Valida dias e horarios especificos da grade
    expect(screen.getByText("Segunda a Sexta")).toBeInTheDocument();
    expect(screen.getByText("12:00")).toBeInTheDocument();

    expect(screen.getByText("Quarta-Feira")).toBeInTheDocument();
    expect(screen.getAllByText("19:00")).toHaveLength(2);

    expect(screen.getAllByText("Domingo")).toHaveLength(2);
    expect(screen.getByText("08:00")).toBeInTheDocument();
    expect(screen.getByText("18:00")).toBeInTheDocument();
    
    // Valida alguma descricao de culto
    expect(
      screen.getByText("Pausa diária para buscar a presença de Deus, clamar vitórias e fortalecer o espírito no meio do dia.")
    ).toBeInTheDocument();
  });
});
