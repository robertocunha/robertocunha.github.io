// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://robertocunha.github.io',
	i18n: {
		locales: ['pt', 'en'],
		defaultLocale: 'pt',
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [sitemap()],
});
