"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Namaz Vakitleri", href: "/prayer-times" },
  { name: "Kıble", href: "/qibla" },
  { name: "Kuran", href: "/quran" },
  { name: "Tesbihat", href: "/tasbih" },
  { name: "İletişim", href: "/contact" },
];

export function Header() {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuState ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuState]);

  return (
    <header>
      <nav
        data-state={menuState ? "active" : undefined}
        className="group fixed left-0 right-0 top-0 z-50 w-full px-3 sm:px-4"
      >
        <div
          className={cn(
            "mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl border border-transparent px-5 py-4 transition-all duration-300 lg:px-8",
            isScrolled &&
              "max-w-5xl border-border/25 bg-background/22 shadow-lg shadow-black/10 backdrop-blur-2xl lg:px-6",
          )}
        >
          <div className="flex w-full items-center justify-between lg:w-auto lg:gap-10">
            <Link
              href="/"
              aria-label="Takvapp ana sayfa"
              className="flex items-center"
            >
              <Logo />
            </Link>

            <button
              onClick={() => setMenuState((prev) => !prev)}
              aria-label={menuState ? "Menüyü kapat" : "Menüyü aç"}
              className="relative z-20 -mr-2 inline-flex rounded-full p-2 text-foreground transition-colors hover:bg-foreground/10 lg:hidden"
            >
              <Menu className="size-6 transition-transform group-data-[state=active]:scale-0" />
              <X className="absolute inset-0 size-6 scale-0 opacity-0 transition-all group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100" />
            </button>
          </div>

          <div className="hidden lg:block">
            <ul className="flex items-center gap-7 text-sm">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors duration-150 hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden items-center gap-2 lg:flex lg:flex-nowrap">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="rounded-xl px-4 whitespace-nowrap"
            >
              <Link href="/prayer-times">Namaz Vakitleri</Link>
            </Button>

            <ThemeToggle className="rounded-full" />
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none fixed inset-0 z-40 bg-background/80 opacity-0 transition-opacity duration-300",
            menuState && "pointer-events-auto opacity-100 lg:hidden",
          )}
          onClick={() => setMenuState(false)}
        />

        <div
          className={cn(
            "fixed inset-x-4 top-24 z-50 origin-top scale-95 rounded-3xl border border-border/60 bg-background/95 p-6 opacity-0 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 lg:hidden",
            menuState && "scale-100 opacity-100",
          )}
        >
          <div className="space-y-6">
            <nav>
              <ul className="grid gap-4 text-base">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuState(false)}
                      className="flex items-center justify-between rounded-xl border border-transparent px-4 py-3 text-foreground/80 transition-colors duration-150 hover:border-border/40 hover:text-foreground"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="grid gap-3">
              <Button asChild variant="outline" size="lg" className="rounded-xl">
                <Link href="/prayer-times" onClick={() => setMenuState(false)}>
                  Namaz Vakitlerini Gör
                </Link>
              </Button>

              <ThemeToggle className="justify-self-end rounded-full" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

const Logo = ({ className }: { className?: string }) => (
  <span className={cn("font-major text-lg tracking-[0.35em] text-foreground dark:text-white", className)}>
    TAKVAPP
  </span>
);
