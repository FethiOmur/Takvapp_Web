"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

type MorphingTextProps = {
  texts: string[]
  intervalMs?: number
  className?: string
  textClassName?: string
}

export function MorphingText({
  texts,
  intervalMs = 1800,
  className,
  textClassName,
}: MorphingTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!texts || texts.length === 0) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % texts.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [texts, intervalMs])

  return (
    <span className={cn("relative inline-block h-[1em] align-baseline", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={cn("inline-block", textClassName)}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}


