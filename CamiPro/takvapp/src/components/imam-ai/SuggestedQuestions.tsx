"use client";

import { motion } from "framer-motion";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

const questions = [
  "Namaz nasıl kılınır?",
  "Abdest nasıl alınır?",
  "Zekât nedir ve kimler vermek zorunda?",
  "Oruç tutmanın şartları nelerdir?",
  "Hac ibadeti nasıl yapılır?",
  "Cuma namazının önemi nedir?",
];

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="w-full max-w-2xl">
      <p className="text-sm text-foreground/60 mb-4">Önerilen sorular:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {questions.map((question, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => onSelect(question)}
            className="text-left p-4 glass-card rounded-xl hover:bg-muted/50 transition-all group"
          >
            <span className="text-sm text-foreground/80 group-hover:text-primary transition-colors">
              {question}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

