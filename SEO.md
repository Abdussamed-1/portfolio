# SEO Optimizasyon Rehberi

Bu dokümantasyon, portfolyo sitesinin Google ve diğer arama motorlarında daha iyi sıralanması için yapılan SEO iyileştirmelerini açıklar.

## ✅ Yapılan İyileştirmeler

### 1. **Sitemap.xml**
- ✅ Tüm sayfalar (ana sayfa, blog, projeler, hakkımda, haberler) dahil
- ✅ Priority ve changeFrequency değerleri eklendi
- ✅ LastModified tarihleri güncelleniyor
- ✅ `/sitemap.xml` otomatik oluşturuluyor

### 2. **Robots.txt**
- ✅ Googlebot ve diğer botlar için kurallar
- ✅ `/api/` ve `/_next/` dizinleri engellendi
- ✅ Sitemap referansı eklendi
- ✅ Host bilgisi eklendi

### 3. **Structured Data (JSON-LD)**
- ✅ **Person Schema**: Kişisel bilgiler (isim, rol, e-posta, sosyal linkler)
- ✅ **Organization/WebSite Schema**: Site bilgileri
- ✅ **BlogPosting Schema**: Her blog yazısı için (yazar, tarih, görsel)
- ✅ **BreadcrumbList Schema**: Blog yazılarında navigasyon

### 4. **Meta Tags**
- ✅ Open Graph (OG) tags (Facebook, LinkedIn paylaşımları için)
- ✅ Twitter Card tags
- ✅ Canonical URL'ler (duplicate content önleme)
- ✅ hreflang tags (EN/TR dil alternatifleri)

### 5. **Blog Yazıları**
- ✅ Reading time hesaplama (okuma süresi)
- ✅ Breadcrumbs (ana sayfa > blog > yazı)
- ✅ Alt text'ler görsellerde
- ✅ Semantic HTML (`<article>`, `<section>`)

### 6. **Performance**
- ✅ Next.js Image optimization (otomatik)
- ✅ Lazy loading görsellerde
- ✅ Static generation (SSG) blog ve proje sayfaları için

---

## 📋 Yapılması Gerekenler (Manuel)

### 1. **Google Search Console**
1. [Google Search Console](https://search.google.com/search-console) hesabı oluştur
2. Site ekle (URL prefix veya domain property)
3. Doğrulama yap (HTML tag, DNS, veya Google Analytics)
4. Sitemap'i gönder: `https://yourdomain.com/sitemap.xml`

### 2. **Google Analytics / Google Tag Manager**
- Google Analytics 4 ekle (isteğe bağlı)
- `src/app/layout.tsx` içine script ekle

### 3. **baseURL Güncelle**
- `src/resources/once-ui.config.ts` içindeki `baseURL`'i gerçek domain'inle değiştir
- Şu an: `"https://demo.magic-portfolio.com"`
- Olması gereken: `"https://yourdomain.com"` veya `"https://yourname.vercel.app"`

### 4. **Sosyal Medya Doğrulama**
- LinkedIn, X (Twitter) için meta tag'ler zaten var
- İstersen Facebook Pixel ekleyebilirsin

### 5. **Backlinks ve İçerik**
- LinkedIn profilinde site linkini paylaş
- GitHub README'de site linkini ekle
- Blog yazılarını düzenli paylaş (LinkedIn, X)
- Diğer sitelerde guest post veya yorum yaparak backlink kazan

---

## 🔍 SEO Kontrol Listesi

### Teknik SEO
- [x] Sitemap.xml mevcut ve güncel
- [x] Robots.txt doğru yapılandırılmış
- [x] Canonical URL'ler ekli
- [x] hreflang tags (EN/TR)
- [x] Structured data (JSON-LD)
- [x] Meta descriptions her sayfada
- [x] Open Graph tags
- [x] Twitter Card tags
- [ ] Google Search Console bağlı
- [ ] Google Analytics ekli (isteğe bağlı)

### İçerik SEO
- [x] Başlıklar (H1, H2) doğru kullanılmış
- [x] Alt text'ler görsellerde
- [x] Internal linking (blog > projeler)
- [x] Reading time blog yazılarında
- [ ] Blog yazılarında keyword research yapılmış
- [ ] Düzenli içerik güncellemesi

### Performance
- [x] Image optimization (Next.js)
- [x] Lazy loading
- [x] Static generation
- [ ] PageSpeed Insights kontrolü yapıldı
- [ ] Core Web Vitals optimize edildi

---

## 🚀 Hızlı Başlangıç

1. **baseURL'i güncelle:**
   ```ts
   // src/resources/once-ui.config.ts
   const baseURL: string = "https://yourdomain.com";
   ```

2. **Google Search Console'a ekle:**
   - Site ekle
   - Sitemap gönder: `/sitemap.xml`

3. **İlk blog yazılarını paylaş:**
   - LinkedIn'de paylaş
   - X'te paylaş
   - Backlink kazan

4. **Düzenli içerik:**
   - Haftada 1-2 blog yazısı
   - Projeleri güncelle
   - Newsletter ile aboneleri bilgilendir

---

## 📊 İzleme

- **Google Search Console**: Arama performansı, index durumu
- **Google Analytics**: Ziyaretçi istatistikleri (isteğe bağlı)
- **PageSpeed Insights**: Performans metrikleri
- **Ahrefs / SEMrush**: Keyword ranking (ücretli, isteğe bağlı)

---

## 🔗 Faydalı Linkler

- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

**Not:** SEO sürekli bir süreçtir. İçerik kalitesi ve düzenli güncellemeler en önemli faktörlerdir.
