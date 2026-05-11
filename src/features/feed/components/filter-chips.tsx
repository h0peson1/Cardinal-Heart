"use client"

import { Button } from "@/components/ui/button"
import type { ReflectionCategory } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const categories: ReflectionCategory[] = [
  "All", 
  "Anxiety", 
  "Gratitude", 
  "Growth", 
  "Mindfulness", 
  "Grief"
]

interface FilterChipsProps {
  activeCategory: ReflectionCategory
  onCategorySelect: (category: ReflectionCategory) => void
}

export function FilterChips({ activeCategory, onCategorySelect }: FilterChipsProps) {
  return (
    <div className="flex overflow-x-auto pb-4 pt-2 -mx-4 px-4 md:mx-0 md:px-0 gap-2 scrollbar-hide">
      {categories.map((category) => (
        <Button
          key={category}
          variant="outline"
          size="sm"
          onClick={() => onCategorySelect(category)}
          className={cn(
            "rounded-full whitespace-nowrap transition-all duration-300",
            activeCategory === category 
              ? "bg-brand-text text-white border-brand-text hover:bg-brand-text/90 hover:text-white" 
              : "bg-white text-brand-text-muted hover:bg-brand-surface"
          )}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
