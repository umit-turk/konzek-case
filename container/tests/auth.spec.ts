import { test, expect } from '@playwright/test';

test.describe('Auth Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth');
  });

  test('should display login form by default', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Giriş Yap' })).toBeVisible();
    await expect(page.getByPlaceholder('ornek@email.com')).toBeVisible();
    await expect(page.getByPlaceholder('•••••••')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Giriş Yap' })).toBeVisible();
    await expect(page.getByText('Hesabınız yok mu? Kayıt olun')).toBeVisible();
  });

  test('should switch to register form', async ({ page }) => {
    await page.getByText('Hesabınız yok mu? Kayıt olun').click();
    
    await expect(page.getByRole('heading', { name: 'Kayıt Ol' })).toBeVisible();
    await expect(page.getByPlaceholder('John Doe')).toBeVisible();
    await expect(page.getByPlaceholder('ornek@email.com')).toBeVisible();
    await expect(page.getByPlaceholder('•••••••')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Kayıt Ol' })).toBeVisible();
    await expect(page.getByText('Zaten hesabınız var mı? Giriş yapın')).toBeVisible();
  });

  test('should show validation errors', async ({ page }) => {
    await page.getByPlaceholder('ornek@email.com').fill('test@tes');
    await page.getByPlaceholder('•••••••').fill('••');
    await page.getByRole('button', { name: 'Giriş Yap' }).click();
    
    await expect(page.getByText('Geçerli bir e-posta adresi giriniz.')).toBeVisible();
    await expect(page.getByText('Şifre en az 6 karakter olmalıdır.')).toBeVisible();
  });

  test('should show register validation errors', async ({ page }) => {
    await page.getByText('Hesabınız yok mu? Kayıt olun').click();

    await page.getByPlaceholder('John Doe').fill('a');
    await page.getByPlaceholder('ornek@email.com').fill('test@tes');
    await page.getByPlaceholder('•••••••').fill('••');
    await page.getByRole('button', { name: 'Kayıt Ol' }).click();
    
    await expect(page.getByText('İsim en az 2 karakter olmalıdır.')).toBeVisible();
    await expect(page.getByText('Geçerli bir e-posta adresi giriniz.')).toBeVisible();
    await expect(page.getByText('Şifre en az 6 karakter olmalıdır.')).toBeVisible();
  });

  test('should register new user', async ({ page }) => {
    await page.getByText('Hesabınız yok mu? Kayıt olun').click();
    
    await page.getByPlaceholder('John Doe').fill('John Doe');
    await page.getByPlaceholder('ornek@email.com').fill('john@example.com');
    await page.getByPlaceholder('•••••••').fill('password123');
    
    await page.getByRole('button', { name: 'Kayıt Ol' }).click();
    
    await expect(page).toHaveURL('/');
  });

  test('should login existing user', async ({ page }) => {
    await page.getByPlaceholder('ornek@email.com').fill('john@example.com');
    await page.getByPlaceholder('•••••••').fill('password123');
    
    await page.getByRole('button', { name: 'Giriş Yap' }).click();
    
    await expect(page).toHaveURL('/');
  });

  test('should clear form when switching between login and register', async ({ page }) => {
    await page.getByPlaceholder('ornek@email.com').fill('test@example.com');
    await page.getByPlaceholder('•••••••').fill('password123');
    
    await page.getByText('Hesabınız yok mu? Kayıt olun').click();
    
    await expect(page.getByPlaceholder('ornek@email.com')).toHaveValue('');
    await expect(page.getByPlaceholder('•••••••')).toHaveValue('');
    
    await page.getByPlaceholder('John Doe').fill('John Doe');
    await page.getByPlaceholder('ornek@email.com').fill('john@example.com');
    await page.getByPlaceholder('•••••••').fill('password123');
    
    await page.getByText('Zaten hesabınız var mı? Giriş yapın').click();
    
    await expect(page.getByPlaceholder('ornek@email.com')).toHaveValue('');
    await expect(page.getByPlaceholder('•••••••')).toHaveValue('');
  });
}); 