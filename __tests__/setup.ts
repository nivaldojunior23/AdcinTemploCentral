import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock matchMedia (utilizado para detecção de tema do sistema operacional em Header.tsx)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // depreciado
    removeListener: vi.fn(), // depreciado
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo (utilizado nas funções de rolagem suave para seções em Header e Hero)
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
});

// Mock IntersectionObserver (fundamental para o Framer Motion whileInView funcionar sem travar no JSDOM)
class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock de framer-motion para evitar atrasos em animações de saída (AnimatePresence) e warnings
vi.mock("framer-motion", () => {
  const React = require("react");
  
  // Função para criar componentes React padrão no lugar de motion.*
  const dummyComponent = (tagName: string) => {
    const Component = React.forwardRef<HTMLElement, { children?: React.ReactNode } & Record<string, unknown>>(({ children, ...props }, ref) => {
      // Remove propriedades exclusivas do Framer Motion para evitar warnings do HTML
      const {
        initial,
        animate,
        exit,
        transition,
        variants,
        whileInView,
        viewport,
        ...cleanProps
      } = props;
      
      return React.createElement(tagName, { ...cleanProps, ref }, children);
    });
    Component.displayName = `Motion(${tagName})`;
    return Component;
  };

  return {
    motion: {
      div: dummyComponent("div"),
      h1: dummyComponent("h1"),
      h2: dummyComponent("h2"),
      p: dummyComponent("p"),
      span: dummyComponent("span"),
      img: dummyComponent("img"),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
  };
});
