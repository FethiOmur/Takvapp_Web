"use client"

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { ArrowLeft, BarChart3, Zap, DollarSign, Clock, TrendingUp, Trophy, Shield, Cpu } from "lucide-react"
import Link from "next/link"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import { Button } from "@/components/ui/button"

// Arka plan ve ağır animasyonları CSR'a al
const MonochromeBackground = dynamic(() => import("./_components/MonochromeBackground"), { ssr: false })

type ModelInfo = {
  id: string
  title: string
}

// Basit model listesi (anasayfadaki ruh ile uyumlu)
const MODELS: ModelInfo[] = [
  { id: "gpt-4-turbo", title: "GPT-4 Turbo" },
  { id: "claude-3-7-sonnet", title: "Claude 3.7 Sonnet" },
  { id: "llama-3-70b", title: "Llama 3 70B" },
  { id: "gemini-1-5-pro", title: "Gemini 1.5 Pro" },
  { id: "mistral-large-2", title: "Mistral Large 2" },
]

// Karşılaştırma metrikleri
const metrics = [
  { key: "intelligence", label: "Zeka Endeksi", icon: Trophy },
  { key: "mmlu", label: "MMLU", icon: BarChart3 },
  { key: "truthfulness", label: "Doğruluk", icon: Shield },
  { key: "reasoning", label: "Muhakeme", icon: Cpu },
  { key: "coding", label: "Kodlama", icon: Zap },
  { key: "math", label: "Matematik", icon: TrendingUp },
] as const

type MetricKey = typeof metrics[number]["key"]

// Örnek/deterministik skorlar
const SCORES: Record<string, Record<MetricKey, number>> = {
  "gpt-4-turbo": {
    intelligence: 65, mmlu: 86.4, truthfulness: 91.7, reasoning: 88.9, coding: 84.1, math: 78.2,
  },
  "claude-3-7-sonnet": {
    intelligence: 67, mmlu: 88.7, truthfulness: 95.2, reasoning: 92.1, coding: 89.3, math: 76.8,
  },
  "llama-3-70b": {
    intelligence: 64, mmlu: 87.3, truthfulness: 89.4, reasoning: 86.7, coding: 88.6, math: 80.1,
  },
  "gemini-1-5-pro": {
    intelligence: 63, mmlu: 85.9, truthfulness: 90.8, reasoning: 87.2, coding: 84.7, math: 82.6,
  },
  "mistral-large-2": {
    intelligence: 62, mmlu: 84.0, truthfulness: 88.9, reasoning: 85.3, coding: 91.2, math: 77.4,
  },
}

const PRICES: Record<string, string> = {
  "gpt-4-turbo": "$10.00",
  "claude-3-7-sonnet": "$3.00",
  "llama-3-70b": "Free (Open Source)",
  "gemini-1-5-pro": "$3.50",
  "mistral-large-2": "$3.00",
}

