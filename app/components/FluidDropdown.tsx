"use client"

import * as React from "react"
import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronDown, Sparkles } from "lucide-react"
import { popularModels } from "@/app/data/models-data"
import { useClickAway } from "@/hooks/use-click-away"

interface Category { id: string; label: string }

const categories: Category[] = [
  { id: "all", label: "All" },
  ...popularModels.map(m => ({ id: m.id, label: m.title }))
]

const IconWrapper = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div className="w-4 h-4 mr-2 relative" initial={false} animate={isHovered ? { scale: 1.2 } : { scale: 1 }}>
    <Sparkles className="w-4 h-4" />
  </motion.div>
)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export default function FluidDropdown() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState<Category>(categories[0])
  const [hoveredCategory, setHoveredCategory] = React.useState<string | null>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  useClickAway(dropdownRef, () => setIsOpen(false))

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="w-full flex items-center justify-center">
        <div className="w-full px-4 relative" style={{ maxWidth: "calc(24rem - 40px)", height: "40px" }} ref={dropdownRef}>
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              // Filled, pill-shaped trigger
              "w-full justify-between h-10 px-4 rounded-full",
              "bg-neutral-900/70 text-neutral-200 border border-white/10 backdrop-blur-sm",
              "hover:bg-neutral-800/80",
              "focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2 focus:ring-offset-black",
              // Daha akıcı animasyonlar için daha uzun süre ve easing + GPU accel
              "transition-[background,border,color] duration-300 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform",
              isOpen && "bg-neutral-800 text-neutral-200",
            )}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <span className="flex items-center">
              <IconWrapper isHovered={false} />
              {selectedCategory.label}
            </span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex items-center justify-center w-5 h-5">
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </Button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 1, y: 0, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto", transition: { type: "spring", stiffness: 500, damping: 30, mass: 1 } }}
                exit={{ opacity: 0, y: 0, height: 0, transition: { type: "spring", stiffness: 500, damping: 30, mass: 1 } }}
                className="absolute left-4 right-4 top-full mt-2 will-change-transform"
                onKeyDown={handleKeyDown}
              >
                <motion.div className={cn("absolute w-full rounded-2xl border border-white/10", "bg-neutral-900/80 p-1 shadow-lg backdrop-blur-sm")}
                  initial={{ borderRadius: 16, y: -4, opacity: 0 }}
                  animate={{ borderRadius: 20, y: 0, opacity: 1, transition: { duration: 0.25, ease: [0.22,1,0.36,1] } }}
                  exit={{ y: -4, opacity: 0, transition: { duration: 0.2 } }}
                  style={{ transformOrigin: "top" }}
                >
                  <motion.div className="py-2 relative" variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div
                      layoutId="hover-highlight"
                      className="absolute inset-x-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 transition-[border-radius,background] duration-200"
                      animate={{
                        y:
                          categories.findIndex((c) => (hoveredCategory || selectedCategory.id) === c.id) * 40 +
                          (categories.findIndex((c) => (hoveredCategory || selectedCategory.id) === c.id) > 0 ? 20 : 0),
                        height: 40,
                      }}
                      transition={{ type: "spring", bounce: 0.2, stiffness: 300, damping: 26 }}
                    />
                    {categories.map((category, index) => (
                      <React.Fragment key={category.id}>
                        {index === 1 && <motion.div className="mx-4 my-2.5 border-t border-neutral-700/60" variants={itemVariants} />}
                        <motion.button
                          onClick={() => {
                            setSelectedCategory(category)
                            setIsOpen(false)
                          }}
                          onHoverStart={() => setHoveredCategory(category.id)}
                          onHoverEnd={() => setHoveredCategory(null)}
                          className={cn(
                            "relative flex w-full items-center px-4 py-2.5 text-sm rounded-md",
                            "transition-colors duration-150",
                            "focus:outline-none",
                            selectedCategory.id === category.id || hoveredCategory === category.id ? "text-neutral-200" : "text-neutral-400",
                          )}
                          whileTap={{ scale: 0.98 }}
                          variants={itemVariants}
                        >
                          <IconWrapper isHovered={hoveredCategory === category.id} />
                          {category.label}
                        </motion.button>
                      </React.Fragment>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  )
}


