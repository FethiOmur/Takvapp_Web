# Takvapp Kurulum Rehberi

Bu rehber, Takvapp projesini sıfırdan kurmak ve çalıştırmak için adım adım talimatlar içerir.

## 📋 Önkoşullar

1. **Node.js** (v18 veya üzeri)
2. **npm** veya **yarn**
3. **Git** (opsiyonel)

## 🚀 Hızlı Başlangıç

### 1. Proje Kurulumu

Proje zaten oluşturulmuş durumda. Eğer yeni bir terminal açtıysanız:

```bash
cd /Users/fethiomur/Desktop/ProjectExamples/CursorExamples/CamiPro/takvapp
```

### 2. Bağımlılıkları Kontrol Edin

Tüm paketler yüklü olmalı. Kontrol için:

```bash
npm list --depth=0
```

Eğer eksik paket varsa:

```bash
npm install
```

### 3. Environment Variables

`.env.local` dosyası oluşturun (zaten var ama kontrol edin):

```bash
# Supabase (Şimdilik opsiyonel - local development için gerekli değil)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# OpenRouter API (Imam AI özelliği için GEREKLİ)
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx
OPENROUTER_MODEL=openai/gpt-5-mini
```

### 4. Development Server

```bash
npm run dev
```

Tarayıcınızda açın: [http://localhost:3000](http://localhost:3000)

## 🔑 OpenRouter API Key Alma

Imam AI özelliği için OpenRouter API key'e ihtiyacınız var:

1. [OpenRouter.ai](https://openrouter.ai/) sitesine gidin
2. Hesap oluşturun
3. "API Keys" bölümünden yeni bir key oluşturun
4. Key'i `.env.local` dosyasına ekleyin

**Not:** OpenRouter, OpenAI ve diğer birçok modele tek bir API üzerinden erişim sağlar ve genellikle daha uygun fiyatlıdır.

## 🗄️ Supabase Setup (Opsiyonel)

Supabase'i kullanmak isterseniz:

### Yerel Supabase Kurulumu

1. Supabase CLI'yi yükleyin:
```bash
npm install -g supabase
```

2. Supabase'i başlatın:
```bash
npx supabase start
```

3. Connection bilgilerini alın:
```bash
npx supabase status
```

4. `.env.local` dosyasını güncelleyin:
```bash
NEXT_PUBLIC_SUPABASE_URL=<API URL from supabase status>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key from supabase status>
```

### Database Migration

Supabase çalışıyorsa, migration'ları çalıştırın:

```bash
npx supabase db push
```

## 🛠️ Kullanılabilir Komutlar

```bash
# Development server başlat
npm run dev

# Production build oluştur
npm run build

# Production server başlat (build sonrası)
npm start

# Linter çalıştır
npm run lint
```

## 📱 Özellikler ve Test

### Ana Sayfa (/)
- ✅ Dinamik saat gösterimi
- ✅ Namaz vakti countdown
- ✅ Stories section
- ✅ Prayer times card
- ✅ Imam AI section
- ✅ Features grid

### Namaz Vakitleri (/prayer-times)
- ✅ Aladhan API ile namaz vakitleri
- ⏳ Lokasyon seçici (yakında)
- ⏳ Aylık takvim (yakında)

### Imam AI (/imam-ai)
- ✅ Chat interface
- ✅ Önerilen sorular
- ✅ OpenRouter API entegrasyonu
- ⚠️ **OpenRouter API key gerektirir**

### Kıble Yönü (/qibla)
- ✅ Gerçek zamanlı pusulası
- ✅ Geolocation API
- ⚠️ **HTTPS gerektirir (production'da)**

### Kuran-ı Kerim (/quran)
- ✅ Sure listesi
- ⏳ Detaylı okuma (yakında)
- ⏳ Audio player (yakında)

### Tesbihat (/tasbih)
- ✅ Dijital sayaç
- ✅ Preset butonlar (33, 99, 100)
- ✅ Progress ring animasyonu

### İletişim (/contact)
- ✅ İletişim formu
- ✅ Form validation
- ⏳ Supabase entegrasyonu (yakında)

## 🐛 Sorun Giderme

### Port 3000 zaten kullanımda

```bash
# Çalışan servisi bulun
lsof -ti:3000

# Sonlandırın
kill -9 <PID>
```

Veya farklı port kullanın:

```bash
PORT=3001 npm run dev
```

### OpenRouter API Hatası

Imam AI çalışmıyorsa:

1. `.env.local` dosyasında `OPENROUTER_API_KEY` kontrol edin
2. API key'inizin geçerli olduğundan emin olun
3. OpenRouter dashboard'dan kredinizi kontrol edin

### Tailwind CSS Çalışmıyor

```bash
# Tailwind cache'i temizleyin
rm -rf .next
npm run dev
```

### Supabase Bağlantı Hatası

Supabase kullanıyorsanız ve bağlantı hatası alıyorsanız:

```bash
# Supabase durumunu kontrol edin
npx supabase status

# Gerekirse yeniden başlatın
npx supabase stop
npx supabase start
```

## 📝 Geliştirme Notları

### Klasör Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
│   ├── api/               # API routes
│   ├── imam-ai/           # Imam AI sayfası
│   ├── prayer-times/      # Namaz vakitleri
│   └── ...
├── components/             # React componentleri
│   ├── ui/                # Shadcn/ui componentleri
│   ├── home/              # Ana sayfa componentleri
│   ├── imam-ai/           # Imam AI componentleri
│   └── ...
├── lib/                    # Yardımcı fonksiyonlar
│   ├── api/               # API client'ları
│   ├── hooks/             # Custom React hooks
│   └── supabase/          # Supabase client
└── types/                  # TypeScript type tanımları
```

### Stil Sistemi

- **Tailwind CSS**: Utility-first CSS framework
- **Glassmorphism**: `.glass-card` utility class
- **Gradient Text**: `.gradient-text` utility class
- **Renkler**: `primary` (cyan), `secondary` (orange), `accent` (pink)

### API'ler

1. **Aladhan API**: Namaz vakitleri (public, key gerekmez)
2. **OpenRouter API**: Imam AI chatbot (key gerekir)
3. **Al-Quran Cloud API**: Kuran metinleri (public)

## 🎨 Tasarım Özelleştirme

### Renkleri Değiştirme

`src/app/globals.css` dosyasında CSS değişkenlerini düzenleyin:

```css
:root {
  --primary: 189 100% 50%;     /* Cyan */
  --secondary: 18 100% 60%;    /* Orange */
  --accent: 333 100% 50%;      /* Pink */
}
```

### Font Değiştirme

`src/app/layout.tsx` dosyasında Google Fonts'u değiştirin:

```typescript
const majorMono = Major_Mono_Display({
  variable: "--font-major-mono",
  subsets: ["latin"],
  weight: "400",
});
```

## 🚀 Production'a Alma

### Vercel (Önerilen)

1. GitHub'a push edin
2. [Vercel](https://vercel.com)'e giriş yapın
3. Projeyi import edin
4. Environment variables'ı ekleyin
5. Deploy!

### Environment Variables (Production)

Vercel dashboard'dan ekleyin:

```bash
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
OPENROUTER_API_KEY=<your-openrouter-api-key>
OPENROUTER_MODEL=openai/gpt-5-mini
```

### Build Komutu

```bash
npm run build
npm start
```

## 📞 Destek

Sorun yaşarsanız:

1. README.md dosyasını okuyun
2. Console'da hataları kontrol edin
3. GitHub Issues açın
4. info@takvapp.com'a yazın

## ✅ Checklist

- [ ] Node.js kurulu
- [ ] Bağımlılıklar yüklendi (`npm install`)
- [ ] `.env.local` dosyası oluşturuldu
- [ ] OpenRouter API key alındı ve eklendi
- [ ] `npm run dev` çalıştırıldı
- [ ] http://localhost:3000 açıldı
- [ ] Tüm sayfalar test edildi
- [ ] Imam AI test edildi (API key gerektirir)

---

**Not:** Supabase kullanımı tamamen opsiyoneldir. Proje Supabase olmadan da çalışır.

