"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, User, Eye, Share2, ChevronLeft } from "lucide-react"

export interface NewsCardData {
  id: number
  title: string
  category: string
  summary: string
  image_url: string
  author: string
  published_at: string
  read_time: string
  views: string
  created_at?: string
}

const categoryColors = {
  "AI & ML": { primary: "#0099CC", secondary: "#007399", text: "#FFFFFF", shadow: "rgba(0, 153, 204, 0.4)" },
  Gaming: { primary: "#CC0099", secondary: "#990073", text: "#FFFFFF", shadow: "rgba(204, 0, 153, 0.4)" },
  Mobile: { primary: "#00CC66", secondary: "#009950", text: "#FFFFFF", shadow: "rgba(0, 204, 102, 0.4)" },
  Security: { primary: "#CC3300", secondary: "#992600", text: "#FFFFFF", shadow: "rgba(204, 51, 0, 0.4)" },
  Hardware: { primary: "#CC9900", secondary: "#997300", text: "#000000", shadow: "rgba(204, 153, 0, 0.4)" },
  Software: { primary: "#6600CC", secondary: "#4D0099", text: "#FFFFFF", shadow: "rgba(102, 0, 204, 0.4)" },
  Startups: { primary: "#2E86AB", secondary: "#1F5E78", text: "#FFFFFF", shadow: "rgba(46,134,171,0.4)" },
  Venture: { primary: "#B23A48", secondary: "#7D2933", text: "#FFFFFF", shadow: "rgba(178,58,72,0.4)" },
  Apps: { primary: "#1ABC9C", secondary: "#128A73", text: "#FFFFFF", shadow: "rgba(26,188,156,0.4)" },
  Policy: { primary: "#2C3E50", secondary: "#1B2733", text: "#FFFFFF", shadow: "rgba(44,62,80,0.4)" },
  Space: { primary: "#6C5CE7", secondary: "#4B3FB3", text: "#FFFFFF", shadow: "rgba(108,92,231,0.4)" },
  Robotics: { primary: "#E17055", secondary: "#B4543F", text: "#FFFFFF", shadow: "rgba(225,112,85,0.4)" },
  Energy: { primary: "#2ECC71", secondary: "#1F8E4B", text: "#FFFFFF", shadow: "rgba(46,204,113,0.4)" },
  Enterprise: { primary: "#34495E", secondary: "#243645", text: "#FFFFFF", shadow: "rgba(52,73,94,0.4)" },
  Cloud: { primary: "#3498DB", secondary: "#246B99", text: "#FFFFFF", shadow: "rgba(52,152,219,0.4)" },
  Finance: { primary: "#9B59B6", secondary: "#6C3F82", text: "#FFFFFF", shadow: "rgba(155,89,182,0.4)" },
  Mobility: { primary: "#27AE60", secondary: "#1B7843", text: "#FFFFFF", shadow: "rgba(39,174,96,0.4)" },
  Gadgets: { primary: "#F39C12", secondary: "#AD6E0C", text: "#000000", shadow: "rgba(243,156,18,0.4)" },
  "Open Source": { primary: "#16A085", secondary: "#0F6E5C", text: "#FFFFFF", shadow: "rgba(22,160,133,0.4)" },
} as const

function getCategoryColors(category: string) {
  return categoryColors[category as keyof typeof categoryColors] || categoryColors["AI & ML"]
}

export interface CardStackProps {
  newsData: NewsCardData[]
  category?: string
  autoRotate?: boolean
  rotationInterval?: number
}

