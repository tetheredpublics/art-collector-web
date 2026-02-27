import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['src/**/*.test.{js,ts}']
	},
	resolve: {
		alias: {
			$lib: resolve('src/lib')
		}
	}
});
