"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessageBubble } from "./MessageBubble";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { TypingIndicator } from "./TypingIndicator";
import { useChat } from "@/lib/hooks/useChat";
import { cn } from "@/lib/utils";

export function ChatInterface() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    await sendMessage(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-6 overflow-y-auto px-6 pb-8 pt-10">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
              <span className="text-4xl">🤖</span>
            </div>
            <h2 className="mb-2 text-2xl font-semibold">Imam AI&apos;ya Hoş Geldiniz</h2>
            <p className="mb-8 max-w-md text-foreground/70">
              İslam&apos;la ilgili sorularınızı sorabilirsiniz. Kur&apos;an ve Sünnet ışığında cevaplar almanızı sağlayacağım.
            </p>
            <SuggestedQuestions onSelect={handleSuggestedQuestion} />
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="border-t border-border/40 bg-gradient-to-t from-background/80 via-background/60 to-background/40 px-4 py-6 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-4xl items-end gap-3 rounded-[28px] border border-black/5 bg-white/85 p-3 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] dark:border-white/12 dark:bg-white/[0.06] dark:shadow-[0_30px_90px_-45px_rgba(1,4,12,0.85)]">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 bg-white/90 text-muted-foreground transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-white/[0.08] dark:text-white/70"
          >
            <Paperclip className="size-4" />
          </button>
          <div className="flex flex-1 flex-col gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Sorunuzu yazın..."
              rows={2}
              className="w-full resize-none bg-transparent text-base text-foreground placeholder:text-foreground/40 focus:outline-none dark:text-white"
              disabled={isLoading}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground/70">
              <span className="inline-flex items-center gap-1">
                <Sparkles className="size-3" />
                Yapay zekâ yanıtları kaynaklı olarak sunar.
              </span>
              <span>{input.length}/500</span>
            </div>
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className={cn(
              "h-11 w-11 rounded-2xl",
              "bg-primary text-black shadow-[0_15px_40px_-20px_rgba(34,211,238,0.75)] hover:bg-primary/90",
            )}
          >
            <Send className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
