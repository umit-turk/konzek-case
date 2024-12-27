# 🛍️ E-Ticaret Micro Frontend Projesi

Modern bir e-ticaret platformunu micro frontend mimarisi kullanarak oluşturan kapsamlı bir proje.

## 📋 İçerik

- [Genel Bakış](#genel-bakış)
- [Mimari](#mimari)
- [Başlangıç](#başlangıç)
- [Geliştirme](#geliştirme)
- [Dağıtım](#dağıtım)
- [Teknoloji Yığını](#teknoloji-yığını)

## 🎯 Genel Bakış

Bu proje, modern web teknolojilerini kullanarak ölçeklenebilir ve bakımı kolay bir e-ticaret platformu oluşturmayı amaçlar. Micro frontend mimarisi sayesinde, farklı ekipler bağımsız olarak çalışabilir ve her bir modül ayrı ayrı deploy edilebilir.

### 🌟 Temel Özellikler

- **Ürün Yönetimi**: Kapsamlı ürün listeleme ve filtreleme
- **Kullanıcı Yönetimi**: Güvenli kimlik doğrulama sistemi
- **Sepet İşlemleri**: Gerçek zamanlı sepet yönetimi
- **Sipariş Takibi**: Detaylı sipariş geçmişi ve durum takibi
- **Responsive Tasarım**: Tüm cihazlarda optimum kullanıcı deneyimi

## 🏗️ Mimari

Proje, 5 temel micro frontend'den oluşur:

## Başlangıç

### Gereksinimler

- Node.js (v14+)
- npm veya yarn

### Kurulum

1. Her bir micro frontend için bağımlılıkları yükleyin: 

cd container && npm install
cd ../auth && npm install
cd ../product-list && npm install
cd ../cart && npm install
cd ../order-history && npm install

2. Geliştirme sunucusunu başlatın:

Container (Ana uygulama)
cd container && npm start # http://localhost:3000
Product List
cd product-list && npm start # http://localhost:3001
Auth
cd auth && npm start # http://localhost:3002
Cart
cd cart && npm start # http://localhost:3003
Order History
cd order-history && npm start # http://localhost:3004

## Özellikler

- 🔐 Güvenli kimlik doğrulama
- 🛍️ Ürün listesi ve filtreleme
- 🛒 Sepet yönetimi
- 📦 Sipariş takibi
- 📱 Responsive tasarım
- 🌐 Micro frontend mimarisi

## Teknolojiler

- React
- TypeScript
- Redux Toolkit
- React Router
- Webpack Module Federation
- Tailwind CSS

## Mimari

### Container (Ana Uygulama)
- Routing yönetimi
- State management
- Shared dependencies
- Ortak bileşenler

### Product List
- Ürün listesi görüntüleme
- Filtreleme ve arama
- Ürün detay sayfaları

### Auth
- Kullanıcı girişi

### Cart
- Sepet yönetimi
- Ürün ekleme/çıkarma
- Miktar güncelleme

### Order History
- Sipariş geçmişi
- Sipariş detayları
- Sipariş durumu

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

MIT# konzek-case
