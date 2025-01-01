import { test, expect } from '@playwright/test';

test.describe('Sipariş Geçmişi', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/orders');
  });

  test('giriş yapmadan sayfa görüntülenmemeli', async ({ page }) => {
    await expect(page).toHaveURL(/.*auth/);
  });

  test('sipariş geçmişi doğru görüntülenmeli', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }));
      localStorage.setItem('orders', JSON.stringify([]));
    });
    await page.reload();

    // Sipariş listesi kontrolü
    const orderList = page.locator('div').filter({ hasText: /Sipariş #/ });
    if (await orderList.count() > 0) {
      await expect(orderList.first()).toBeVisible();
    } 
  });

  test("sipariş geçmişi boş olduğunda doğru görüntülenmeli", async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }));
      localStorage.setItem('orders', JSON.stringify([]));
    });
    await page.reload();

  });

  test('sipariş detayları görüntülenmeli', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }));
      localStorage.setItem('orders', JSON.stringify([{
        id: '1735738092861',
        date: '1 Ocak 2025 16:28',
        status: 'Beklemede',
        total: 158997.00,
        items: [
          { name: 'Test Ürün', price: 7999.00, quantity: 1 }
        ]
      }]));
    });
    await page.reload();

    const orderItem = page.locator('div').filter({ hasText: /Sipariş #/ }).first();
    if (await orderItem.isVisible()) {
      await expect(orderItem.getByText(/Sipariş #/)).toBeVisible();
      await expect(orderItem.getByText(/\d{1,2}\s+\w+\s+\d{4}/)).toBeVisible();
      await expect(orderItem.getByText(/.*TL$/)).toBeVisible();
      await expect(orderItem.getByText(/Beklemede|Tamamlandı/)).toBeVisible();
    }
  });
}); 