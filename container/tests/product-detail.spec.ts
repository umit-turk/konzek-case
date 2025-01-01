import { test, expect } from '@playwright/test';

test.describe('Ürün Detay', () => {
  test.beforeEach(async ({ page }) => {
    // Örnek bir ürün detay sayfasına git
    await page.goto('/product/1');
    await page.waitForLoadState('networkidle');
  });


  test('stokta olmayan ürün sepete eklenememeli', async ({ page }) => {
    const addToCartButton = page.locator('button:has-text("Stokta Yok")');
    
    if (await addToCartButton.isVisible()) {
      // Buton disabled olmalı
      await expect(addToCartButton).toBeDisabled();
      await expect(addToCartButton).toHaveClass(/bg-gray-400/);
      
      // Miktar input'u olmamalı
      await expect(page.locator('input[type="number"]')).not.toBeVisible();
    }
  });

  test('stok durumu doğru görüntülenmeli', async ({ page }) => {
    const stockStatus = page.locator('.text-sm.font-medium');
    
    if (await stockStatus.isVisible()) {
      const status = await stockStatus.textContent();
      
      // Stok durumu "Stokta" veya "Tükendi" olmalı
      expect(status).toMatch(/^(Stokta|Tükendi)$/);
      
      // Stok durumuna göre renk kontrolü
      if (status === 'Stokta') {
        await expect(stockStatus).toHaveClass(/text-green-600/);
      } else {
        await expect(stockStatus).toHaveClass(/text-red-600/);
      }
    }
  });

  test('ürün detayları dinamik olarak yüklenmeli', async ({ page }) => {
    // Sayfa yüklenirken loading durumu kontrol edilebilir
    await expect(page.locator('.loading-spinner')).not.toBeVisible();
    
    // Ürün detaylarının yüklendiğini kontrol et
    await expect(page.locator('h1')).not.toBeEmpty();
    await expect(page.locator('.text-sm.text-gray-500')).not.toBeEmpty();
  });
}); 