export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: string[];
}

export interface ChatRequest {
  message: string;
  history: Message[];
}

export interface ChatResponse {
  reply: string;
  sources?: string[];
}

