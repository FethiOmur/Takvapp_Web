import { useState } from 'react';
import type { Message } from '@/types/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    setIsLoading(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate a delay for the assistant's response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: "This is a dummy response from Imam AI.",
      timestamp: new Date(),
      sources: ["Quran 2:255", "Sahih al-Bukhari 5010"],
    };
    setMessages((prev) => [...prev, assistantMessage]);

    setIsLoading(false);
  };

  return { messages, isLoading, sendMessage };
};
