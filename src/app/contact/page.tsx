"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    const subject = encodeURIComponent("Takvapp İletişim Formu");
    const body = encodeURIComponent(
      `Ad Soyad: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`,
    );

    window.location.href = `mailto:info@takvapp.com?subject=${subject}&body=${body}`;
    toast.success("Varsayılan e-posta uygulamanız açıldı. Mesajı gönderebilirsiniz.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="px-4 pb-20 pt-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              İletişim
            </h1>
            <p className="text-xl text-foreground/70">
              Sorularınız veya geri bildirimleriniz için bizimle iletişime geçin
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Form */}
            <div className="glass-card rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">Mesaj Gönderin</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    İsim
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    E-posta
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="ornek@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mesaj
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Mesajınızı yazın..."
                    rows={5}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-black"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Mail Uygulamasını Aç
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-card rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-6">İletişim Bilgileri</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">E-posta</p>
                    <p className="font-medium">info@takvapp.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Destek</p>
                    <p className="font-medium">destek@takvapp.com</p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-8">
                <h3 className="font-bold mb-4">Sosyal Medya</h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="block p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href="#"
                    className="block p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="block p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
