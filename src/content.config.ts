import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localizedString = z.object({
	pt: z.string(),
	en: z.string(),
});

const projects = defineCollection({
	loader: glob({
		pattern: '**/*.md',
		base: './src/content/projects',
	}),
	schema: z.object({
		title: localizedString,
		shortDescription: localizedString,
		description: localizedString,
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
		// Preenchido apenas quando area === 'article': liga este projeto às
		// entradas correspondentes na collection `articles` (uma por idioma,
		// em src/content/articles/pt/ e src/content/articles/en/), hospedadas
		// no próprio site em /artigos/[slug] e /en/artigos/[slug].
		articleSlug: z.string().optional(),
	}),
});

const articles = defineCollection({
	loader: glob({
		// Cada artigo mora em duas versões: pt/nome-do-artigo.md e
		// en/nome-do-artigo.md. O prefixo do idioma vira parte do `id`
		// gerado automaticamente pelo loader (ex: "pt/pillars-e-ellison"),
		// o que usamos nas rotas para filtrar por idioma.
		pattern: '**/*.md',
		base: './src/content/articles',
	}),
	schema: z.object({
		title: z.string(),
	}),
});

export const collections = { projects, articles };
