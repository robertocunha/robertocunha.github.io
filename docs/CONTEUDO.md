# Guia de conteúdo — Sitefolio

Manual de referência pra criar/editar projetos e artigos sem precisar reabrir o schema toda vez. Escrito pra mim mesmo (Roberto); a fonte de verdade real é sempre `src/content.config.ts` — se este guia e o schema divergirem um dia, o schema ganha, e este arquivo precisa ser atualizado.

## Onde tudo mora

```
src/content/
  projects/          — um .md por projeto/artigo/composição (a "vitrine")
    meu-projeto.md
  articles/
    pt/nome-do-artigo.md   — corpo do artigo em português
    en/nome-do-artigo.md   — corpo do artigo em inglês (mesmo slug/nome de arquivo)
```

Cada **card na home** vem de um arquivo em `content/projects/`. Um projeto com `area: article` também precisa de um par de arquivos em `content/articles/{pt,en}/` com o mesmo nome — é o texto completo que abre em `/artigos/[slug]`.

## Anatomia de um projeto (`content/projects/*.md`)

```yaml
---
title:
  pt: Nome em português
  en: Name in English

shortDescription:
  pt: Uma frase, aparece no card.
  en: One sentence, shown on the card.

description:
  pt: >
    Descrição mais longa. Hoje não é exibida em nenhum lugar do site
    (não tem página de detalhe de projeto), mas existe no schema —
    útil se um dia eu quiser abrir uma página própria por projeto.
  en: >
    Longer description. Not rendered anywhere today (no per-project
    detail page yet), but exists in the schema.

area: software   # 'software' | 'article' | 'music' — ver seção abaixo

technologies:
  - TypeScript
  - Firebase

links:
  - type: repo
    url: https://github.com/...
  - type: demo
    url: https://...

articleSlug: nome-do-artigo   # SÓ quando area: article — ver seção própria
---

Corpo do markdown. Hoje não é usado em lugar nenhum (o card só lê o
frontmatter) — pode deixar uma linha qualquer ou até vazio.
```

### Campo por campo

| Campo | Tipo | Obrigatório? | Como deixar "vazio" |
|---|---|---|---|
| `title` | `{ pt, en }` | Sim | Não pode faltar nenhum dos dois idiomas |
| `shortDescription` | `{ pt, en }` | Sim | Idem |
| `description` | `{ pt, en }` | Sim (mas não é exibida hoje) | Idem — pode repetir a shortDescription se não quiser escrever duas versões |
| `area` | `'software' \| 'article' \| 'music'` | Sim | — |
| `technologies` | lista de strings | Sim | `technologies: []` |
| `links` | lista de `{ type, url }` | Sim | `links: []` |
| `articleSlug` | string | Só se `area: article` | Omitir o campo inteiro (não escrever `articleSlug: ""` — o schema espera ou uma string válida ou o campo ausente) |

**Sobre `description` bilíngue nunca poder ficar vazia**: o schema (`localizedString`) exige `z.string()` nos dois idiomas — string vazia (`''`) tecnicamente passa na validação do Zod, mas não faz sentido visualmente em lugar nenhum que use esse campo. Se não tiver o que escrever ainda, é mais seguro simplesmente não criar o projeto até ter pelo menos a `shortDescription` pronta.

**Sobre URLs em `links`**: o schema valida com `z.string().url()` — precisa ser uma URL de verdade, com `https://` e tudo. `https://...` (reticências literais) *passa* na validação porque tecnicamente parseia como URL válida, mas obviamente não leva a lugar nenhum — é só um placeholder que já usei antes, não esquecer de trocar pelo link real antes do deploy.

### Tipos de `links` disponíveis

| `type` | Rótulo (pt) | Ícone |
|---|---|---|
| `demo` | Experimente! | ↗ |
| `repo` | GitHub | ◇ |
| `screenshots` | Screen shots | ▧ |
| `article` | Artigo Completo | ▤ |
| `summary` | Resumo | ≡ |
| `video` | Vídeo | ▶ |
| `audio` | Ouvir | ♫ |
| `score` | Partitura | ♬ |

Rótulos completos (pt/en) ficam em `src/i18n/ui.ts`, chaves `link.*`.

**Nota sobre `type: article`**: esse tipo existe pra dois usos diferentes:
1. **Automático** — se `area: article` e `articleSlug` estiver preenchido, o card já injeta um primeiro link desse tipo sozinho, apontando pra `/artigos/[slug]` (ou `/en/artigos/[slug]`). **Não adicionar manualmente esse link no array `links` desse projeto** — ficaria duplicado.
2. **Manual** — qualquer projeto (mesmo `software` ou `music`) pode ter um link `type: article` apontando pra um texto *externo* sobre aquele projeto (ex: um post no Medium sobre o Siga La Cifra). Nesse caso é normal e esperado adicionar manualmente.

## Passo a passo: criar um projeto de software ou música

1. Criar `src/content/projects/nome-do-projeto.md`.
2. Preencher `title`, `shortDescription`, `description` (pt+en), `area: software` ou `area: music`.
3. `technologies`: lista simples, ou `[]`.
4. `links`: pelo menos um, tipicamente `repo` e/ou `demo`.
5. **Não** incluir `articleSlug` (só serve pra `area: article`).
6. Rodar `astro dev` e conferir o card na home.

## Passo a passo: criar um artigo

Um artigo é sempre **dois arquivos-texto + um arquivo-vitrine**:

