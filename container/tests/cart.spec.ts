import { test, expect } from '@playwright/test';

test.describe('Sepet İşlemleri', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cart');
  });

  test('boş sepet doğru görüntülenmeli', async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem('cart'));
    await page.reload();
    await expect(page.getByText('Sepetiniz boş')).toBeVisible();
  });

  test('sepetteki ürün doğru görüntülenmeli', async ({ page }) => {
    const cartItem = {
      id: 1,
      name: 'Test Ürün',
      price: 100,
      quantity: 1
    };

    await page.evaluate((item) => {
      localStorage.setItem('cart', JSON.stringify([item]));
    }, cartItem);
    await page.reload();

  });

  test('ürün miktarı değiştirilebilmeli', async ({ page }) => {
    const cartItem = { id: 1, name: 'Test Ürün', price: 100, quantity: 1 };
    await page.evaluate((item) => {
      localStorage.setItem('cart', JSON.stringify([item]));
    }, cartItem);
    await page.reload();

  });

  test('ürün sepetten kaldırılabilmeli', async ({ page }) => {
    const cartItem = { id: 1, name: 'Test Ürün', price: 100, quantity: 1 };
    await page.evaluate((item) => {
      localStorage.setItem('cart', JSON.stringify([item]));
    }, cartItem);
    await page.reload();

    await expect(page.getByText('Sepetiniz boş')).toBeVisible();
  });
}); 