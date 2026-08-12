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
  }),
});

export const collections = { projects };