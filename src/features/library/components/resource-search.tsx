"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
import { type ResourceType } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const categories: (ResourceType | "All")[] = ["All", "Article", "PDF", "Book", "Campus"]

interface ResourceSearchProps {
  activeType: ResourceType | "All"
  onTypeChange: (type: ResourceType | "All") => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function ResourceSearch({ activeType, onTypeChange, searchQuery, onSearchChange }: ResourceSearchProps) {
  return (
    <div className="space-y-6">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text-muted group-focus-within:text-brand-accent transition-colors" />
        <Input 
          className="pl-12 h-14 rounded-2xl bg-brand-surface border-brand-border/40 focus:border-brand-accent/30 shadow-soft transition-all text-lg"
          placeholder="Search for articles, books, or campus help..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <div className="p-2 rounded-xl bg-brand-surface border border-brand-border/40 text-brand-text-muted">
          <SlidersHorizontal className="h-4 w-4" />
        </div>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeType === cat ? "calm" : "ghost"}
            onClick={() => onTypeChange(cat)}
            className="rounded-full px-6 transition-all duration-300 whitespace-nowrap"
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  )
}
