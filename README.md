# Bustify

Bustify, online bilet satın alma uygulamasıdır.

İçindekiler

1. Genel Bilgiler
2. Kurulum
3. Çalıştırma
4. Kullanılan Teknolojiler ve Sürümler
5. Klasör Yapısı
6. Ekran Görüntüleri

-- Genel Bilgiler --

Bu proje, kullanıcıların seyahat planlarını yönetmelerine ve seferler arasında rezervasyon yapmalarına imkan sağlayan bir web uygulamasıdır. Ayrıca, kullanıcıların giriş yapmaları, kayıt olmaları, ödeme yapmaları ve seçtikleri koltukları yönetmeleri gibi temel işlevleri sağlamaktadır.

-- Kurulum --

Proje, aşağıdaki adımları takip ederek kolayca kurulabilir:

1. Proje dosyalarını bilgisayarınıza indirin veya klonlayın :

git clone https://github.com/username/project-name.git
cd project-name

2. Gerekli paketleri yükleyin

npm install

-- Çalıştırma --

Proje kurulumu tamamlandıktan sonra, aşağıdaki adımları izleyerek uygulamayı başlatabilirsiniz:

1. Frontend geliştirme sunucusunu başlatın :

npm run dev

2. Daha sonra aynı dizinde şu komutu çalıştırarak backend servisini çalıştırın :

node server.js

3. Tarayıcınızda http://localhost:5173 adresine giderek uygulamanın çalışır halini görüntüleyebilirsiniz.

-- Kullanılan Teknolojiler ve Sürümler

Bu projede aşağıdaki teknolojiler ve sürümler kullanılmıştır :

*Vite v2.5.4
*React v17.0.2
*Redux Toolkit v1.6.1
*Axios v0.21.1
*Node.js v14.17.5
*npm v6.14.14
*Express v4.17.1
*MongoDB v4.4.6
*Reduxjs/toolkit v1.6.1
*brcypt v5.0.1
*cors v2.8.5
*react-datepicker v4.2.1
*react-dom v17.0.2
*react-router-dom v5.2.0

-- Klasör Yapısı --

src/
├───assets/
├───components/
│ ├───Header.tsx
│ ├───Layout.tsx
│ ├───PageTransition.tsx
│ ├───SeatSVG.tsx
├───pages/
│ ├───HomePage.tsx
│ ├───InquiryPage.tsx
│ ├───LoginPage.tsx
│ ├───PaymentPage.tsx
│ ├───RegisterPage.tsx
│ ├───TripDetailsPage.tsx
├───services/
│ ├───auth.service.ts
│ ├───trip.service.ts
├───slices/
│ ├───paymentSlice.ts
├───tripSlice.ts
├───userSlice.ts
├───store/
│ ├───index.ts
├───styles/
│ ├───Header.css
│ ├───Homepage.css
│ ├───InquiryPage.css
│ ├───LoginPage.css
│ ├───PageTransition.css
│ ├───PaymentPage.css
│ ├───RegisterPage.css
│ ├───TripDetailsPage.css
├───App.tsx

-- Ekran Görüntüleri --

Projenin ekran görüntülerine buradan ulaşabilirsiniz.
