"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { PlayStoreButton } from "@/components/ui/play-store-button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl md:text-3xl font-major tracking-[0.35em] uppercase text-foreground dark:text-white mb-4">
              TAKVAPP
            </h3>
            <p className="text-foreground/70 text-sm">
              Modern İslami yaşam platformu. Namaz vakitleri, Kıble yönü,
              Kuran-ı Kerim okuma ve daha fazlası.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Hızlı Erişim</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/prayer-times"
                  className="text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  Namaz Vakitleri
                </Link>
              </li>
              <li>
                <Link
                  href="/qibla"
                  className="text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  Kıble Yönü
                </Link>
              </li>
              <li>
                <Link
                  href="/quran"
                  className="text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  Kuran-ı Kerim
                </Link>
              </li>
              <li>
                <Link
                  href="/imam-ai"
                  className="text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  Imam AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Hukuki</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h4 className="font-semibold mb-4">Mobil Uygulamamız</h4>
            <div className="flex flex-col gap-3">
              <AppStoreButton
                href="https://apps.apple.com/"
                target="_blank"
                rel="noopener noreferrer"
              />
              <PlayStoreButton
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60">
            © {currentYear} Takvapp. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
