"use client"

import { Sparkles, ArrowRight } from "lucide-react"
import { CreatePostModal } from "@/features/feed/components/create-post-modal"

const prompts = [
  "What made you feel light today?",
  "Who is someone you are grateful for right now?",
  "What is a small victory you achieved recently?",
  "Describe a moment of peace you experienced today.",
  "What is something you're learning about yourself?",
]

export function ReflectionPrompts() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-brand-text font-medium px-1">
        <Sparkles className="h-4 w-4 text-brand-accent" />
        <h2 className="text-sm uppercase tracking-wider">Morning Prompts</h2>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {prompts.map((prompt, index) => (
          <CreatePostModal
            key={index}
            initialContent={prompt}
            mode="journal"
            trigger={
              <button
                className="flex-shrink-0 w-64 p-6 rounded-3xl bg-brand-background border border-brand-border/50 text-left hover:border-brand-accent/30 hover:shadow-soft transition-all duration-300 group"
              >
                <p className="text-lg font-serif text-brand-text mb-4 leading-relaxed italic">
                  "{prompt}"
                </p>
                <div className="flex items-center text-xs text-brand-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Write reflection
                  <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </button>
            }
          />
        ))}
      </div>
    </div>
  )
}
