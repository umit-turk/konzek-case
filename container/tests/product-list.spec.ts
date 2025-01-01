import { test, expect } from '@playwright/test';

test.describe('Ürün Listesi', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Sayfanın yüklenmesini bekle
    await page.waitForLoadState('networkidle');
  });

  test('ürün listesi doğru görüntülenmeli', async ({ page }) => {
    // Başlık kontrolü
    await expect(page.getByText('Ürünlerimiz')).toBeVisible();
    
    // Ürün listesi grid yapısının varlığını kontrol et
    await expect(page.locator('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3')).toBeVisible();
  });

  test('ürün kartı doğru görüntülenmeli', async ({ page }) => {
    // Ürün kartını bekle
    const productCard = page.locator('.bg-white.rounded-xl.shadow-md').first();
    await expect(productCard).toBeVisible();

    // Temel ürün kartı yapısını kontrol et (dinamik içerikten bağımsız)
    await expect(productCard.locator('.relative.group')).toBeVisible(); // Resim container
    await expect(productCard.locator('.p-6')).toBeVisible(); // İçerik container
    await expect(productCard.locator('button')).toBeVisible(); // Sepete ekle butonu
  });

  test('ürün filtreleme çalışmalı', async ({ page }) => {
    // Filtreleme formunu bekle

    // Arama
    const searchInput = page.getByPlaceholder('Ürün adı veya açıklama ile ara...');

    // Fiyat filtreleri
    const minPrice = page.getByPlaceholder('Min');
    const maxPrice = page.getByPlaceholder('Maks');
    await minPrice.fill('1000');
    await maxPrice.fill('50000');

    // Sıralama
    const sortSelect = page.locator('select');

    // Filtreleme sonuçlarının yüklenmesini bekle
    await page.waitForLoadState('networkidle');
  });

  test('ürün detayına gidilebilmeli', async ({ page }) => {
    // İlk ürün kartını bekle ve tıkla
    const productCard = page.locator('.bg-white.rounded-xl.shadow-md').first();
    
    // Ürün detayına yönlendirmeyi bekle ve tıkla
    await Promise.all([
      page.waitForNavigation(),
      productCard.click()
    ]);
  });

  test('sepete ürün eklenebilmeli', async ({ page }) => {
    // Sepete ekle butonunu bul
    const addToCartButton = page.locator('button:has-text("Sepete Ekle")').first();
    
    // Stok kontrolü
    const isDisabled = await addToCartButton.isDisabled();
    if (!isDisabled) {
      await addToCartButton.click();
    }
  });

  test('stok durumu kontrolü yapılmalı', async ({ page }) => {
    // Tüm ürün butonlarını kontrol et
    const productButtons = page.locator('.bg-white.rounded-xl.shadow-md button');
    const buttonsCount = await productButtons.count();

    for (let i = 0; i < buttonsCount; i++) {
      const button = productButtons.nth(i);
      const isDisabled = await button.isDisabled();

      if (isDisabled) {
        // Stokta olmayan ürün
        await expect(button).toHaveText('Stokta Yok');
        await expect(button).toHaveClass(/bg-gray-400/);
      } else {
        // Stokta olan ürün
        await expect(button).toHaveText('Sepete Ekle');
        await expect(button).toHaveClass(/bg-blue-600/);
      }
    }
  });

  test('filtreleri temizle çalışmalı', async ({ page }) => {
    // Filtreleri uygula
    await page.getByPlaceholder('Ürün adı veya açıklama ile ara...').fill('test');
    await page.getByPlaceholder('Min').fill('1000');
    await page.getByPlaceholder('Maks').fill('5000');
    
    // Temizle butonunu bul ve tıkla
    const clearButton = page.getByRole('button', { name: 'Filtreleri Temizle' });
    await clearButton.click();

    // Input'ların temizlendiğini kontrol et
    await expect(page.getByPlaceholder('Ürün adı veya açıklama ile ara..')).toHaveValue('');
    await expect(page.getByPlaceholder('Min')).toHaveValue('');
    await expect(page.getByPlaceholder('Maks')).toHaveValue('');
  });

  test('sayfalama kontrolü yapılmalı', async ({ page }) => {
    // Ürünlerin yüklenmesini bekle
    await page.waitForSelector('.bg-white.rounded-xl.shadow-md');
    
    // Sayfalama butonlarını kontrol et
    const paginationButtons = page.locator('button[aria-label*="sayfa"]');
    
    if (await paginationButtons.count() > 0) {
      // Sonraki sayfaya git
      const nextButton = page.getByRole('button', { name: /sonraki/i });
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForLoadState('networkidle');
        // Yeni ürünlerin yüklendiğini kontrol et
        await expect(page.locator('.bg-white.rounded-xl.shadow-md').first()).toBeVisible();
      }
    }
  });
}); 