"use client"

import { DiaryCard } from "./diary-card"
import { type JournalEntry } from "@/lib/mock-data"

interface JournalTimelineProps {
  entries: JournalEntry[]
}

export function JournalTimeline({ entries }: JournalTimelineProps) {
  // Sort entries by date descending
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className="relative space-y-12">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-border via-brand-border to-transparent -translate-x-1/2 hidden md:block opacity-50" />
      
      {sortedEntries.map((entry, index) => (
        <div key={entry.id} className="relative">
          {/* Timeline Dot (Desktop) */}
          <div className="absolute left-1/2 top-10 w-3 h-3 rounded-full bg-brand-background border-2 border-brand-accent -translate-x-1/2 z-10 hidden md:block" />
          
          <div className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div className="w-full md:w-[45%] animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
              <DiaryCard entry={entry} />
            </div>
            <div className="hidden md:block w-[10%]" />
            <div className="hidden md:block w-[45%]" />
          </div>
        </div>
      ))}
    </div>
  )
}