export default function CardStack({ newsData, category, autoRotate = true, rotationInterval = 4000 }: CardStackProps) {
  const [cards, setCards] = useState<NewsCardData[]>(() => {
    const filteredData = category
      ? newsData.filter((item) => item.category.toLowerCase() === category.toLowerCase())
      : newsData
    return shuffleArray(filteredData)
  })

  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate)
  const [cardHistory, setCardHistory] = useState<NewsCardData[]>([])

  useEffect(() => {
    const filteredData = category
      ? newsData.filter((item) => item.category.toLowerCase() === category.toLowerCase())
      : newsData
    setCards(shuffleArray(filteredData))
  }, [newsData, category])

  useEffect(() => {
    if (!isAutoRotating || cards.length === 0) return

    const intervalId = setInterval(() => {
      setCards((prevCards) => {
        if (!prevCards || prevCards.length === 0) return prevCards
        const [firstCard, ...restCards] = prevCards
        setCardHistory((prev) => [firstCard, ...prev.slice(0, 4)])
        return [...restCards, firstCard]
      })
    }, rotationInterval)

    return () => clearInterval(intervalId)
  }, [isAutoRotating, rotationInterval, cards.length])

  const handleMouseEnter = () => setIsAutoRotating(false)
  const handleMouseLeave = () => setIsAutoRotating(autoRotate)

  const showPreviousCard = () => {
    if (cardHistory.length === 0) return
    const [previousCard, ...restHistory] = cardHistory
    setCardHistory(restHistory)
    setCards((prevCards) => [previousCard, ...prevCards.slice(0, -1)])
  }

  const moveCardToBack = (id: number) => {
    setCards((prevCards) => {
      if (!prevCards || prevCards.length === 0) return prevCards
      const cardIndex = prevCards.findIndex((c) => c && c.id === id)
      if (cardIndex === -1) return prevCards
      const cardToMove = prevCards[cardIndex]
      const remainingCards = prevCards.filter((c) => c && c.id !== id)
      setCardHistory((prev) => [cardToMove, ...prev.slice(0, 4)])
      return [...remainingCards, cardToMove]
    })
  }

  if (cards.length === 0) {
    return (
      <div className="relative h-[480px] w-full flex items-center justify-center">
        <div className="text-white/60 text-center">
          <div className="text-lg font-medium mb-2">Henüz haber yok</div>
          <div className="text-sm">Yeni haberler eklendiğinde burada görünecek</div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-[420px] w-[360px]" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <AnimatePresence mode="popLayout">
        {cards.slice(0, 3).map(
          (card, index) =>
            card && (
              <NewsCard
                key={card.id}
                card={card}
                index={index}
                moveCardToBack={moveCardToBack}
                totalCards={Math.min(cards.length, 3)}
                showPreviousCard={showPreviousCard}
                canShowPrevious={cardHistory.length > 0}
              />
            ),
        )}
      </AnimatePresence>
    </div>
  )
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface NewsCardProps {
  card: NewsCardData
  index: number
  moveCardToBack: (id: number) => void
  totalCards: number
  showPreviousCard: () => void
  canShowPrevious: boolean
}

function NewsCard({ card, index, moveCardToBack, totalCards, showPreviousCard, canShowPrevious }: NewsCardProps) {
  const colors = getCategoryColors(card.category)
  const zIndex = totalCards - index
  const yOffset = index * 30
  const xOffset = index * 5

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 100, x: xOffset }}
      animate={{
        opacity: 1,
        y: yOffset,
        x: xOffset,
        scale: 1 - index * 0.04,
        rotateZ: index * -3,
      }}
      exit={{
        opacity: 0,
        x: -400,
        rotateZ: -15,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
      style={{
        zIndex,
        boxShadow: `0 ${10 + index * 5}px ${30 + index * 10}px ${colors.shadow}`,
        backgroundColor: colors.primary,
        transform: `translate3d(${xOffset}px, ${yOffset}px, 0) scale(${1 - index * 0.04}) rotateZ(${index * -3}deg)`,
        willChange: "transform",
      }}
      className="absolute left-0 top-0 h-full w-full cursor-grab overflow-hidden rounded-2xl active:cursor-grabbing"
      drag={index === 0}
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={(_, info) => {
        if (index === 0) {
          const distance = Math.sqrt(Math.pow(info.offset.x, 2) + Math.pow(info.offset.y, 2))
          if (distance > 150) moveCardToBack(card.id)
        }
      }}
      whileDrag={{ scale: 1.05, boxShadow: `0 ${15 + index * 5}px ${40 + index * 10}px ${colors.shadow}`, transition: { duration: 0.1 } }}
    >
      <motion.div className="relative flex h-full flex-col overflow-hidden rounded-2xl" style={{ color: colors.text }}>
        <div className="flex items-center justify-between p-4">
          <div className="rounded-full px-3 py-1 text-sm font-bold text-black bg-white">{card.category}</div>
          <div className="flex items-center gap-3">
            {index === 0 && (
              <button
                onClick={showPreviousCard}
                disabled={!canShowPrevious}
                className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium transition-all ${
                  canShowPrevious
                    ? "border-white/30 bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                    : "border-white/10 bg-white/5 text-white/40 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="h-3 w-3" />
                Önceki Kart
              </button>
            )}
            <div className="flex items-center gap-2 text-sm opacity-90" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
              <Clock className="h-4 w-4" />
              {card.published_at}
            </div>
          </div>
        </div>

        <div className="px-4 py-2">
          <h2 className="text-2xl font-bold leading-tight" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
            {card.title}
          </h2>
          <p className="mt-2 text-sm opacity-90 leading-relaxed" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
            {card.summary}
          </p>
        </div>

        <div className="mt-4 overflow-hidden px-4">
          <div
            className="aspect-video w-full overflow-hidden rounded-xl bg-cover bg-center"
            style={{ backgroundImage: `url(${card.image_url})`, boxShadow: `0 10px 30px ${colors.shadow}` }}
          />
        </div>

        <div className="mt-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
                {card.author}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm opacity-90" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {card.views}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {card.read_time}
              </div>
              <Share2 className="h-4 w-4 cursor-pointer hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        {index === 0 && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-col items-center">
            <motion.div
              className="h-1 w-10 rounded-full"
              style={{ backgroundColor: `${colors.text}40` }}
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}


