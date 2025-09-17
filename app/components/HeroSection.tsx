"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { ActionSearchBar } from "@/components/ui/action-search-bar"
import { MorphingText } from "@/components/ui/liquid-text"
import GradientMenu from "./GradientMenu"
import FluidDropdown from "./FluidDropdown"
import ChatInput from "./ChatInput"
const FloatingParticle = dynamic(() => import("./FloatingParticle"), { ssr: false })

// FloatingParticle artık ayrı dosyadan import ediliyor

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section ref={containerRef} className="min-h-screen relative pt-24">

      <motion.div style={{ y, opacity }} className="relative pt-24 md:pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-7xl md:text-8xl font-bold mb-6 tracking-tight relative">
              <MorphingText
                texts={["Compare LLMs Easily", "Find LLMs Easily", "Search LLMs Easily"]}
                intervalMs={3500}
                className="inline-block"
                textClassName="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400"
              />
              <motion.span
                className="absolute -inset-1 bg-white rounded-full blur-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              />
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-zinc-400 max-w-3xl mx-auto">
              Analyze and compare different Large Language Models.
            </p>
            
            <div className="mt-8 max-w-4xl mx-auto w-full">
              <ChatInput />
            </div>

            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
              <div className="max-w-[320px] w-full order-2 md:order-1">
                <FluidDropdown />
              </div>
              <div className="shrink-0 order-1 md:order-2">
                <GradientMenu />
              </div>
              <div className="max-w-[320px] w-full order-3 md:order-3">
                <FluidDropdown />
              </div>
            </div>
          </motion.div>

          {/* Stats bölümü kaldırıldı */}
        </div>
      </motion.div>
    </section>
  )
}