1. `src/content/articles/pt/nome-do-artigo.md` — frontmatter só com `title` (string simples, não bilíngue — cada arquivo já é de um idioma só), corpo em markdown é o artigo completo em português.
2. `src/content/articles/en/nome-do-artigo.md` — mesmo nome de arquivo, `title` em inglês, corpo em inglês.
3. `src/content/projects/nome-do-artigo.md` (ou outro nome, não precisa bater com o slug) — o "cartão de visita" que aparece na home: `area: article`, e `articleSlug: nome-do-artigo` (esse sim tem que bater exatamente com o nome de arquivo usado nos dois passos acima).
4. Rodar `astro dev`, conferir o card e clicar no link "Artigo Completo" pra ver se abre o texto certo nos dois idiomas.

**Atenção**: o nome de arquivo em `articles/pt/` e `articles/en/` precisa ser **idêntico** (é o que vira o `id` tipo `pt/nome-do-artigo`, usado pra parear os dois idiomas e gerar a rota). `articleSlug` no projeto precisa bater com esse mesmo nome, sem `.md` e sem o prefixo de idioma.

## Como criar uma nova área/categoria (ex: além de software/artigo/música)

Área não é um campo de conteúdo solto — está espalhada em vários lugares do código, porque cada um cuida de uma parte diferente (schema, tradução, cor, ícone, layout da home). Pra adicionar uma área nova (`poesia`, por exemplo), tocar em **todos** estes pontos:

1. **`src/content.config.ts`** — acrescentar o valor no `z.enum(['software', 'article', 'music'])`.
2. **`src/i18n/ui.ts`** — acrescentar `area.poesia` (rótulo singular do card) e `section.poesia` (título de seção plural na home), pt e en.
3. **`src/styles/global.css`** — nova variável `--color-accent-poesia` no `:root`, e replicar os três blocos de seletor que já existem pras outras áreas: `.card[data-area='poesia']`, `.area-section[data-area='poesia'] h2`, `.area-jump a[data-area='poesia']`.
4. **`src/components/AreaIcon.astro`** — novo bloco `{area === "poesia" && (<svg ...>)}` com um ícone (usar `fill="currentColor"` / `stroke="currentColor"`, não cor fixa — é assim que a cor de acento chega no ícone).
5. **`src/pages/index.astro` e `src/pages/en/index.astro`** — adicionar `const byPoesia = projects.filter(...)`, o link correspondente no `.area-jump`, e o bloco `<section class="area-section" data-area="poesia" id="area-poesia">` — copiar o padrão das outras três áreas.

Não existe atalho mais curto que isso hoje — é código duplicado por design, um pouco manual, mas explícito, então cada peça é fácil de achar e editar isoladamente.

### Renomear rótulo exibido vs. renomear a chave interna

São duas operações bem diferentes em custo, mesmo que pareçam a mesma coisa à primeira vista:

- **Trocar só o texto que aparece pro visitante** (ex: exibir "Composições" em vez de "Música", sem mexer em mais nada por baixo) é barato: um arquivo só, `src/i18n/ui.ts`, chaves `area.music` e `section.music` (pt + en). O valor interno (`music`) continua exatamente o mesmo em todo o resto do código — é assim que rótulo visível e identificador interno já vivem separados hoje, de propósito.
- **Trocar a *chave* em si** (ex: `music` virar `musica` no enum do Zod) custa o mesmo que criar uma área nova — os cinco pontos listados acima — **mais** duas coisas que criar não tem: migrar `area: music` pra `area: musica` em todo `.md` já existente em `content/projects/`, e qualquer link externo que aponte pra `#area-music` (o menu sticky mobile) quebra, porque o id muda junto.

Isso não é um defeito específico deste projeto — é o custo normal de ter uma chave estável servindo de identificador (enum, slug, id): qualquer sistema com um vocabulário controlado paga esse preço ao renomear a chave, não só trocar o texto.

**Decisão registrada (15/08/2026):** a duplicação em 5 arquivos pra criar área nova foi identificada como um cheiro de arquitetura real (["shotgun surgery"](https://en.wikipedia.org/wiki/Shotgun_surgery) — uma mudança conceitual única obrigando edições espalhadas em arquivos sem relação direta entre si). Decisão consciente de **não refatorar agora**, por dois motivos: (1) prioridade atual é popular o site de conteúdo, não mexer em arquitetura; (2) as três áreas são uma taxonomia estável (categorias de vida, não um catálogo que cresce toda semana), então o critério de YAGNI (you aren't gonna need it) se aplica — o custo de uma abstração genérica só se paga se essa dor voltar a acontecer de verdade.

Se um dia a dor voltar (adicionar uma quarta, quinta área), a refatoração natural é centralizar a definição de cada área num único lugar (ex: `src/areas.ts`, um objeto `{ software: { cor, ícone, ... }, article: {...}, music: {...} }`) e fazer CSS, Zod enum e a home lerem dali — reduziria "criar área nova" de 5 arquivos pra praticamente 2. Não implementar isso preventivamente; só se a necessidade concreta aparecer.

## Troubleshooting rápido

- **Build falha em produção mas rodava local**: geralmente é uma URL inválida em `links` (o `z.string().url()` é rígido) ou um `articleSlug` sem os dois arquivos correspondentes em `content/articles/`.
- **Card não aparece na home**: confere se `area` está com um dos três valores exatos (`software`, `article`, `music` — sensível a maiúsculas/minúsculas, sem acento).
- **Link "Artigo Completo" dá 404**: `articleSlug` não bate exatamente com o nome de arquivo em `content/articles/{pt,en}/`.
