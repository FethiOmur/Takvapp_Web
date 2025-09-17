"use client"

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TestimonialsSectionDemo } from "./TestimonialsSectionDemo";
import CardStack, { type NewsCardData } from "./CardStack";
import { NewsItem } from "@/lib/types";
import { slugify } from "@/lib/utils";

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll-based opacity for fading in when scrolling down
  const { scrollYProgress: scrollInProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Transform scrollYProgress to opacity (0 before it's visible, 1 as it scrolls into view)
  const opacityIn = useTransform(scrollInProgress, [0, 0.5], [0, 1]);
  
  // Scroll-based opacity for fading out when scrolling down
  const { scrollYProgress: scrollOutProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Transform scrollYProgress to opacity (1 at the start, 0.3 as it scrolls out of view)
  const opacityOut = useTransform(scrollOutProgress, [0, 1], [1, 0.3]);

  // Combine both effects
  const opacity = {
    opacity: opacityIn,
    // Apply second opacity effect as the section leaves the viewport
    opacity2: opacityOut,
  };

  useEffect(() => {
    async function fetchNews() {
      try {
        // API route üzerinden (server-side) son haberleri getir
        const res = await fetch(`/api/news?limit=4`, { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch news')
        const latestNews: NewsItem[] = await res.json()
        setNews(latestNews)
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  function newsToCardData(items: NewsItem[]): NewsCardData[] {
    const techCrunchLikeCategories = [
      'AI & ML', 'Apps', 'Startups', 'Venture', 'Policy', 'Space',
      'Hardware', 'Software', 'Cloud', 'Enterprise', 'Mobile', 'Security',
      'Robotics', 'Energy', 'Finance', 'Mobility', 'Gadgets', 'Open Source', 'Gaming'
    ]
    return items.map((n, idx) => ({
      id: Number(n.id) || idx + 1,
      title: n.title,
      category: techCrunchLikeCategories[idx % techCrunchLikeCategories.length],
      summary: n.summary || n.description,
      image_url: n.image,
      author: n.author?.name || 'LLMetric',
      published_at: (n.publishedAt ? new Date(n.publishedAt) : new Date()).toLocaleDateString('tr-TR'),
      read_time: '5 dk',
      views: '0',
      created_at: n.updatedAt,
    }))
  }

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity: opacity.opacity2 }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="news" 
      className="py-24 relative"
    >
      

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest LLM News</h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Stay updated with the most recent developments in the world of Large Language Models
          </p>
        </div>

        <TestimonialsSectionDemo />

        {loading ? (
          <div className="flex justify-center items-center h-[480px]">
            <div className="w-12 h-12 border-4 border-t-transparent border-zinc-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {(() => {
              const all = newsToCardData(news)
              // 9 karta tamamla (haber azsa döngüyle çoğalt)
              const cards: NewsCardData[] = []
              let i = 0
              while (cards.length < 9 && all.length > 0) {
                const base = all[i % all.length]
                cards.push({ ...base, id: cards.length + 1 })
                i++
              }
              const col1 = cards.slice(0, 3)
              const col2 = cards.slice(3, 6)
              const col3 = cards.slice(6, 9)
              return [col1, col2, col3].map((col, idx) => (
                <div key={idx} className="w-full max-w-[360px]">
                  <CardStack
                    newsData={col}
                    autoRotate
                    rotationInterval={4500}
                  />
                </div>
              ))
            })()}
          </div>
        )}
      </div>
    </motion.section>
  );
} 