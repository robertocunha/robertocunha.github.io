// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	i18n: {
		locales: ['pt', 'en'],
		defaultLocale: 'pt',
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
