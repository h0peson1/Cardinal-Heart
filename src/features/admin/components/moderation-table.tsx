"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X, AlertTriangle, ShieldCheck } from "lucide-react"

const flaggedContent = [
  { id: "1", content: "I feel like I'm not doing enough compared to my peers...", category: "Anxiety", reason: "Potential distress", status: "Reviewing" },
  { id: "2", content: "Today was a breakthrough moment in my healing journey.", category: "Growth", reason: "False positive", status: "Cleared" },
  { id: "3", content: "Seeking advice on how to handle campus pressure.", category: "Mindfulness", reason: "Resource request", status: "Reviewing" },
]

export function ModerationTable() {
  return (
    <div className="rounded-3xl border border-brand-border/40 bg-brand-surface shadow-soft overflow-hidden">
      <div className="p-6 border-b border-brand-border/40 flex justify-between items-center">
        <h3 className="text-sm font-medium text-brand-text uppercase tracking-wider">Moderation Queue</h3>
        <Badge variant="outline" className="rounded-full text-[10px] uppercase font-bold text-brand-accent border-brand-accent/20 bg-brand-accent/5">
          3 Items Pending
        </Badge>
      </div>
      
      <Table>
        <TableHeader className="bg-brand-background/50">
          <TableRow className="hover:bg-transparent border-brand-border/40">
            <TableHead className="w-[400px] font-medium text-brand-text-muted">Content</TableHead>
            <TableHead className="font-medium text-brand-text-muted">Category</TableHead>
            <TableHead className="font-medium text-brand-text-muted">Reason</TableHead>
            <TableHead className="font-medium text-brand-text-muted">Status</TableHead>
            <TableHead className="text-right font-medium text-brand-text-muted">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flaggedContent.map((item) => (
            <TableRow key={item.id} className="hover:bg-brand-background/30 border-brand-border/40 transition-colors">
              <TableCell className="font-serif italic text-brand-text truncate max-w-[400px]">
                "{item.content}"
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="bg-brand-background text-brand-text-muted border-none">
                  {item.category}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-brand-text-muted flex items-center gap-1.5 pt-4">
                <AlertTriangle className="h-3 w-3 text-amber-500" />
                {item.reason}
              </TableCell>
              <TableCell>
                <span className={`text-[10px] uppercase font-bold tracking-widest ${item.status === 'Cleared' ? 'text-brand-sage' : 'text-brand-accent animate-pulse'}`}>
                  {item.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon-sm" className="rounded-full hover:bg-brand-sage/10 hover:text-brand-sage">
                    <ShieldCheck className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="rounded-full hover:bg-brand-accent/10 hover:text-brand-accent">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
