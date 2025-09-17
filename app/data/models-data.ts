import { ModelItem } from '@/lib/types';
import { slugify } from '@/lib/utils';

export const popularModels: ModelItem[] = [
  {
    id: "gpt-4-turbo",
    title: "GPT-4 Turbo",
    description: "OpenAI'nin en yeni modeli ile yaratıcı ve doğru içerikler oluşturun. Geniş bellek penceresi ve zengin multimodal özellikler sunar.",
    provider: "OpenAI",
    image: "/models/gpt4.jpg",
    link: "/models/gpt-4-turbo",
    slug: slugify('GPT-4 Turbo'),
    category: 'closed',
    pricing: { free: false, currency: 'USD', tier: 'pro' },
    capabilities: { vision: true, functionCalling: true, jsonMode: true, streaming: true, multilingual: true, reasoning: true, contextWindow: 128000 },
    benchmarks: { overall: 91, mmlu: 88, coding: 92, math: 89 }
  },
  {
    id: "claude-3-7-sonnet",
    title: "Claude 3.7 Sonnet",
    description: "Anthropic'in gelişmiş diyalog yeteneklerine sahip yapay zekası. Mükemmel doğallık, doğruluk ve etik özellikler.",
    provider: "Anthropic",
    image: "/models/claude.jpg",
    link: "/models/claude-3-7-sonnet",
    slug: slugify('Claude 3.7 Sonnet'),
    category: 'closed',
    pricing: { free: false, currency: 'USD', tier: 'pro' },
    capabilities: { vision: true, functionCalling: true, jsonMode: true, streaming: true, multilingual: true, reasoning: true, contextWindow: 200000 },
    benchmarks: { overall: 90, mmlu: 89, coding: 88, math: 87 }
  },
  {
    id: "llama-3-70b",
    title: "Llama 3 70B",
    description: "Meta'nın açık kaynak kodlu güçlü dil modeli. Tüm geliştiricilerin erişebileceği yüksek kaliteli yapay zeka deneyimi.",
    provider: "Meta",
    image: "/models/llama3.jpg",
    link: "/models/llama-3-70b",
    slug: slugify('Llama 3 70B'),
    category: 'open',
    pricing: { free: true, currency: 'USD', tier: 'free' },
    capabilities: { vision: false, functionCalling: true, jsonMode: true, streaming: true, multilingual: true, reasoning: false, contextWindow: 8000 },
    benchmarks: { overall: 83, mmlu: 80, coding: 82, math: 78 }
  },
  {
    id: "gemini-1-5-pro",
    title: "Gemini 1.5 Pro",
    description: "Google'ın multimodal modeli ile metin, görüntü, kod ve ses arasında kusursuz geçiş yapın. Yüksek bağlam kapasitesi sunar.",
    provider: "Google",
    image: "/models/gemini.jpg",
    link: "/models/gemini-1-5-pro",
    slug: slugify('Gemini 1.5 Pro'),
    category: 'closed',
    pricing: { free: false, currency: 'USD', tier: 'pro' },
    capabilities: { vision: true, functionCalling: true, jsonMode: true, streaming: true, multilingual: true, reasoning: true, contextWindow: 1000000 },
    benchmarks: { overall: 88, mmlu: 86, coding: 87, math: 90 }
  },
  {
    id: "mistral-large",
    title: "Mistral Large",
    description: "Mistral AI'nin performans odaklı modeli. Etkileyici çıkarım hızı ve kodu anlama yetenekleriyle öne çıkar.",
    provider: "Mistral AI",
    image: "/models/mistral.jpg",
    link: "/models/mistral-large",
    slug: slugify('Mistral Large'),
    category: 'closed',
    pricing: { free: false, currency: 'USD', tier: 'pro' },
    capabilities: { vision: false, functionCalling: true, jsonMode: true, streaming: true, multilingual: true, reasoning: true, contextWindow: 32000 },
    benchmarks: { overall: 86, mmlu: 84, coding: 90, math: 82 }
  },
  {
    id: "grok-3",
    title: "Grok 3",
    description: "xAI'ın güncel olaylar hakkında bilgi sahibi ve mizah anlayışı olan liderlik modeli. İnternet erişimi ile gerçek zamanlı bilgiler sunar.",
    provider: "xAI",
    image: "/models/grok.jpg",
    link: "/models/grok-3",
    slug: slugify('Grok 3'),
    category: 'closed',
    pricing: { free: false, currency: 'USD', tier: 'pro' },
    capabilities: { vision: true, functionCalling: true, jsonMode: true, streaming: true, multilingual: true, reasoning: true, contextWindow: 200000 },
    benchmarks: { overall: 85, mmlu: 83, coding: 84, math: 80 }
  }
] 