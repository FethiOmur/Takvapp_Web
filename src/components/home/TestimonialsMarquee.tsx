"use client";

import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee";

const testimonials = [
  {
    author: {
      name: "Zeynep Karaca",
      handle: "@zeynepmobil",
      avatar:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&h=200&fit=crop&crop=faces",
    },
    text: "Takvapp ekiplerimizin Ramazan planlamasını kolaylaştırdı. Özelleştirilebilir bildirimler sayesinde hiçbir vakti kaçırmıyoruz.",
  },
  {
    author: {
      name: "Mehmet Aksoy",
      handle: "@aksoydijital",
      avatar:
        "https://images.unsplash.com/photo-1544723795-3fbcededc66f?w=200&h=200&fit=crop&crop=faces",
    },
    text: "Kıble pusulası ve raporlama özellikleri özellikle yurtdışı seyahatlerimizde vazgeçilmez oldu.",
  },
  {
    author: {
      name: "Selin Çetin",
      handle: "@selincetin",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=faces",
    },
    text: "Imam AI, gençlere İslamı anlatırken güçlü bir yol arkadaşı. Sorulara kaynaklı cevaplar almak güven verdi.",
  },
  {
    author: {
      name: "Yusuf Demir",
      handle: "@yusufdesign",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop&crop=faces",
    },
    text: "Takvapp'in sade tasarımı ve tema seçenekleri ekipçe çok sevildi. Özellikle koyu tema gece kullanımında göz yormuyor.",
  },
];

export function TestimonialsMarquee() {
  return (
    <TestimonialsSection
      title="Binlerce kullanıcı Takvapp ile ritmini buluyor"
      description="İbadet planlamasından topluluk etkinliklerine kadar Takvapp, farklı şehirlerde aynı huzuru paylaştırıyor."
      testimonials={testimonials}
      className="pt-16"
    />
  );
}
