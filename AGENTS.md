# AGENTS.md — Adcin Templo Central
> Guia completo para qualquer agente de IA (Claude, Copilot, Cursor, etc.) que trabalhe neste projeto.  
> **Leia este arquivo inteiro antes de fazer qualquer alteração.**

---

## 1. Visão Geral do Projeto

Site institucional da **ADCIN – Templo Central**, uma igreja localizada em Ananindeua – PA, Brasil.  
O objetivo do site é acolher visitantes, apresentar os cultos e horários, e oferecer acesso à localização da igreja.

**Stack:**
- HTML5 semântico (`index.html`)
- CSS3 puro (`style.css`) — sem frameworks como Tailwind ou Bootstrap
- JavaScript vanilla (inline no final do `index.html`)
- Hospedado na **Netlify** (configuração de cache em `netlify.toml`)
- Fontes via Google Fonts (`Inter`) com fallback `Helvetica Now Display / Helvetica Neue / Helvetica`
- Ícones via **FontAwesome 6.4.0**

---

## 2. Estrutura de Arquivos

```
/
├── index.html          # Página principal (única página do site)
├── style.css           # Todo o CSS do projeto
├── netlify.toml        # Configurações de cache para o Netlify
└── public/
    ├── adcinvetor.svg      # Logo branca/vazada (usada no header e dark mode)
    ├── Simplification.svg  # Logo escura (reserva — atualmente ocultada no CSS)
    ├── adcinvetor.png      # Logo PNG (apple-touch-icon)
    ├── site.webmanifest    # Web App Manifest
    ├── _MG_9831.jpg        # Imagem hero (preload aplicado)
    ├── IMG_0313.jpg        # Carrossel "Sobre Nós"
    ├── _MG_9677.jpg        # Carrossel "Sobre Nós"
    ├── _MG_9704.jpg        # Carrossel "Sobre Nós"
    ├── _MG_9819.jpg        # Carrossel "Sobre Nós"
    ├── _MG_9846.jpg        # Carrossel "Sobre Nós"
    └── _MG_9878.jpg        # Carrossel "Sobre Nós"
```

> Novas imagens devem sempre ser adicionadas em `/public/`.

---

## 3. Sistema de Cores — NÃO ALTERE sem aprovação

Toda a identidade visual gira em torno destas variáveis CSS definidas em `:root`. **Nunca use valores hexadecimais fixos onde uma variável já existe.**

### Light Mode (padrão)

| Variável CSS             | Valor Hex   | Uso                                                  |
|--------------------------|-------------|------------------------------------------------------|
| `--primary-color`        | `#2e69ff`   | Cor principal: títulos (`h1–h6`), botões, destaques  |
| `--secondary-color`      | `#009b92`   | Verde Turquesa — hovers discretos, detalhes          |
| `--accent-color`         | `#46fe91`   | Verde Luminoso — apenas em gradientes e fundos escuros |
| `--modern-gradient`      | `135deg, #46fe91 → #009b92` | Gradiente verde: btn-primary, hover do footer social |
| `--text-color`           | `#100f0d`   | Texto principal                                      |
| `--text-light`           | `#666666`   | Texto secundário / descrições                        |
| `--bg-light`             | `#ffffff`   | Fundo geral da página                                |
| `--bg-card`              | `#ffffff`   | Fundo de cartões e header                            |
| `--white`                | `#ffffff`   | Branco puro (uso em textos sobre fundos coloridos)   |

### Dark Mode (classe `.dark-mode` no `<body>`)

| Variável CSS      | Valor Hex   | Mudança em relação ao Light                     |
|-------------------|-------------|--------------------------------------------------|
| `--primary-color` | `#426edb`   | Azul mais suave (não machuca os olhos)           |
| `--text-color`    | `#ffffff`   | Texto torna-se branco                            |
| `--text-light`    | `#a0a0a0`   | Cinza agradável                                  |
| `--bg-light`      | `#100f0d`   | Fundo da página escurece                         |
| `--bg-card`       | `#1a1917`   | Cards ficam levemente acinzentados               |

### Cores fixas (não variam com o tema)

| Onde                  | Valor     | Motivo                                              |
|-----------------------|-----------|-----------------------------------------------------|
| Footer background     | `#100f0d` | Sempre preto — não inverte no dark mode             |
| Footer bottom bar     | `#080706` | Tom ainda mais escuro que o footer                  |
| Header (light mode)   | `linear-gradient(to right, rgba(0,155,146,0.95), rgba(70,254,145,0.85))` | Gradiente turquesa→verde |
| Header (dark mode)    | `rgba(26, 25, 23, 0.95)` | Escuro com leve transparência                |

---

## 4. Tipografia

