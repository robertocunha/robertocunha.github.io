## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## O que é este projeto

Índice bilíngue (PT/EN) do Roberto — desenvolvedor, músico e educador — cobrindo três frentes de trabalho: Software, Artigos, Música. Hospedado no GitHub Pages, deploy automático via GitHub Actions a cada push na `main`.

Roberto valida visualmente cada mudança de design (roda o dev server e olha o resultado) — ele não tem formação em design, então preze por explicar o raciocínio por trás de decisões de CSS/layout, não só aplicá-las silenciosamente.

## Arquitetura de conteúdo e rotas

- Duas content collections tipadas via Zod: `projects` (`src/content/projects/*.md`, campo `area: 'software' | 'article' | 'music'`) e `articles` (`src/content/articles/{pt,en}/*.md`, o corpo do artigo em si).
- Um projeto do tipo `article` tem um `articleSlug` que aponta pro artigo correspondente em `articles` — é assim que o card na home linka pra página de artigo.
- Todos os campos de texto voltados ao usuário (`title`, `shortDescription`, `description`) são bilíngues: `{ pt, en }`.
- Rotas espelhadas por idioma: pt na raiz (`/`, `/artigos/[slug]`), en sob `/en/` (`/en/`, `/en/artigos/[slug]`). Traduções de UI (não de conteúdo) ficam em `src/i18n/ui.ts`, acessadas via `useTranslations(lang)`.
- `src/layouts/Base.astro` centraliza todo o `<head>` (meta tags, OG, hreflang, JSON-LD, Google Fonts) — todas as páginas passam por ele, inclusive o 404 (que é bilíngue numa página só, sem par de idioma, então não recebe `alternates`).

## Sistema de design (`src/styles/global.css`)

- Paleta neutra + acento por área: índigo (software), sépia (artigo), bordô (música) — via `--color-accent-*` e o atributo `data-area` no elemento (`.card[data-area='...']`, `.area-section[data-area='...']`).
- Tipografia: IBM Plex Mono (`--font-display`, títulos/labels) + IBM Plex Sans (`--font-body`, corpo). Carregada via Google Fonts dentro do `Base.astro`, não precisa repetir em nenhuma página.
- `.ruled-line` é o elemento de assinatura visual do site (uma "régua" fina com marcações) — usado como divisor entre hero/conteúdo e dentro de cada seção de área.
- Ícones de área (`AreaIcon.astro`) usam `fill="currentColor"` / `stroke="currentColor"` propositalmente, pra herdar a cor de acento via CSS em vez de ficarem pretos fixos.
- `.card` é uma coluna flex; `.card .links` usa `margin-top: auto` pra grudar sempre no rodapé, não importa o tamanho da descrição — como os cards de uma linha do grid esticam pra mesma altura, isso alinha os links entre cards vizinhos.
- Home usa `wide` no `Base` (`.page--wide`, 1100px) só pra caber o grid de três colunas em telas largas (`min-width: 900px`); `.page-inner` reancora hero/nav na largura de leitura padrão (`--content-width`, 700px) dentro dessa página mais larga. Artigos e 404 continuam em 700px o tempo todo.
- Abaixo de 900px as três áreas empilham e um menu sticky (`.area-jump`, com âncoras coloridas por área) aparece pra facilitar navegação; acima de 900px ele some porque o grid já deixa tudo visível.

## Deploy (GitHub Actions → GitHub Pages)

Workflow em `.github/workflows/deploy.yml`. Duas pegadinhas já resolvidas, mas que voltariam se o workflow for recriado do zero ou copiado pra outro projeto sem essas ressalvas:

- **Node 22 é obrigatório.** O Astro 5 não builda em Node 20, mas o `withastro/action@v3` não usa isso como padrão — é preciso passar `node-version: 22` explicitamente em `with:`.
- **Ambiente `github-pages` com branch protection apontando pra `master`.** O GitHub cria esse ambiente automaticamente na primeira vez que o Pages é configurado com fonte "GitHub Actions", e às vezes a regra de branch permitida vem com `master` em vez de `main`. Se o deploy falhar com "Branch main is not allowed to deploy... due to environment protection rules", o ajuste é em Settings → Environments → github-pages → Deployment branches and tags.
- Se em algum momento o push falhar com "refusing to allow an OAuth App to create or update workflow ... without workflow scope", é o token do `gh` sem o escopo `workflow` — resolve com `gh auth refresh -h github.com -s workflow`.

## Convenções

- Chaves de i18n em `ui.ts`: `area.*` é o rótulo singular usado dentro do card (ex. "Artigo"); `section.*` é o título de seção plural na home (ex. "Artigos"). São propositalmente separadas, não reaproveitar uma pela outra.
- IDs das seções de área na home seguem o padrão `area-{software,article,music}` — é o alvo das âncoras do menu sticky mobile; manter esse padrão se adicionar/renomear áreas.
- Ferramenta correta para ler/escrever arquivos deste projeto: MCP `documents` (`read_file`/`write_file`), nunca `str_replace` (que é do sandbox local do Claude, não deste repositório).
- `CLAUDE.md` é um arquivo normal, não um symlink — a versão original gerada pelo Astro tinha `CLAUDE.md` como link simbólico pra `AGENTS.md` (mesmo conteúdo, dois nomes). Isso foi desfeito: `AGENTS.md` foi removido e `CLAUDE.md` recriado como arquivo próprio. Não recriar esse link.
