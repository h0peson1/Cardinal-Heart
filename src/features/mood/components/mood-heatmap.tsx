"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const weeks = 4
const days = 7
const totalDays = weeks * days

export function MoodHeatmap() {
  // Initialize with 0 intensity to avoid layout shift and hydration mismatch
  const [data, setData] = useState<{ day: number, value: number }[]>(
    Array.from({ length: totalDays }, (_, i) => ({ day: i, value: 0 }))
  )

  useEffect(() => {
    // Fill with random data only on the client
    const randomData = Array.from({ length: totalDays }, (_, i) => ({
      day: i,
      value: Math.floor(Math.random() * 5),
    }))
    setData(randomData)
  }, [])

  const colors = [
    "bg-brand-border/30",  // 0
    "bg-brand-sage/20",    // 1
    "bg-brand-sage/40",    // 2
    "bg-brand-accent/30",  // 3
    "bg-brand-accent/60",  // 4
  ]

  return (
    <div className="p-6 rounded-3xl bg-brand-surface border border-brand-border/50 shadow-soft">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-medium text-brand-text uppercase tracking-wider">Consistency</h3>
        <div className="flex gap-1">
          {colors.map((c, i) => (
            <div key={i} className={cn("w-2 h-2 rounded-sm", c)} />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {data.map((item) => (
          <div
            key={item.day}
            className={cn(
              "aspect-square rounded-md transition-all duration-500 hover:scale-110 cursor-pointer",
              colors[item.value]
            )}
            title={`Intensity: ${item.value}`}
          />
        ))}
      </div>
      
      <div className="mt-4 flex justify-between text-[10px] text-brand-text-muted uppercase tracking-tighter">
        <span>Week 1</span>
        <span>Week 2</span>
        <span>Week 3</span>
        <span>Week 4</span>
      </div>
    </div>
  )
}
