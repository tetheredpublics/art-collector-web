import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/visual-test');
	await page.waitForLoadState('networkidle');
});

test('EmptyState — default', async ({ page }) => {
	const section = page.locator('[data-testid="empty-state-default"]');
	await expect(section).toHaveScreenshot('empty-state-default.png');
});

test('EmptyState — custom text', async ({ page }) => {
	const section = page.locator('[data-testid="empty-state-custom"]');
	await expect(section).toHaveScreenshot('empty-state-custom.png');
});

test('LoadingState', async ({ page }) => {
	const section = page.locator('[data-testid="loading-state"]');
	await expect(section).toHaveScreenshot('loading-state.png', {
		animations: 'disabled'
	});
});

test('ErrorState', async ({ page }) => {
	const section = page.locator('[data-testid="error-state"]');
	await expect(section).toHaveScreenshot('error-state.png');
});

test('EntryCard — rank 1 (gold accent, up trend, winner)', async ({ page }) => {
	const section = page.locator('[data-testid="entry-card-rank1"]');
	await expect(section).toHaveScreenshot('entry-card-rank1.png');
});

test('EntryCard — rank 2 (silver accent, down trend)', async ({ page }) => {
	const section = page.locator('[data-testid="entry-card-rank2"]');
	await expect(section).toHaveScreenshot('entry-card-rank2.png');
});

test('EntryCard — rank 3 (bronze accent, same trend)', async ({ page }) => {
	const section = page.locator('[data-testid="entry-card-rank3"]');
	await expect(section).toHaveScreenshot('entry-card-rank3.png');
});

test('EntryCard — rank 5 (no accent)', async ({ page }) => {
	const section = page.locator('[data-testid="entry-card-rank5"]');
	await expect(section).toHaveScreenshot('entry-card-rank5.png');
});

test('EntryCard — no metrics', async ({ page }) => {
	const section = page.locator('[data-testid="entry-card-no-metrics"]');
	await expect(section).toHaveScreenshot('entry-card-no-metrics.png');
});

test('WeekBanner — with rules link', async ({ page }) => {
	const section = page.locator('[data-testid="week-banner"]');
	await expect(section).toHaveScreenshot('week-banner.png');
});

test('WeekBanner — no rules link', async ({ page }) => {
	const section = page.locator('[data-testid="week-banner-no-rules"]');
	await expect(section).toHaveScreenshot('week-banner-no-rules.png');
});

test('CategoryColumn — with entries', async ({ page }) => {
	const section = page.locator('[data-testid="category-column-with-entries"]');
	await expect(section).toHaveScreenshot('category-column-entries.png');
});

test('CategoryColumn — empty', async ({ page }) => {
	const section = page.locator('[data-testid="category-column-empty"]');
	await expect(section).toHaveScreenshot('category-column-empty.png');
});

test('ColumnsContainer — multi-column layout', async ({ page }) => {
	const section = page.locator('[data-testid="columns-container"]');
	await expect(section).toHaveScreenshot('columns-container.png');
});
