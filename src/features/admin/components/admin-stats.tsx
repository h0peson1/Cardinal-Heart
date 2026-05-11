"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Heart, Share2 } from "lucide-react"
import { mockAdminStats } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function AdminStats() {
  const icons = [
    <Heart className="h-5 w-5" />,
    <Users className="h-5 w-5" />,
    <Share2 className="h-5 w-5" />,
    <TrendingUp className="h-5 w-5" />,
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockAdminStats.map((stat, i) => (
        <Card key={i} className="border-none bg-brand-surface shadow-soft rounded-3xl group hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl bg-brand-background text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                {icons[i]}
              </div>
              <span className={cn("text-xs font-medium px-2 py-1 rounded-full bg-brand-background/50", stat.color)}>
                {stat.trend}
              </span>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-brand-text-muted uppercase tracking-wider">{stat.label}</h4>
              <p className="text-3xl font-serif text-brand-text">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
