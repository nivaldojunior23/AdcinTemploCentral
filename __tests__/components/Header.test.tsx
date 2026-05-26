import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, describe, vi, beforeEach, afterEach } from "vitest";
import Header from "@/components/Header";

describe("Componente Header", () => {
  beforeEach(() => {
    // Limpa o body e localStorage antes de cada teste
    document.body.className = "";
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("deve renderizar o logo e todos os links de navegacao", () => {
    render(<Header />);

    // Verifica a marca/logo
    expect(screen.getByText("Templo Central")).toBeInTheDocument();

    // Verifica os links principais
    expect(screen.getByText("Início")).toBeInTheDocument();
    expect(screen.getByText("Sobre Nós")).toBeInTheDocument();
    expect(screen.getByText("Cultos")).toBeInTheDocument();
    expect(screen.getByText("Vídeos")).toBeInTheDocument();
    expect(screen.getByText("Estudos")).toBeInTheDocument();
    expect(screen.getByText("Localização")).toBeInTheDocument();
  });

  test("deve alternar o tema entre claro e escuro ao clicar no toggle", () => {
    render(<Header />);

    const themeToggle = screen.getByLabelText("Alternar tema") as HTMLInputElement;
    expect(themeToggle).not.toBeChecked(); // Inicialmente no tema claro
    expect(document.body.classList.contains("dark-mode")).toBe(false);

    // Altera para tema escuro
    fireEvent.click(themeToggle);
    expect(themeToggle).toBeChecked();
    expect(document.body.classList.contains("dark-mode")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");

    // Retorna para tema claro
    fireEvent.click(themeToggle);
    expect(themeToggle).not.toBeChecked();
    expect(document.body.classList.contains("dark-mode")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  test("deve carregar o tema previamente salvo do localStorage na inicializacao", () => {
    localStorage.setItem("theme", "dark");

    render(<Header />);

    const themeToggle = screen.getByLabelText("Alternar tema") as HTMLInputElement;
    expect(themeToggle).toBeChecked();
    expect(document.body.classList.contains("dark-mode")).toBe(true);
  });

  test("deve alternar o estado do menu hambuguer mobile ao clicar no checkbox", () => {
    render(<Header />);

    const menuToggle = screen.getByRole("checkbox", { name: "" }) as HTMLInputElement;
    // O id do input checkbox do menu e "menu-toggle"
    const checkbox = document.getElementById("menu-toggle") as HTMLInputElement;
    
    expect(checkbox).not.toBeNull();
    expect(checkbox.checked).toBe(false);

    // Abre o menu
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    // Fecha o menu
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
