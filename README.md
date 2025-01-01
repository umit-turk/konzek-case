# E-Ticaret Mikro Frontend Projesi | E-Commerce Micro Frontend Project

[🇹🇷 Türkçe](#tr) | [🇬🇧 English](#en)

<h2 id="tr">🇹🇷 Türkçe</h2>

## 📋 İçindekiler
- [Genel Bakış](#-genel-bakış)
- [Proje Yapısı](#-proje-yapısı)
- [Kurulum](#-kurulum)
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

## 🚀 Kurulum

1. Tüm bağımlılıkları yükleyin:
```bash
npm install
```
konzek-case klasöründe npm install komutu çalıştırılır. Bu komut otomatik olarak tüm mikroservislerin (container, auth, cart, product-list, product-detail, order-history) bağımlılıklarını yükleyecektir.

## 🚀 Başlangıç

Uygulamayı başlatmak için:
```bash
npm start
```
container klasöründe npm start komutu çalıştırılır. Bu komut container uygulamasını başlatacak ve diğer tüm mikroservisleri otomatik olarak aşağıdaki portlarda çalıştıracaktır:

- Container: http://localhost:3000
- Product List: http://localhost:3001
- Auth: http://localhost:3002
- Cart: http://localhost:3003
- Order History: http://localhost:3004
- Product Detail: http://localhost:3005

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

---

<h2 id="en">🇬🇧 English</h2>

## 📋 Contents
- [Overview](#-overview)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Getting Started](#-getting-started)
- [Modules](#-modules)
- [Testing](#-testing)
- [Technical Details](#-technical-details)

## 🌟 Overview
This project implements a modern e-commerce platform using micro frontend architecture. Each module can be developed and deployed independently.

## 🏗 Project Structure

```
├── auth/         # Authentication module
├── cart/         # Shopping cart module
├── container/    # Main application shell
├── order-history/# Order history module
├── product-detail/# Product detail module
└── product-list/ # Product listing module
```

## 🚀 Installation

1. Install all dependencies:
```bash
npm install
```
Run npm install in the konzek-case directory. This command will automatically install dependencies for all microservices (container, auth, cart, product-list, product-detail, order-history).

## 🚀 Getting Started

To start the application:
```bash
npm start
```
Run npm start in the container directory. This will launch the container application and automatically start all microservices on the following ports:

- Container: http://localhost:3000
- Product List: http://localhost:3001
- Auth: http://localhost:3002
- Cart: http://localhost:3003
- Order History: http://localhost:3004
- Product Detail: http://localhost:3005

## 🧰 Modules

### 🔐 Auth Module (`auth/`)
- User login/registration
- Session management
- Authorization controls

### 🛒 Cart Module (`cart/`)
- Cart operations
- Product quantity management
- Total price calculation
- Cart state synchronization

## 📄 License
MIT

---
Last updated: [Date]


