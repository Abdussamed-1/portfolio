# Samet Erkalp – Portfolio

Kişisel portfolyo sitesi: yapay zeka, veri bilimi ve biyoinformatik alanındaki projeler, blog yazıları ve güncel haberler.

**Tech stack:** Next.js 16, Once UI (Magic Portfolio), MDX, Supabase, Resend

---

## İçerik

- **Ana sayfa** – Kısa tanıtım ve öne çıkan proje
- **Hakkımda** – Özgeçmiş, beceriler, eğitim
- **Projeler** – İş deneyimleri ve projeler (Supabase ile katkıda bulunanlar)
- **Blog** – MDX ile yazılar (örn. biyoinformatik, Kubernetes)
- **Haberler** – Teknoloji haberleri (RSS feed’ler)
- **Bülten** – E-posta aboneliği (Supabase + Resend; haftalık özet ve yeni yazı bildirimi)

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
