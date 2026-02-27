import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './src/components/leaderboard/__visual__',
	testMatch: '**/*.visual.js',
	outputDir: './test-results/visual',
	snapshotDir: './src/components/leaderboard/__visual__/__screenshots__',
	timeout: 15_000,
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: 'list',
	use: {
		baseURL: 'http://localhost:5173',
		...devices['Desktop Chrome']
	},
	expect: {
		toHaveScreenshot: {
			maxDiffPixelRatio: 0.01
		}
	},
	webServer: {
		command: 'npm run dev -- --port 5173',
		port: 5173,
		reuseExistingServer: !process.env.CI,
		timeout: 30_000
	}
});
