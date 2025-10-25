"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Story {
  id: string;
  title: string;
  image: string;
  isLive?: boolean;
}

const stories: Story[] = [
  {
    id: "1",
    title: "Kabe",
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400",
    isLive: true,
  },
  {
    id: "2",
    title: "Günün Hadisi",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400",
  },
  {
    id: "3",
    title: "Seyitin",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=400",
  },
  {
    id: "4",
    title: "Gözü Bitli",
    image: "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=400",
  },
  {
    id: "5",
    title: "Dua",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
];

export function StoriesSection() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex-shrink-0 cursor-pointer group"
            >
              <div className="relative">
                {/* Gradient Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-primary p-[3px] -z-10" />
                
                {/* Image Container */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-background">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {story.isLive && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      LIVE
                    </div>
                  )}
                </div>
              </div>
              <p className="text-center text-sm mt-2 text-foreground/80 max-w-[100px] truncate">
                {story.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

