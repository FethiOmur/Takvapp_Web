# Takvapp - Modern İslami Yaşam Platformu

Modern, dark-themed bir İslami web uygulaması. Next.js 14+, TypeScript, Tailwind CSS ve Supabase ile geliştirilmiştir.

## 🚀 Özellikler

- ✨ **Ana Sayfa**: Dinamik saat gösterimi, namaz vakti countdown, stories section
- 🕌 **Namaz Vakitleri**: Aladhan API ile anlık namaz vakitleri
- 🤖 **Imam AI**: OpenRouter API ile İslami sorulara yapay zeka destekli yanıtlar (GPT-5 Mini)
- 🧭 **Kıble Yönü**: Gerçek zamanlı konum ile Kıble pusulası
- 📖 **Kuran-ı Kerim**: Sure listesi ve okuma (geliştiriliyor)
- 📿 **Dijital Tesbihat**: Animasyonlu dijital tesbih sayacı
- 📧 **İletişim**: Modern iletişim formu

## 🛠️ Teknoloji Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Dil**: TypeScript
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Shadcn/ui
- **Animasyonlar**: Framer Motion
- **State Management**: Zustand
- **API Caching**: TanStack React Query
- **Database**: Supabase (Local/Cloud)
- **API'ler**:
  - Aladhan API (Namaz Vakitleri)
  - OpenRouter API (Imam AI)
  - Al-Quran Cloud API (Kuran)

## 📦 Kurulum

### Gereksinimler

- Node.js 18+ veya 20+
- npm veya yarn

### Adımlar

1. Projeyi klonlayın veya indirin

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Environment variables'ı ayarlayın:
`.env.local` dosyasını oluşturun ve aşağıdaki değişkenleri ekleyin:

```bash
# Supabase (Local Development)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# OpenRouter API (Imam AI için)
OPENROUTER_API_KEY=your-openrouter-api-key
OPENROUTER_MODEL=openai/gpt-5-mini
```

4. Development server'ı başlatın:
```bash
npm run dev
```

5. Tarayıcınızda açın: [http://localhost:3000](http://localhost:3000)

## 🗄️ Supabase Local Setup (Opsiyonel)

Supabase kullanmak isterseniz:

```bash
# Supabase CLI'yi global olarak yükleyin
npm install -g supabase

# Projeyi başlatın
npx supabase init

# Supabase'i local olarak başlatın
npx supabase start
```

Database schema'yı oluşturmak için `supabase/migrations` klasöründeki SQL dosyalarını kullanın.

## 🎨 Tasarım Sistemi

### Renkler
- **Background**: Saf siyah (#000000)
- **Primary**: Cyan (#00d4ff)
- **Secondary**: Turuncu (#ff6b35)
- **Accent**: Pembe (#ff006e)

### Tipografi
- **Logo**: Major Mono Display
- **Başlıklar & Metin**: Geist Sans

### UI Özellikleri
- Glassmorphism efektleri
- Gradient backgrounds
- Framer Motion animasyonları
- Responsive design (Mobile-first)

## 📱 Sayfalar

- `/` - Ana sayfa
- `/prayer-times` - Namaz vakitleri
- `/imam-ai` - Imam AI chatbot
- `/qibla` - Kıble yönü
- `/quran` - Kuran-ı Kerim
- `/tasbih` - Dijital tesbihat
- `/contact` - İletişim

## 🔌 API Kullanımı

### Aladhan API (Namaz Vakitleri)
```typescript
import { getPrayerTimes } from "@/lib/api/aladhan";

const location = { city: "Istanbul", country: "Turkey" };
const prayerTimes = await getPrayerTimes(location, 2);
```

### Imam AI API
```typescript
const response = await fetch("/api/imam-ai", {
  method: "POST",
  body: JSON.stringify({
    message: "Namaz nasıl kılınır?",
    history: []
  })
});
```

## 🚧 Geliştirilecek Özellikler

- [ ] Kuran-ı Kerim detaylı okuma sayfası
- [ ] Audio player (Kuran dinleme)
- [ ] Kullanıcı authentication (Supabase Auth)
- [ ] Bookmark sistemi
- [ ] Namaz vakti bildirimleri
- [ ] En yakın cami bulucu
- [ ] Blog/Makaleler bölümü
- [ ] Dark/Light mode toggle
- [ ] Multi-language support

## 📝 Notlar

- Imam AI özelliği için OpenRouter API key gereklidir
- Geolocation API kullanımı için HTTPS gerekir (production'da)
- Supabase kullanımı opsiyoneldir, local development için mock data kullanılabilir

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Pull request göndermekten çekinmeyin.

## 📄 Lisans

Bu proje özel bir projedir.

## 📞 İletişim

- Email: info@takvapp.com
- Website: [takvapp.com](https://takvapp.com)

---

**Takvapp Team** tarafından ❤️ ile geliştirilmiştir.