| Variável CSS       | Pilha de Fontes                                                       | Uso                   |
|--------------------|-----------------------------------------------------------------------|-----------------------|
| `--font-heading`   | `'Helvetica Now Display'`, `'Helvetica Neue'`, `Helvetica`, `Inter`, `sans-serif` | Títulos, botões, logo |
| `--font-body`      | `'Helvetica Now Text'`, `'Helvetica Neue'`, `Helvetica`, `Inter`, `sans-serif`    | Texto corrido         |

- Google Fonts carrega `Inter` como fallback web-safe.
- **Não adicione outras fontes** sem remover ou justificar a substituição.
- Pesos utilizados: `300`, `400`, `500`, `600`, `700`, `800`.

---

## 5. Layout e Componentes

### Container
```css
max-width: 1200px;
margin: 0 auto;
padding: 0 20px;
```

### Seções (`.section`)
- `padding: 80px 0` no desktop
- `padding: 50px 0` no mobile (≤768px)
- Alternam entre `background-color: var(--bg-light)` e `background-color: var(--bg-light)` com a classe `.bg-light`

### Botões

| Classe          | Aparência                                      | Uso                           |
|-----------------|------------------------------------------------|-------------------------------|
| `.btn-primary`  | Gradiente verde (`--modern-gradient`), texto branco | Ação principal (Ex: "Assista Online") |
| `.btn-secondary`| Fundo transparente, borda branca, texto branco | Ação secundária (Ex: "Como Chegar")   |

> Ao adicionar novos botões, use apenas essas duas classes. **Não crie novas variantes** sem atualizar este documento.

### Cards de Culto (`.schedule-card`)
- Fundo: `var(--bg-card)`
- Borda superior colorida: `3px solid var(--primary-color)`
- Ícone central: FontAwesome, cor `var(--primary-color)`
- Hover: `translateY(-8px)` + `box-shadow` azul
- No mobile: carrossel horizontal com `scroll-snap-type: x mandatory`; cada card ocupa `82%` da largura

### Carrossel de Imagens ("Sobre Nós" — `.slideshow`)
- Troca de imagens controlada por CSS com `@keyframes slideshow`
- Cada `img` dentro de `.slideshow` recebe `animation-delay` sequencial
- Não usa JavaScript
- Aspect-ratio fixo via `padding-bottom: 65%` no container

### Header
- `position: sticky; top: 0; z-index: 1000`
- Logo SVG branca sempre visível (`.logo-img-dark`)
- Toggle dark mode: `<input type="checkbox" id="theme-toggle">` + label estilizada como switch

### Menu Mobile (≤768px)
- Acionado por `<input type="checkbox" id="menu-toggle">` (CSS puro, sem JS)
- Dropdown com `max-height: 0` → `max-height: 450px` via `transition`
- Itens de navegação em coluna, fundo `var(--bg-card)`

---

## 6. Animações

| Nome               | Trigger              | Descrição                                             |
|--------------------|----------------------|-------------------------------------------------------|
| `fadeInDown`       | Automático (Hero h1) | Título do hero entra de cima para baixo               |
| `fadeInUp`         | Automático (Hero p)  | Parágrafo do hero entra de baixo para cima            |
| `fadeIn`           | Automático (botões)  | Botões do hero aparecem com fade                      |
| `.reveal`          | IntersectionObserver | Elementos entram com fade + slide-up ao rolar a tela  |
| `pulse-icon`       | Hover nos cards      | Ícone do card "pulsa" ao passar o mouse               |
| `slideshow`        | CSS automático       | Troca de imagens no carrossel "Sobre Nós"             |

- Delays de `.reveal`: `0.08s` a `0.48s` (classes `.reveal-delay-1` a `.reveal-delay-5`)
- **Respeite `prefers-reduced-motion`** — já implementado. Qualquer nova animação deve incluir override nesse media query.

---

## 7. Responsividade

| Breakpoint    | Comportamento principal                                              |
|---------------|----------------------------------------------------------------------|
| `> 900px`     | Layout padrão desktop — coluna dupla em "Sobre" e "Localização"     |
| `≤ 900px`     | `.about-container` e `.location-content` viram coluna única         |
| `≤ 768px`     | Menu hamburger ativo, hero h1 menor, cards em carrossel horizontal   |

---

## 8. SEO e Performance

- `<meta name="description">` já definida — **atualize se mudar o conteúdo principal**.
- Imagem hero (`_MG_9831.jpg`) tem `<link rel="preload" as="image">` no `<head>` — mantenha isso para qualquer nova imagem acima da dobra.
- Cache configurado no `netlify.toml`:
  - Imagens/SVGs: 1 ano (`immutable`)
  - CSS/JS: 1 dia (`must-revalidate`)
  - HTML: sem cache (`max-age=0`)
