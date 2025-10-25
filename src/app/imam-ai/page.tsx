"use client";

import { Header } from "@/components/layout/Header";
import { ChatInterface } from "@/components/imam-ai/ChatInterface";

export default function ImamAIPage() {
  return (
    <div className="flex h-screen flex-col">
      <Header />

      <main className="flex-1 overflow-hidden pb-20 pt-24">
        <div className="mx-auto h-full max-w-6xl">
          <ChatInterface />
        </div>
      </main>
    </div>
  );
}
