"use client";

import { Message } from "@/types/chat";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale/tr";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const formattedTime = format(new Date(message.timestamp), "HH:mm", { locale: tr });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}
    >
      <div
        className={cn(
          "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl",
          isUser
            ? "bg-primary text-black shadow-[0_12px_35px_-18px_rgba(34,211,238,0.65)]"
            : "bg-gradient-to-br from-emerald-500/70 via-cyan-500/70 to-blue-500/70 text-white",
        )}
      >
        {isUser ? <User className="size-5" /> : <Bot className="size-5" />}
      </div>

      <div className={cn("flex flex-1", isUser && "justify-end")}
      >
        <div
          className={cn(
            "max-w-[82%] rounded-3xl px-5 py-4 shadow-sm backdrop-blur-xl",
            isUser
              ? "bg-primary text-black"
              : "bg-white/82 text-slate-900 border border-black/5 dark:bg-white/[0.06] dark:text-white dark:border-white/12",
          )}
        >
          <div className="text-sm leading-relaxed text-current whitespace-pre-wrap">
            {message.content}
          </div>

          {message.sources && message.sources.length > 0 && (
            <div className="mt-3 border-t border-black/5 pt-3 text-left text-xs text-muted-foreground/80 dark:border-white/12">
              <p className="mb-2 font-semibold uppercase tracking-[0.25em] opacity-70">
                Kaynaklar
              </p>
              <ul className="space-y-1">
                {message.sources.map((source, index) => (
                  <li key={index} className="opacity-70">
                    {source}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground/70">
            <span>{formattedTime}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
