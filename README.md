# Physician Academy & Library

Site com fórum clínico gratuito (**Physician Library**) e cursos pagos de medicina do esporte (**Physician Academy**), do Dr. Selênio Campos Filho.

É um site **estático**: HTML, CSS e JavaScript puros, sem build e sem dependências para instalar. Roda abrindo o `index.html` ou em qualquer hospedagem estática.

## Estrutura

```
index.html                 página única (cabeçalho, área das telas, rodapé)
assets/
  css/styles.css           todo o visual (tokens no :root)
  js/config.js             analytics, provedor de vídeo, contatos
  js/icons.js              ícones SVG e ilustrações da Home
  js/i18n.js               traduções originais (pt, en, es, fr)
  js/i18n-v2.js            traduções da v2 (layout novo, login, carrinho, admin)
  js/data.js               conteúdo: instrutor, categorias, tópicos, cursos, avaliações
  js/db.js                 "banco" de demonstração no navegador (localStorage)
  js/views.js              telas (uma função render* por página)
  js/app.js                rotas, login obrigatório, carrinho, checkout, eventos
  img/                     fotos (extraídas da apresentação do curso) e logo
docs/
  design-system.md         cores, tipografia e componentes (v2)
  referencias/             as 6 telas que definiram o design
materiais/                 apresentação original do curso (.pptx)
legacy/                    versão antiga em arquivo único (só consulta)
```

A ordem dos `<script>` no `index.html` importa: cada arquivo usa o que os anteriores definem.

## Como rodar localmente

Dê dois cliques no `index.html`. Para simular um servidor de verdade:

```
python -m http.server 8000
```

Depois abra http://localhost:8000.

## Contas e acesso

- A **primeira tela é o login**. Nenhuma página abre sem entrar, exceto Termos e Privacidade.
- Conta inicial **`docdoc`**: entra **sem senha** e é administradora (vê todos os cursos e abre o Painel Administrativo).
- Qualquer pessoa pode **criar conta** (nome, usuário, e-mail e senha com 6+ caracteres) e navegar pelo fórum, pelo catálogo e pelo conteúdo gratuito.
- **As aulas dos cursos só abrem para quem pagou** (matriculado) ou para administradores. Um curso fica liberado de dois jeitos:
  1. o usuário compra pelo carrinho ou pelo botão "Comprar Agora" (checkout de demonstração);
  2. o admin marca o curso para o usuário em **Painel Administrativo → Usuários e acesso aos cursos** (útil para pagamentos por Pix).

## Rotas

| Rota | Tela |
|---|---|
| `#/` | Home (ou login, se não estiver logado) |
| `#/library`, `#/library/<slug>` | Fórum e tópico |
| `#/academy`, `#/academy/<slug>` | Catálogo e página do curso |
| `#/free` | Conteúdo gratuito |
| `#/about`, `#/contact` | Sobre e Contato |
| `#/my-courses` | Meus cursos (progresso e certificado) |
| `#/admin` | Painel administrativo (só admin) |
| `#/search/<termo>` | Busca |
| `#/terms`, `#/privacy` | Termos e Privacidade |

## Colocar online

Como o site é estático, qualquer uma destas opções serve, sem configuração:

- **GitHub Pages**: suba a pasta para um repositório e ative Pages (Settings → Pages → branch `main`, pasta `/`).
- **Netlify Drop**: arraste a pasta em https://app.netlify.com/drop.
- **Vercel** ou **Cloudflare Pages**: importe o repositório, sem comando de build, diretório de saída `/`.

Não é preciso publicar `legacy/` nem `materiais/` (a `.pptx` tem 31 MB).

## ⚠️ Limites desta versão (importante antes de vender de verdade)

Hoje contas, compras e progresso ficam **no navegador de cada pessoa** (localStorage):

- uma conta criada num computador **não existe** em outro;
- o controle de "só pagantes" é feito no navegador, então quem entende de programação consegue burlá-lo, e o link do vídeo fica visível no código;
- o checkout é **simulado**: nenhum pagamento é cobrado.

Para receber pagamentos reais e proteger as aulas, os próximos passos são:

1. **Login e banco de dados reais**: Supabase ou Firebase (ambos têm plano gratuito). Isso substitui o `assets/js/db.js`.
2. **Pagamento**: Mercado Pago, Pagar.me ou Stripe Checkout, com um webhook que libera o curso depois do pagamento aprovado.
3. **Vídeos protegidos**: Bunny Stream, Cloudflare Stream ou Mux, com link assinado por aluno. É só trocar `getVideoSrc()` em `assets/js/config.js`.

A interface já está pronta para isso: basta trocar as funções do `DB` por chamadas ao backend.
