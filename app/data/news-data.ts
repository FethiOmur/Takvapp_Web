import { NewsItem, Tag, Author } from '@/lib/types';
import { slugify } from '@/lib/utils';
import { tagsData } from './tags-data';
import { authorsData } from './authors-data';

const findTags = (names: string[]): Tag[] => {
  const lower = names.map(n => n.toLowerCase())
  return tagsData.filter(t => lower.includes(t.name.toLowerCase()) || lower.includes(t.slug.toLowerCase()))
}

const findAuthor = (name: string): Author | undefined => {
  const n = name.toLowerCase()
  return authorsData.find(a => a.name.toLowerCase() === n)
}

export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: "GPT-5 Announcement",
    description:
      "OpenAI has officially announced GPT-5, promising unprecedented reasoning capabilities and multimodal understanding. The new model features a 10x larger parameter count than GPT-4, advanced reasoning capabilities, improved multimodal understanding, enhanced factual accuracy, reduced hallucinations, and an expanded context window of 100k tokens. This represents a significant leap forward in AI capabilities and is expected to set new benchmarks for performance across a wide range of tasks.",
    summary: 
      "OpenAI announced GPT-5 with 10x larger parameter count than GPT-4. Features improved reasoning, multimodal understanding, and reduced hallucinations. Context window expanded to 100k tokens.",
    image: "/news/gpt5.jpg",
    link: "/news/gpt-5-announcement",
    slug: slugify("GPT-5 Announcement"),
    publishedAt: '2024-08-01T09:00:00.000Z',
    updatedAt: '2024-08-01T09:00:00.000Z',
    tags: findTags(['GPT', 'Benchmark']),
    author: findAuthor('AI News Team')
  },
  {
    id: '2',
    title: "Claude 3 Sonnet Released",
    description:
      "Anthropic has released Claude 3 Sonnet, a more efficient and cost-effective version of their flagship AI assistant. The new model is 2x faster than Claude 3 Opus while being 30% more cost-effective. It features improved coding capabilities, better instruction following, enhanced multilingual support, and new API features for developers. Sonnet represents a balanced approach between performance and efficiency in the Claude 3 family.",
    summary:
      "Anthropic released Claude 3 Sonnet, 2x faster than Opus and 30% more cost-effective. Offers better coding, instruction following and multilingual support.",
    image: "/news/claude3.jpg",
    link: "/news/claude-3-sonnet-released",
    slug: slugify("Claude 3 Sonnet Released"),
    publishedAt: '2024-06-15T10:00:00.000Z',
    updatedAt: '2024-06-15T10:00:00.000Z',
    tags: findTags(['Claude']),
    author: findAuthor('Tech Analyst')
  },
  {
    id: '3',
    title: "Llama 3 Open Source",
    description:
      "Meta has released Llama 3 as fully open source, allowing unrestricted commercial use and modification. This 70B parameter model is competitive with closed models while offering the flexibility of an open source license. The release has sparked a wave of community-driven improvements and implementations, accelerating innovation in the open source AI ecosystem and making powerful language models more accessible to developers worldwide.",
    summary:
      "Meta released Llama 3 as fully open source with unrestricted commercial use. The 70B parameter model is competitive with closed systems and sparks community innovation.",
    image: "/news/llama3.jpg",
    link: "/news/llama-3-open-source",
    slug: slugify("Llama 3 Open Source"),
    publishedAt: '2024-05-20T11:00:00.000Z',
    updatedAt: '2024-05-20T11:00:00.000Z',
    tags: findTags(['Llama', 'Open Source']),
    author: findAuthor('AI News Team')
  },
  {
    id: '4',
    title: "LLM Benchmark Results",
    description:
      "The latest MMLU and HELM benchmark results show significant improvements across all major language models. GPT-4 leads in reasoning tasks, Claude 3 tops in factuality, Llama 3 shows impressive gains, Mistral Large excels in coding, and Gemini Ultra improves in math. Overall, there's a 15% improvement across models compared to the previous generation, highlighting the rapid pace of advancement in LLM capabilities.",
    summary:
      "Latest benchmarks show major improvements across all LLMs. GPT-4 leads in reasoning, Claude 3 in factuality, and Mistral in coding. Overall 15% improvement from previous generation.",
    image: "/news/benchmark.jpg",
    link: "/news/llm-benchmark-results",
    slug: slugify("LLM Benchmark Results"),
    publishedAt: '2024-07-10T12:00:00.000Z',
    updatedAt: '2024-07-10T12:00:00.000Z',
    tags: findTags(['Benchmark']),
    author: findAuthor('Tech Analyst')
  },
  {
    id: '5',
    title: "Mistral AI Raises $500M",
    description:
      "Mistral AI has secured $500 million in Series B funding, valuing the company at $5 billion. The French AI startup has gained significant attention for its efficient and powerful open models. With this funding, Mistral plans to expand its research team, enhance its computing infrastructure, and develop more specialized models for enterprise applications, positioning itself as a strong competitor in the rapidly evolving AI market.",
    summary:
      "Mistral AI secured $500M in Series B at a $5B valuation. Plans to expand research, enhance infrastructure, and develop specialized enterprise models.",
    image: "/news/mistral.jpg",
    link: "/news/mistral-ai-raises-500m",
    slug: slugify("Mistral AI Raises $500M"),
    publishedAt: '2024-04-18T13:00:00.000Z',
    updatedAt: '2024-04-18T13:00:00.000Z',
    tags: findTags(['Mistral', 'Funding']),
    author: findAuthor('AI News Team')
  },
  {
    id: '6',
    title: "New LLM Fine-tuning Technique",
    description:
      "Researchers have developed a new fine-tuning technique that reduces computational requirements by 80% while maintaining model performance. This breakthrough approach combines sparse activation patterns with targeted parameter updates, allowing for more efficient adaptation of large models to specific tasks. The technique promises to democratize fine-tuning by making it accessible to organizations with more limited computational resources.",
    summary:
      "New fine-tuning technique reduces computation by 80% while maintaining performance. Uses sparse activation with targeted updates to make fine-tuning accessible to more organizations.",
    image: "/news/finetuning.jpg",
    link: "/news/new-llm-fine-tuning-technique",
    slug: slugify("New LLM Fine-tuning Technique"),
    publishedAt: '2024-03-05T14:00:00.000Z',
    updatedAt: '2024-03-05T14:00:00.000Z',
    tags: findTags(['Fine-tuning']),
    author: findAuthor('Tech Analyst')
  },
];