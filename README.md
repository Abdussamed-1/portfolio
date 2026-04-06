


# Samet Erkalp – Portfolio

Kişisel portfolyo web sitesi.  
Yapay zeka, veri bilimi ve biyoinformatik alanındaki projelerimi, blog yazılarımı ve teknolojiyle ilgili güncel içerikleri paylaşmak için geliştirdim.

---

## 🚀 Özellikler

- **Ana Sayfa:** Kısa tanıtım ve öne çıkan içerikler  
- **Hakkımda:** Eğitim, beceriler ve özgeçmiş  
- **Projeler:** Üzerinde çalıştığım projeler ve iş deneyimleri  
- **Blog:** MDX ile yazılmış teknik yazılar (örneğin biyoinformatik, Kubernetes)  
- **Haberler:** Teknoloji dünyasından güncel içerikler (RSS feed)  
- **Bülten:** E-posta aboneliği ile haftalık özet ve yeni yazı bildirimleri  

---

## 🛠️ Kullanılan Teknolojiler

Bu proje modern web teknolojileri kullanılarak geliştirilmiştir:

- **Next.js 16** → React tabanlı framework  
- **Once UI** → UI bileşenleri ve tasarım sistemi  
- **MDX** → Markdown + React ile içerik yönetimi  
- **Supabase** → Veritabanı ve backend servisleri  
- **Resend** → E-posta gönderimi (newsletter sistemi)  

---

## ⚙️ Kurulum

Projeyi kendi bilgisayarında çalıştırmak için aşağıdaki adımları takip et:

### 1. Depoyu klonla
```bash
git clone https://github.com/kullanici-adin/repo-adi.git
cd repo-adi

---

## Geliştirme

**Bağımlılıkları yükle**
```bash
npm install
```

**Geliştirme sunucusu**
```bash
npm run dev
```

**Production build**
```bash
npm run build
npm start
```

**Ortam değişkenleri**  
`.env.example` dosyasına bakın; `.env.local` oluşturup Supabase, Resend ve isteğe bağlı diğer değerleri ekleyin.

---

## Yapılandırma ve içerik

- **Genel config:** `src/resources/once-ui.config.ts` (baseURL, routes, tema vb.)
- **İçerik (metinler, sosyal linkler):** `src/resources/content.tsx`
- **Çeviriler (EN/TR):** `src/resources/translations.tsx`
- **Blog yazıları:** `src/app/blog/posts/*.mdx`
- **Projeler:** `src/app/work/projects/*.mdx`

---

## Altyapı

- **Supabase:** `contributions` tablosu (proje katkıda bulunanları), `subscriptions` (bülten aboneleri)
- **Resend:** Bülten e-postaları (haftalık özet + yeni blog yazısı bildirimi)
- **Cron / API:** `GET /api/newsletter/weekly`, `POST /api/newsletter/notify-post` (CRON_SECRET ile korumalı)

Şablon: [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) (Once UI).  
Lisans: CC BY-NC 4.0 (atıf gerekli, ticari kullanım yok).
