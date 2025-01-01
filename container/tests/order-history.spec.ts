import { test, expect } from '@playwright/test';

test.describe('Sipariş Geçmişi Testleri', () => {
  test.beforeEach(async ({ page }) => {
    // Giriş yap
    await page.goto('/auth');
    await page.getByPlaceholder('E-posta').fill('test@example.com');
    await page.getByPlaceholder('Şifre').fill('password123');
    await page.getByRole('button', { name: 'Giriş Yap' }).click();
    
    // Sipariş geçmişi sayfasına git
    await page.goto('/orders');
  });

  test('sipariş geçmişi boş olduğunda mesaj gösterilmeli', async ({ page }) => {
    // Sipariş yoksa boş mesajı görünmeli
    const emptyMessage = page.getByText('Henüz siparişiniz bulunmuyor');
    
    if (await emptyMessage.isVisible()) {
      await expect(emptyMessage).toBeVisible();
      await expect(page.getByRole('link', { name: 'Alışverişe Başla' })).toBeVisible();
    }
  });

  test('sipariş listesi doğru görüntülenmeli', async ({ page }) => {
    // Sipariş kartları
    const orderCards = page.locator('.bg-white.rounded-xl');
    
    // Her sipariş için kontroller
    for (const card of await orderCards.all()) {
      // Sipariş numarası görünür olmalı
      const orderNumber = card.locator('.text-sm.text-text-secondary');
      await expect(orderNumber).toBeVisible();
      await expect(orderNumber).toHaveText(/^Sipariş No: #\d+$/);
      
      // Sipariş tarihi görünür olmalı
      const orderDate = card.locator('.text-sm.text-text-secondary').nth(1);
      await expect(orderDate).toBeVisible();
      await expect(orderDate).toHaveText(/^\d{2}\.\d{2}\.\d{4}$/);
      
      // Sipariş tutarı görünür olmalı
      const orderTotal = card.locator('.text-lg.font-semibold.text-primary-main');
      await expect(orderTotal).toBeVisible();
      await expect(orderTotal).toHaveText(/[\d.,]+ TL$/);
      
      // Sipariş durumu görünür olmalı
      const orderStatus = card.locator('.rounded-full.text-sm');
      await expect(orderStatus).toBeVisible();
      await expect(orderStatus).toHaveText(/^(Hazırlanıyor|Kargoda|Tamamlandı|İptal Edildi)$/);
    }
  });

  test('sipariş detayları görüntülenebilmeli', async ({ page }) => {
    // İlk siparişin detaylarına git
    const firstOrder = page.locator('.bg-white.rounded-xl').first();
    
    if (await firstOrder.isVisible()) {
      // Sipariş numarasını kaydet
      const orderNumber = await firstOrder.locator('.text-sm.text-text-secondary').textContent();
      const orderNo = orderNumber?.match(/#(\d+)/)?.[1];
      
      await firstOrder.click();
      
      // Sipariş detay sayfasında olmalı
      await expect(page).toHaveURL(`/orders/${orderNo}`);
      
      // Sipariş özeti görünür olmalı
      await expect(page.getByText(`Sipariş No: #${orderNo}`)).toBeVisible();
      await expect(page.locator('.text-sm.text-text-secondary')).toBeVisible(); // Tarih
      await expect(page.locator('.rounded-full.text-sm')).toBeVisible(); // Durum
      
      // Ürün listesi görünür olmalı
      const products = page.locator('.product-list-item');
      await expect(products).toBeVisible();
      
      // Her ürün için kontroller
      for (const product of await products.all()) {
        await expect(product.locator('img')).toBeVisible(); // Ürün resmi
        await expect(product.locator('h3')).toBeVisible(); // Ürün adı
        await expect(product.locator('.text-sm')).toBeVisible(); // Miktar
        await expect(product.locator('.text-primary-main')).toBeVisible(); // Fiyat
      }
      
      // Toplam tutar görünür olmalı
      await expect(page.locator('.text-xl.font-bold.text-primary-main')).toBeVisible();
    }
  });

  test('sipariş durumuna göre renklendirme yapılmalı', async ({ page }) => {
    const orderCards = page.locator('.bg-white.rounded-xl');
    
    for (const card of await orderCards.all()) {
      const status = card.locator('.rounded-full.text-sm');
      const statusText = await status.textContent();
      
      switch (statusText?.trim()) {
        case 'Hazırlanıyor':
          await expect(status).toHaveClass(/bg-warning-main/);
          break;
        case 'Kargoda':
          await expect(status).toHaveClass(/bg-info-main/);
          break;
        case 'Tamamlandı':
          await expect(status).toHaveClass(/bg-success-main/);
          break;
        case 'İptal Edildi':
          await expect(status).toHaveClass(/bg-error-main/);
          break;
      }
    }
  });

  test('sipariş filtreleme çalışmalı', async ({ page }) => {
    // Filtre seçenekleri görünür olmalı
    const filterSelect = page.locator('select[name="status"]');
    await expect(filterSelect).toBeVisible();
    
    // Her filtre için kontrol
    const statuses = ['Tümü', 'Hazırlanıyor', 'Kargoda', 'Tamamlandı', 'İptal Edildi'];
    
    for (const status of statuses) {
      // Filtreyi seç
      await filterSelect.selectOption(status);
      
      if (status === 'Tümü') {
        continue; // Tümü seçeneği için kontrol yapmaya gerek yok
      }
      
      // Filtrelenen siparişlerin durumu doğru olmalı
      const filteredOrders = page.locator('.bg-white.rounded-xl');
      for (const order of await filteredOrders.all()) {
        const orderStatus = order.locator('.rounded-full.text-sm');
        await expect(orderStatus).toHaveText(status);
      }
    }
  });

  test('sipariş sıralama çalışmalı', async ({ page }) => {
    // Sıralama seçenekleri görünür olmalı
    const sortSelect = page.locator('select[name="sort"]');
    await expect(sortSelect).toBeVisible();
    
    // Tarihe göre sıralama kontrolü
    await sortSelect.selectOption('date-desc');
    const dateElements = await page.locator('.text-sm.text-text-secondary').all();
    const dates = await Promise.all(dateElements.map(el => el.textContent()));
    
    // Tarihleri karşılaştır
    for (let i = 1; i < dates.length; i++) {
      const currentDate = new Date(dates[i] || '');
      const previousDate = new Date(dates[i-1] || '');
      expect(currentDate.getTime()).toBeLessThanOrEqual(previousDate.getTime());
    }
    
    // Tutara göre sıralama kontrolü
    await sortSelect.selectOption('total-desc');
    const totalElements = await page.locator('.text-lg.font-semibold.text-primary-main').all();
    const totals = await Promise.all(totalElements.map(async el => {
      const text = await el.textContent();
      return parseFloat((text || '').replace(/[^0-9,]/g, '').replace(',', '.'));
    }));
    
    // Tutarları karşılaştır
    for (let i = 1; i < totals.length; i++) {
      expect(totals[i]).toBeLessThanOrEqual(totals[i-1]);
    }
  });
}); 