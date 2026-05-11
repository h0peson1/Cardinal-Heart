"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, Globe, Calendar } from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"
import { type JournalEntry } from "@/lib/mock-data"

interface DiaryCardProps {
  entry: JournalEntry
}

export function DiaryCard({ entry }: DiaryCardProps) {
  return (
    <Card className="group/diary border-none bg-brand-surface shadow-soft hover:shadow-md transition-all duration-300 rounded-3xl overflow-hidden">
      <CardHeader className="flex-row items-start justify-between p-6 pb-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-brand-text-muted italic">
            <Calendar className="h-3 w-3" />
            {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
            <span className="opacity-50">â€¢</span>
            {format(new Date(entry.createdAt), "h:mm a")}
          </div>
          <Badge variant="secondary" className="w-fit bg-brand-background text-brand-text-muted border-none mt-1">
            {entry.category}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-brand-text-muted italic px-2 py-1 rounded-full bg-brand-background/50">
            Feeling {entry.mood}
          </span>
          {entry.isPublic ? (
            <div title="Publicly shared" className="p-2 rounded-full bg-brand-sage/10 text-brand-sage">
              <Globe className="h-4 w-4" />
            </div>
          ) : (
            <div title="Private entry" className="p-2 rounded-full bg-brand-background text-brand-text-muted">
              <Lock className="h-4 w-4" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-2">
        <p className="text-lg font-serif leading-relaxed text-brand-text italic">
          "{entry.content}"
        </p>
      </CardContent>
    </Card>
  )
}
