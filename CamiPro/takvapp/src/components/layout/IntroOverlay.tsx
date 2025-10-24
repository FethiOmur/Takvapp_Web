"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function IntroOverlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!show) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const close: EventListener = () => setShow(false);

    const dismissEvents: Array<[keyof WindowEventMap, EventListener]> = [
      ["wheel", close],
      ["touchstart", close],
      ["mousedown", close],
      ["keydown", close],
    ];

    dismissEvents.forEach(([event, handler]) =>
      window.addEventListener(event, handler, { once: true }),
    );

    const timeoutId = window.setTimeout(() => setShow(false), 6000);

    return () => {
      document.body.style.overflow = "";
      dismissEvents.forEach(([event, handler]) =>
        window.removeEventListener(event, handler),
      );
      window.clearTimeout(timeoutId);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-auto fixed inset-0 z-[60] flex items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.2),transparent_55%),radial-gradient(circle_at_80%_25%,rgba(165,243,252,0.25),transparent_60%),radial-gradient(circle_at_50%_80%,rgba(251,191,36,0.2),transparent_70%),#f3f7ff] backdrop-blur-2xl dark:bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.25),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.35),transparent_60%),radial-gradient(circle_at_50%_80%,rgba(236,72,153,0.2),transparent_65%),#02030f] dark:backdrop-blur-3xl"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <div className="flex flex-col items-center gap-6 text-center text-slate-900 dark:text-white">
              <motion.p
                initial={{ letterSpacing: "0.5em", opacity: 0 }}
                animate={{ letterSpacing: "0.25em", opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="font-major text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-white/70"
              >
                Takvapp
              </motion.p>
              <motion.h1
                className="max-w-2xl text-balance text-3xl font-semibold leading-snug md:text-4xl"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
              >
                Yaratan Rabbinin adıyla oku!
              </motion.h1>
              <motion.p
                className="text-3xl font-semibold text-slate-700 md:text-4xl dark:text-white/80"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              >
                اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
              </motion.p>
              <motion.span
                className="text-xs uppercase tracking-[0.4em] text-slate-500/80 dark:text-white/50"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
              >
                Devam etmek için kaydırın veya dokunun
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
