import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte({ hot: false })],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		globals: true
	},
	resolve: {
		alias: {
			$lib: '/src/lib',
			$app: '/node_modules/@sveltejs/kit/src/runtime/app'
		}
	}
});
