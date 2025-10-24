"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TasbihCounter() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);

  const handleClick = () => {
    setCount((prev) => prev + 1);
    
    // Vibration feedback (if supported)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const progress = (count / target) * 100;

  return (
    <div className="max-w-md mx-auto">
      {/* Preset Buttons */}
      <div className="flex gap-3 mb-8 justify-center">
        {[33, 99, 100].map((num) => (
          <Button
            key={num}
            onClick={() => {
              setTarget(num);
              setCount(0);
            }}
            variant={target === num ? "default" : "outline"}
            className={target === num ? "bg-primary text-black" : ""}
          >
            {num}
          </Button>
        ))}
      </div>

      {/* Counter Circle */}
      <div className="relative">
        {/* Progress Ring */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/20"
          />
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className="text-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ duration: 0.3 }}
            style={{
              pathLength: progress / 100,
              strokeDasharray: "565.48",
            }}
          />
        </svg>

        {/* Counter Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="absolute inset-0 m-8 glass-card rounded-full flex flex-col items-center justify-center cursor-pointer active:bg-primary/10"
        >
          <motion.span
            key={count}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-bold gradient-text"
          >
            {count}
          </motion.span>
          <span className="text-sm text-foreground/60 mt-2">/ {target}</span>
        </motion.button>
      </div>

      {/* Reset Button */}
      <div className="text-center mt-8">
        <Button
          onClick={handleReset}
          variant="outline"
          className="rounded-full"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Sıfırla
        </Button>
      </div>

      {/* Completion Message */}
      {count >= target && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-6 p-4 glass-card rounded-2xl"
        >
          <p className="text-primary font-semibold">
            Masha Allah! {target} tesbihatı tamamladınız! 🎉
          </p>
        </motion.div>
      )}
    </div>
  );
}

