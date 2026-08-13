import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/projects',
  }),
  schema: z.object({
    title: z.string(),
    shortDescription: z.string(),
    description: z.string(),
    area: z.enum(['software', 'article', 'music']),
    technologies: z.array(z.string()),
    links: z.array(
      z.object({
        type: z.enum([
          'demo',
          'repo',
          'screenshots',
          'article',
          'summary',
          'video',
          'audio',
          'score',
        ]),
        url: z.string().url(),
      }),
    ),
    // Preenchido apenas quando area === 'article': liga este projeto
    // à entrada correspondente na collection `articles`, hospedada
    // no próprio site em /artigos/[slug].
    articleSlug: z.string().optional(),
  }),
});

const articles = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/articles',
  }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { projects, articles };