# Roberto Cunha — Sitefolio

🇧🇷 Português | 🇺🇸 [English](#english)

Site pessoal e índice de projetos, publicado em [robertocunha.github.io](https://robertocunha.github.io).

Não é um portfólio no sentido tradicional de "vitrine comercial" — é um espaço simples para reunir, num único lugar, trabalhos em três frentes: **software**, **artigos** e **música**, à medida que cada um deles amadurece o suficiente para ser mostrado.

## Como funciona

O site é construído com [Astro](https://astro.build) e usa *content collections* tipadas para modelar o conteúdo:

- **`projects`** — os cards exibidos na página inicial. Cada entrada define título, descrições, área (`software` / `article` / `music`), tecnologias e links relacionados — tudo bilíngue (`{ pt, en }`).
- **`articles`** — o corpo de texto de artigos hospedados no próprio site, organizados em subpastas por idioma (`pt/` e `en/`). Um projeto de área `article` se conecta à entrada correspondente através do campo `articleSlug`.

O site é totalmente bilíngue (português/inglês), com rotas estáticas separadas por idioma (`/` para português, `/en/` para inglês) — sem troca de idioma via JavaScript. Cada página inclui dados estruturados (JSON-LD, schema.org) e as tags de `hreflang`/Open Graph correspondentes.

## Rodando localmente

```sh
npm install
npm run dev
```

| Comando           | Ação                                              |
| :----------------- | :------------------------------------------------ |
| `npm install`       | Instala as dependências                           |
| `npm run dev`       | Inicia o servidor local em `localhost:4321`        |
| `npm run build`     | Gera a versão de produção em `./dist/`             |
| `npm run preview`   | Serve a build de produção localmente, para revisão |

## Adicionando conteúdo

**Um novo projeto de software ou música**: criar um arquivo `.md` em `src/content/projects/`, seguindo o schema já existente.

**Um novo artigo hospedado no site**: criar `src/content/articles/pt/nome-do-artigo.md` e `src/content/articles/en/nome-do-artigo.md` com o texto de cada idioma, e um arquivo correspondente em `src/content/projects/` com `area: article` e `articleSlug: nome-do-artigo` — essa string precisa ser idêntica ao nome dos dois arquivos de artigo.

---

## English

Personal site and project index, published at [robertocunha.github.io](https://robertocunha.github.io).

It isn't a portfolio in the traditional "sales pitch" sense — it's a simple space to gather work across three areas: **software**, **articles**, and **music**, as each piece matures enough to be shown.

### How it works

Built with [Astro](https://astro.build), using typed content collections to model the content:

- **`projects`** — the cards shown on the homepage. Each entry defines a title, descriptions, an area (`software` / `article` / `music`), technologies, and related links — all bilingual (`{ pt, en }`).
- **`articles`** — the body text of articles hosted on the site itself, organized into per-language subfolders (`pt/` and `en/`). A project with area `article` links to its matching article entry through the `articleSlug` field.

The site is fully bilingual (Portuguese/English), with separate static routes per language (`/` for Portuguese, `/en/` for English) — no JavaScript-based language switching. Every page includes structured data (JSON-LD, schema.org) and the corresponding `hreflang`/Open Graph tags.

### Running locally

```sh
npm install
npm run dev
```

| Command             | Action                                        |
| :------------------ | :--------------------------------------------- |
| `npm install`       | Installs dependencies                          |
| `npm run dev`       | Starts the local dev server at `localhost:4321`|
| `npm run build`     | Builds the production site to `./dist/`        |
| `npm run preview`   | Previews the production build locally          |

### Adding content

**A new software or music project**: create a `.md` file in `src/content/projects/`, following the existing schema.

**A new article hosted on the site**: create `src/content/articles/pt/article-slug.md` and `src/content/articles/en/article-slug.md` with each language's text, plus a matching entry in `src/content/projects/` with `area: article` and `articleSlug: article-slug` — this string must exactly match the name of both article files.
