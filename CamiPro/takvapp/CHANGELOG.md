# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2025-10-12

### Added

#### Core Features
- 🚀 Next.js 14+ (App Router) ile modern web uygulaması
- 🎨 Tailwind CSS 3.4.17 ile dark-themed tasarım sistemi
- 🔤 Major Mono Display fontu ile özel branding
- 📱 Tam responsive tasarım (mobile-first)

#### Pages
- ✨ **Ana Sayfa**: Dinamik hero section, prayer times card, stories, Imam AI section, features grid
- 🕌 **Namaz Vakitleri**: Aladhan API entegrasyonu ile güncel namaz vakitleri
- 🤖 **Imam AI**: OpenRouter API ile chatbot (GPT-5 Mini destekli)
- 🧭 **Kıble Yönü**: Gerçek zamanlı geolocation ile pusula
- 📖 **Kuran-ı Kerim**: Sure listesi (detaylı okuma geliştiriliyor)
- 📿 **Tesbihat**: Animasyonlu dijital sayaç (33, 99, 100 preset)
- 📧 **İletişim**: Modern form ve validation

#### Components
- 🎯 Tubelight Navbar (Framer Motion ile animasyonlu)
- 🃏 Glass Card components
- 💬 Chat Interface (Imam AI için)
- ⏰ Prayer Times Card
- 📱 Stories Section
- 🎨 Gradient effects ve glow animations

#### Technical
- TypeScript için tam tip desteği
- React Query ile API caching
- Zustand ile state management
- Shadcn/ui component library
- Framer Motion ile advanced animations
- Date-fns ile tarih işlemleri

#### APIs & Integrations
- Aladhan API (Namaz vakitleri)
- OpenRouter API (Imam AI)
- Al-Quran Cloud API (Kuran metinleri)
- Geolocation API (Kıble yönü)

#### Database
- Supabase local setup
- Database schema ve migrations
- RLS (Row Level Security) policies
- User authentication hazırlığı

#### Documentation
- Kapsamlı README.md
- Detaylı SETUP_GUIDE.md
- Supabase migration scripts
- .env.example dosyası

### Development Tools
- ESLint configuration
- TypeScript strict mode
- Pretty imports ve path aliases
- Git ignore configuration

### UI/UX Features
- Glassmorphism effects
- Gradient text ve backgrounds
- Smooth page transitions
- Loading states
- Error handling
- Toast notifications (Sonner)
- Responsive navigation

### Performance
- Next.js Image optimization
- Code splitting (automatic)
- Static page generation
- API response caching
- Font optimization (next/font)

## [Upcoming] - Roadmap

### Planned Features
- [ ] Kuran-ı Kerim detaylı okuma sayfası
- [ ] Audio player (Kuran dinleme)
- [ ] User authentication ve profil
- [ ] Bookmark sistemi
- [ ] Namaz vakti push notifications
- [ ] En yakın cami bulucu
- [ ] Blog/Makaleler bölümü
- [ ] Dark/Light mode toggle
- [ ] Multi-language support (TR/EN/AR)
- [ ] Prayer time calculations yerelde
- [ ] Offline mode
- [ ] PWA support
- [ ] Analytics integration

### Known Issues
- date-fns locale import'u optimize edilebilir
- Kuran sayfası detay view'ı eksik
- Monthly prayer calendar yakında eklenecek
- Contact form Supabase entegrasyonu bekleniyor

---

**Format**: [version] - YYYY-MM-DD
**Types**: Added, Changed, Deprecated, Removed, Fixed, Security

