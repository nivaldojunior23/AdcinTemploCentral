import { render, screen, waitFor } from "@testing-library/react";
import { expect, test, describe, vi, beforeEach, afterEach } from "vitest";
import YouTubeSection from "@/components/YouTubeSection";

describe("Componente YouTubeSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("deve renderizar o esqueleto de carregamento (skeleton) inicialmente", async () => {
    // Retorna uma promessa que nao resolve imediatamente para simular carregamento continuo
    const fetchMock = vi.spyOn(global, "fetch").mockImplementation(() => {
      return new Promise(() => {});
    });

    render(<YouTubeSection />);

    // Deve conter classes de esqueleto de carregamento
    const skeletons = document.getElementsByClassName("skeleton");
    expect(skeletons.length).toBeGreaterThan(0);

    fetchMock.mockRestore();
  });

  test("deve renderizar os detalhes do ultimo video recebido da API do youtube", async () => {
    const mockVideoResponse = {
      id: "teste-youtube-123",
      title: "Uma Vida Transformada pelo Evangelho",
      thumbnail: "/test-image.jpg",
      publishedAt: "2026-05-24T18:00:00Z",
      url: "https://www.youtube.com/watch?v=teste-youtube-123",
      isMock: false,
    };

    const fetchMock = vi.spyOn(global, "fetch").mockImplementation(() => {
      return Promise.resolve(
        new Response(JSON.stringify(mockVideoResponse), { status: 200 })
      );
    });

    render(<YouTubeSection />);

    // Aguarda o fim do estado de loading e exibicao dos dados do video
    await waitFor(() => {
      expect(screen.getByText("Uma Vida Transformada pelo Evangelho")).toBeInTheDocument();
    });

    expect(screen.getByText("Último Vídeo")).toBeInTheDocument();
    expect(screen.getByAltText("Uma Vida Transformada pelo Evangelho")).toHaveAttribute("src", "/test-image.jpg");
    expect(screen.getByText("Assistir Agora")).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=teste-youtube-123"
    );

    // Valida a data formatada: 24 de maio de 2026
    expect(screen.getByText(/24 de maio de 2026/i)).toBeInTheDocument();

    fetchMock.mockRestore();
  });

  test("deve renderizar mensagem de erro e botao para o canal principal em caso de falha na API", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockImplementation(() => {
      return Promise.reject(new Error("Erro de rede"));
    });

    render(<YouTubeSection />);

    // Aguarda a exibicao do fallback de erro
    await waitFor(() => {
      expect(
        screen.getByText(/Não foi possível carregar o último vídeo no momento. Visite nosso canal diretamente/i)
      ).toBeInTheDocument();
    });

    const channelBtn = screen.getByText("Acessar Canal do YouTube");
    expect(channelBtn).toBeInTheDocument();
    expect(channelBtn).toHaveAttribute("href", "https://youtube.com/@adcintemplocentral");

    fetchMock.mockRestore();
  });
});