- Ao adicionar novos tipos de arquivo em `/public/`, adicione uma regra correspondente no `netlify.toml`.

---

## 9. Regras para Agentes — O que FAZER

- ✅ Usar sempre as variáveis CSS em vez de valores fixos
- ✅ Manter a estrutura semântica HTML (`<header>`, `<main>`, `<section>`, `<footer>`)
- ✅ Adicionar novos cards de culto seguindo o padrão `.schedule-card` com `reveal` e `reveal-delay-N`
- ✅ Usar FontAwesome para novos ícones (`fas`, `fab`, `far`)
- ✅ Testar visualmente tanto light mode quanto dark mode ao alterar qualquer cor ou componente
- ✅ Novas seções devem ter a classe `.section` e respeitar os breakpoints existentes
- ✅ Manter o `AGENTS.md` atualizado ao introduzir novos componentes ou padrões

---

## 10. Regras para Agentes — O que NÃO FAZER

- ❌ Não introduzir frameworks CSS (Bootstrap, Tailwind, etc.)
- ❌ Não adicionar bibliotecas JavaScript externas sem aprovação (o site é JS vanilla)
- ❌ Não alterar as variáveis de cor sem aprovação explícita do responsável
- ❌ Não criar botões, cards ou componentes com estilo "do zero" — sempre estender os existentes
- ❌ Não remover o suporte a `prefers-reduced-motion`
- ❌ Não usar `position: fixed` em novos elementos sem verificar conflito com o header sticky (`z-index: 1000`)
- ❌ Não alterar a logo SVG diretamente — os arquivos em `/public/` são assets finais
- ❌ Não criar estilos inline (`style=""`) em elementos HTML — todo CSS vai em `style.css`
- ❌ Não apagar ou alterar o `netlify.toml` sem atualizar as regras de cache correspondentes

---

## 11. Seções da Página (ordem e IDs)

| ID             | Seção             | Notas                                                      |
|----------------|-------------------|------------------------------------------------------------|
| `#inicio`      | Hero              | Imagem de fundo definida em `.hero` no CSS                 |
| `#sobre`       | Sobre Nós         | Carrossel de imagens + texto                               |
| `#cultos`      | Cultos e Reuniões | Grid de 5 cards com `.bg-light`                            |
| `#localizacao` | Localização       | Endereço + iframe do Google Maps                           |

> A navegação do menu reflete esses IDs — ao criar uma nova seção, adicione o link correspondente no `<nav>`.

---

## 12. Informações de Contato e Links (dados reais)

| Canal       | Dado                                                                                  |
|-------------|--------------------------------------------------------------------------------------|
| Endereço    | Cidade Nova III, R. SN 06, 100 - Cidade Nova, Ananindeua - PA, 67130-820             |
| Telefone    | (91) 3235-4568                                                                        |
| E-mail      | adcin.tc@gmail.com                                                                    |
| Instagram   | https://www.instagram.com/adcin.templocentral                                         |
| Facebook    | https://www.facebook.com/adcin.templocentral                                          |
| YouTube     | https://youtube.com/@adcintemplocentral.                                              |
| Google Maps | ID do embed já configurado no `<iframe>` em `#localizacao`                            |

---

## 13. Dark Mode — Implementação

- Controlado pela classe `.dark-mode` no `<body>`
- Persistido via `localStorage` (chave: `"theme"`, valores: `"dark"` ou `"light"`)
- Ao carregar, respeita `prefers-color-scheme: dark` do sistema operacional se não houver valor salvo
- O ícone do toggle alterna entre `fa-sun` (light) e `fa-moon` (dark) via `classList.replace`

---

## 14. Como Adicionar um Novo Card de Culto

Copie o bloco abaixo e ajuste apenas o ícone, título, dia, horário e descrição:

```html
<div class="schedule-card reveal reveal-delay-N">
    <div class="card-icon"><i class="fas fa-ICONE"></i></div>
    <h3>Nome do Culto</h3>
    <p class="day">Dia da Semana</p>
    <p class="time">HH:MM</p>
    <p class="desc">Descrição breve do culto.</p>
</div>
```

- Substitua `N` em `reveal-delay-N` pelo próximo número sequencial disponível (máx. recomendado: `5`; se passar, adicione o delay correspondente no CSS).
- Escolha o ícone em [fontawesome.com/icons](https://fontawesome.com/icons).

---

## 15. Como Adicionar uma Nova Imagem ao Carrossel "Sobre Nós"

1. Coloque a imagem em `/public/` (preferencialmente `.jpg`, otimizada para web)
2. Adicione a tag `<img>` dentro da `div.slideshow`:
```html
<img src="public/NOME_DA_IMAGEM.jpg" alt="Descrição">
```
3. O CSS cuida automaticamente da animação do slideshow.

---

*Última atualização: Março 2026*
