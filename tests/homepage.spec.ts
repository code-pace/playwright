import {test, expect} from '@playwright/test';
test.describe('Homepage Tests', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/')
    });
    test('Check homepage title', async ({page}) => {
        await expect(page).toHaveTitle('Your Store')
    });
    test('Check Cart is visible', async ({page}) => {
        const cart = page.locator('#main-header .cart-icon').first()
        await expect(cart).toBeVisible()
        const cartCount = await cart.locator('.cart-item-total').textContent()
        expect(cartCount).toBe('0')
    });
    test('Check Product Search Bar is visible', async ({page}) => {
        const searchBar = page.locator('[placeholder="Search For Products"]').first()
        await expect(searchBar).toBeVisible()
    });
    test('Check Top Trending Categories are visible', async ({page}) => {
        const topTrendingCategories = page.getByText('TOP TRENDING CATEGORIES')
        const allCategories = page.locator('.entry-section').filter({has: topTrendingCategories}).locator('div[role="group"]')
        const categoriesCount = await allCategories.count()
        if (categoriesCount > 0) {
            for (let i = 0; i < categoriesCount; i++) {
                const category = allCategories.nth(i)
                expect(await category.locator('a').getAttribute('href')).toBeTruthy();
            }
        }
    });
    test('Check Top Products are Visible', async ({page}) => {
        const topProducts = page.getByText('TOP PRODUCTS')
        const allProducts = page.locator('.entry-section').filter({has: topProducts}).locator('div[role="group"]')
        const topProductsCount = await allProducts.count()
        if (topProductsCount > 0) {
            for (let i = 0; i < topProductsCount; i++) {
                const category = allProducts.nth(i)
                expect(await category.locator('a').first().getAttribute('href')).toBeTruthy();
            }
        }
    });
})
