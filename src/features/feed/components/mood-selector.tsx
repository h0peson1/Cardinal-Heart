"use client"

import { cn } from "@/lib/utils"

const moods = [
  { label: "Calm", color: "bg-blue-100 text-blue-700", emoji: "âœ¨" },
  { label: "Grateful", color: "bg-amber-100 text-amber-700", emoji: "ðŸ™" },
  { label: "Growing", color: "bg-emerald-100 text-emerald-700", emoji: "ðŸŒ¿" },
  { label: "Anxious", color: "bg-stone-100 text-stone-700", emoji: "â˜ï¸" },
  { label: "Reflective", color: "bg-purple-100 text-purple-700", emoji: "ðŸŒ™" },
  { label: "Healing", color: "bg-rose-100 text-rose-700", emoji: "ðŸŒ¸" },
]

interface MoodSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {moods.map((mood) => (
        <button
          key={mood.label}
          type="button"
          onClick={() => onChange(mood.label)}
          className={cn(
            "flex items-center gap-3 p-3 rounded-2xl border-2 transition-all duration-300 text-sm font-medium",
            value === mood.label 
              ? "border-brand-accent bg-brand-surface shadow-soft scale-105" 
              : "border-transparent bg-brand-surface/50 hover:bg-brand-surface hover:border-brand-border/50"
          )}
        >
          <span className="text-lg">{mood.emoji}</span>
          <span className="text-brand-text">{mood.label}</span>
        </button>
      ))}
    </div>
  )
}
