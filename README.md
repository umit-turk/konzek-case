# E-Ticaret Mikro Frontend Projesi

## 📋 İçindekiler
- [Genel Bakış](#-genel-bakış)
- [Proje Yapısı](#-proje-yapısı)
- [Başlangıç](#-başlangıç)
- [Modüller](#-modüller)
- [Test](#-test)
- [Teknik Detaylar](#-teknik-detaylar)

## 🌟 Genel Bakış
Bu proje, modern bir e-ticaret platformunu mikro frontend mimarisi kullanarak geliştirilmiştir. Her modül bağımsız olarak geliştirilebilir ve deploy edilebilir yapıdadır.

## 🏗 Proje Yapısı

├── auth/ # Kimlik doğrulama modülü
├── cart/ # Sepet modülü
├── container/ # Ana uygulama
├── order-history/ # Sipariş geçmişi modülü
├── product-detail/ # Ürün detay modülü
└── product-list/ # Ürün listeleme modülü

## 🚀 Başlangıç

container'da npm start ile başlatılır.

## 🧰 Modüller

### 🔐 Auth Modülü (`auth/`)
- Kullanıcı girişi/kaydı
- Oturum yönetimi
- Yetkilendirme kontrolleri

### 🛒 Cart Modülü (`cart/`)
- Sepet işlemleri
- Ürün miktar yönetimi
- Toplam fiyat hesaplama
- Sepet durumu senkronizasyonu

### 🏠 Container (`container/`)
- Ana uygulama shell'i
- Modül federasyonu yönetimi
- Routing
- Global state yönetimi

### 📜 Order History (`order-history/`)
- Sipariş geçmişi görüntüleme
- Sipariş detayları
- Sipariş durumu takibi
- Boş sipariş durumu yönetimi

### 📱 Product Detail (`product-detail/`)
- Ürün detay görüntüleme
- Stok durumu kontrolü
- Sepete ekleme işlemleri
- Ürün varyasyonları

### 📋 Product List (`product-list/`)
- Ürün listesi görüntüleme
- Filtreleme ve sıralama
- Sayfalama
- Hızlı sepete ekleme

## 🧪 Test

### E2E Testler

container'da npm test ile başlatılır.

Mevcut E2E testler:
- `auth.spec.ts`: Kimlik doğrulama testleri
- `cart.spec.ts`: Sepet işlemleri testleri
- `order-history.spec.ts`: Sipariş geçmişi testleri
- `product-detail.spec.ts`: Ürün detay testleri
- `product-list.spec.ts`: Ürün listeleme testleri


## 🛠️ Teknik Detaylar

### Kullanılan Teknolojiler
- **Frontend Framework**: React 18
- **Dil**: TypeScript
- **State Yönetimi**: Redux Toolkit
- **Modül Federasyonu**: Webpack 5
- **Stil**: Tailwind CSS
- **Test**: 
  - E2E: Playwright
- **Routing**: React Router v6

### State Yönetimi
- Redux Toolkit ile merkezi state
- LocalStorage ile kalıcı veri
- Modüller arası state senkronizasyonu

### Routing Yapısı

## 💻 Geliştirme

### Yeni Modül Ekleme
1. Modül klasörü oluştur
2. Webpack Module Federation yapılandır
3. Container'da modülü tanımla
4. Routing ve state entegrasyonu yap

### Kod Standartları
- ESLint kurallarına uyum
- TypeScript strict mode
- Component bazlı test coverage
- Conventional commits

## 🚀 Deploy

### Production Build

## 📝 Notlar

### Geliştirme İpuçları
- Container'ı başlatmak tüm modülleri başlatır
- Her modül farklı portta çalışır
- Hot reload aktif
- Redux DevTools entegrasyonu mevcut

### Bilinen Sorunlar
- [Varsa bilinen sorunlar buraya eklenecek]

### Planlanan Özellikler
- [Gelecek özellikler buraya eklenecek]

## 👥 Katkıda Bulunma
1. Fork yapın
2. Feature branch oluşturun
3. Değişikliklerinizi commit edin
4. Test yazın ve çalıştırın
5. Pull request açın

## 📄 Lisans
MIT

---
Son güncelleme: [Tarih]


