# Physician Academy & Library — Design System (v2)

Referência visual: as 6 telas em `docs/referencias/`. Todos os valores abaixo estão em `assets/css/styles.css` como variáveis no `:root`. Ao criar algo novo, **use sempre as variáveis**, nunca um valor solto.

> A v1 (verde-clínico, cantos retos, sem sombra) foi substituída. O documento antigo está em `legacy/design-system-v1.md`.

---

## 1. Conceito

Plataforma médica moderna e confiável: azul como cor de marca e de ação, fotos reais de medicina esportiva com degradê azul-marinho, cards brancos arredondados com sombra suave e muito respiro. Verde é reservado a **compra, preço e sucesso**. Laranja aparece só no selo **GRATUITO**.

## 2. Cores

| Token | Hex | Uso |
|---|---|---|
| `--blue-600` | `#1F63E0` | Cor de ação: botões primários, links, item de menu ativo, títulos de curso |
| `--blue-700` / `--blue-800` | `#1A51BC` / `#123E86` | Hover; títulos de tópico no fórum; texto sobre `--blue-50` |
| `--blue-50` / `--blue-100` | `#EDF3FE` / `#DCE8FC` | Fundo de tags, pills e selos informativos |
| `--navy-900` | `#0B2146` | Degradê dos heros, toast, barra de cookies |
| `--green-600` | `#18A058` | Preço, "Comprar Agora", "Adicionar ao Carrinho", confirmação |
| `--green-50` | `#E3F6EC` | Pill secundária (tags verdes), selo "Garantia" |
| `--orange-500` | `#F08A24` | **Somente** o selo "GRATUITO" |
| `--star` | `#F5B301` | Estrelas de avaliação |
| `--text` / `--text-2` / `--text-3` | `#172033` / `#454F63` / `#6B7489` | Texto principal / secundário / metadados |
| `--bg-soft` / `--bg-muted` | `#F4F6FA` / `#ECF0F6` | Fundo de páginas internas (fórum), faixa de filtros, cards de estatística |
| `--border` / `--border-strong` | `#E2E6EE` / `#CBD2DE` | Bordas de cards / de inputs e botões claros |

**Cores das categorias do fórum** (usadas só no ícone da categoria, em `.cat-<id>`; ativa = cor cheia com ícone branco):
Medicina Esportiva `#1F63E0` · Ortopedia `#6D4AE0` · Cardiologia `#E0445A` · Farmacologia `#0E8F9E` · Nutrição `#18A058`.

**Regras**
- Azul = ação e navegação. Verde = dinheiro e sucesso. Não troque os papéis.
- No máximo **um botão verde** por card ou bloco.
- Nunca usar preto puro em texto; usar `--text`.

## 3. Tipografia

Fonte única: **Inter** (Google Fonts), pesos 400/500/600/700.

| Elemento | Tamanho | Peso |
|---|---|---|
| H1 de hero | 44–46px (30–32px no mobile) | 700 |
| H1 de página interna | 34px | 700 |
| Título de curso (página do curso) | 37px, cor `--blue-600` | 700 |
| Título de card | 19–21px | 700 |
| Título de tópico (lista do fórum) | 19px, cor `--blue-700` | 600 |
| Corpo | 15–16px | 400 |
| Metadados | 13–14.5px, `--text-2`/`--text-3` | 400–500 |
| Preço em card | 21px, `--green-600` | 700 |

## 4. Forma, sombra e espaçamento

- Raio: `--radius-sm` 6px (selos), 8px (botões, inputs, imagens dentro de cards), `--radius-lg` 14px (cards). Pills e avatares são redondos.
- Sombra: `--shadow-sm` em cards comuns, `--shadow` em cards de curso, `--shadow-lg` em dropdowns, modais, card de compra e cards que sobrepõem o hero.
- Container: 1240px, padding lateral 24px (16px no mobile).
- Padding interno de card: 18–22px. Gap entre cards: 20–24px.

## 5. Componentes

| Componente | Classe | Observação |
|---|---|---|
| Botão primário | `.btn.btn-primary` | Azul, texto branco |
| Botão de compra | `.btn.btn-success` | Verde; em `buy-card` usa `.btn-pill` |
| Botão secundário | `.btn.btn-outline` / `.btn-white` / `.btn-light` | Contorno azul / branco sobre hero / cinza (ações do fórum) |
| Selo de categoria na foto | `.badge-cat` | Azul, canto superior esquerdo |
| Selo gratuito | `.badge-free` | Laranja, canto superior direito |
| Tag | `.tag`, `.pill`, `.pill-green` | Fundo claro, texto escuro da mesma cor |
| Hero | `.hero` + variante (`.home-hero`, `.academy-hero`, `.free-hero`, `.page-hero`) | Foto + degradê `--navy-900` da esquerda para a direita (centralizado no catálogo) |
| Abas | `.tabs` | Sublinhado azul de 3px na aba ativa |
| Card de curso | `.course-card` | Foto 16:10, selo de categoria, instrutor, estrelas, horas + preço verde. No hover (desktop), "Ver Detalhes" vira "Adicionar ao Carrinho" |

## 6. Cabeçalho e rodapé

- Cabeçalho branco fixo, 76px: logo → menu (Home, Physician Library, Physician Academy, Conteúdo Gratuito) → busca, carrinho, notificações e avatar.
- Item ativo: texto azul + sublinhado azul de 3px encostado na borda inferior.
- Abaixo de 1020px o menu vira painel vertical (botão ☰), com a busca no topo.
- Rodapé: colunas de links + ícones sociais azuis à direita, copyright centralizado.

## 7. Idiomas

Toda string de interface passa por `T('chave')` e existe nas 4 línguas (pt, en, es, fr): as chaves originais em `assets/js/i18n.js` e as da v2 em `assets/js/i18n-v2.js`. Conteúdo gerado por usuários (tópicos, respostas, avaliações) fica no idioma original.

## 8. Checklist para uma tela nova

- [ ] Só variáveis do `:root`, nenhum hex novo?
- [ ] Botão principal azul; verde só para compra ou sucesso?
- [ ] Cards com `--radius-lg` e sombra do sistema?
- [ ] Todo texto no dicionário, nas 4 línguas?
- [ ] Testado em 390px (mobile) e 1440px (desktop)?