export default function ComparePage() {
  // Varsayılan seçim anasayfa görselindeki ikiliye rezonanslı
  const [left, setLeft] = useState<string>("gpt-4-turbo")
  const [right, setRight] = useState<string>("claude-3-7-sonnet")

  const leftScores = useMemo(() => SCORES[left], [left])
  const rightScores = useMemo(() => SCORES[right], [right])

  return (
    <div className="min-h-screen text-white bg-black">
      {/* Sabit navigasyon (anasayfadaki Header) */}
      <Header />
      <MonochromeBackground />

      {/* İçerik */}
      <main className="relative z-10 container mx-auto px-4 pt-28 pb-24">
        {/* Breadcrumb + Geri */}
        <div className="flex items-center gap-2 text-zinc-400 mb-6">
          <ArrowLeft className="w-4 h-4" aria-hidden />
          <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
          <span className="opacity-60">/</span>
          <span>Karşılaştırma</span>
        </div>

        {/* Hero */}
        <section className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
            Modelleri Karşılaştır
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Performans, fiyat ve teknik özellikler açısından iki LLM modelini yan yana inceleyin.
          </p>
        </section>

        {/* Model seçiciler */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[{ side: "left", value: left, setter: setLeft }, { side: "right", value: right, setter: setRight }].map(({ side, value, setter }) => (
            <div key={side} className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md p-6">
              <div className="text-sm text-zinc-400 mb-2">Model Provider</div>
              <select
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
                value={value}
                onChange={(e) => setter(e.target.value)}
              >
                {MODELS.map((m) => (
                  <option key={m.id} value={m.id}>{m.title}</option>
                ))}
              </select>
              <div className="mt-4 text-xs text-zinc-400">Fiyat (1M token)</div>
              <div className="text-lg font-semibold">{PRICES[value]}</div>
            </div>
          ))}
        </section>

        {/* Başlık */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            {MODELS.find(m=>m.id===left)?.title} <span className="text-white/70">vs</span> {MODELS.find(m=>m.id===right)?.title}
          </h2>
          <p className="text-zinc-400">Benchmark metrikleri ve performans göstergeleri</p>
        </div>

        {/* Özellik matrisi */}
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30 backdrop-blur-md">
          <div className="grid grid-cols-12 text-sm">
            <div className="col-span-4 px-4 py-3 text-zinc-400">Özellik</div>
            <div className="col-span-4 px-4 py-3 text-center">{MODELS.find(m=>m.id===left)?.title}</div>
            <div className="col-span-4 px-4 py-3 text-center">{MODELS.find(m=>m.id===right)?.title}</div>
          </div>
          <div className="divide-y divide-white/10">
            {metrics.map(({ key, label, icon: Icon }) => (
              <div key={key} className="grid grid-cols-12 items-center">
                <div className="col-span-4 px-4 py-3 flex items-center gap-2 text-zinc-300">
                  <Icon className="w-4 h-4 text-blue-400" aria-hidden />
                  <span>{label}</span>
                </div>
                <div className="col-span-4 px-4 py-3 text-center font-semibold">
                  {leftScores?.[key] ?? "-"}
                </div>
                <div className="col-span-4 px-4 py-3 text-center font-semibold">
                  {rightScores?.[key] ?? "-"}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Performans kartları */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 text-center">
            <DollarSign className="w-5 h-5 text-zinc-300 mx-auto mb-2" aria-hidden />
            <div className="text-sm text-zinc-400">Fiyat (1M token)</div>
            <div className="mt-1 text-lg font-semibold"><span className="text-white/90">{PRICES[left]}</span> / <span className="text-white/70">{PRICES[right]}</span></div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 text-center">
            <Zap className="w-5 h-5 text-zinc-300 mx-auto mb-2" aria-hidden />
            <div className="text-sm text-zinc-400">Hız (tokens/s)</div>
            <div className="mt-1 text-lg font-semibold"><span className="text-white/90">{leftScores?.coding ?? "-"}</span> / <span className="text-white/70">{rightScores?.coding ?? "-"}</span></div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 text-center">
            <Clock className="w-5 h-5 text-zinc-300 mx-auto mb-2" aria-hidden />
            <div className="text-sm text-zinc-400">Tahmini Gecikme (gösterim amaçlı)</div>
            <div className="mt-1 text-lg font-semibold"><span className="text-white/90">~22ms</span> / <span className="text-white/70">~29ms</span></div>
          </div>
        </section>

        {/* Sticky CTA */}
        <div className="fixed bottom-4 inset-x-0 z-40">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-md p-4 flex items-center justify-between">
              <div className="text-sm">
                <div className="font-semibold">{MODELS.find(m=>m.id===left)?.title} vs {MODELS.find(m=>m.id===right)?.title}</div>
                <div className="text-zinc-400">Fiyat: <span className="text-white/90">{PRICES[left]}</span> / <span className="text-white/70">{PRICES[right]}</span></div>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild className="bg-white text-black hover:bg-zinc-200">
                  <Link href="#">Model Seç</Link>
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">Dışa Aktar</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}