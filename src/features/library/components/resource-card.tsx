"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Music, FileText, Download, Play, ArrowRight } from "lucide-react"
import { type ResourceType } from "@/lib/mock-data"

export interface Resource {
  id: string
  title: string
  description: string
  category: string
  type: "audio" | "pdf" | ResourceType
  duration?: string
  url: string
}

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const isAudio = resource.type === "audio"
  const isPdf = resource.type === "pdf" || resource.type === "PDF"

  return (
    <Card className="group overflow-hidden rounded-[2.5rem] border-none bg-brand-surface/40 backdrop-blur-md shadow-soft hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      <CardHeader className="p-8 pb-4">
        <div className="flex justify-between items-start">
          <Badge variant="secondary" className="font-normal bg-white/60">
            {resource.category}
          </Badge>
          <div className="p-2 rounded-2xl bg-white/80 text-brand-text-muted">
            {isAudio ? <Music className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-8 pt-0 space-y-3">
        <h3 className="text-2xl font-serif text-brand-text leading-tight group-hover:text-brand-accent transition-colors">
          {resource.title}
        </h3>
        <p className="text-sm text-brand-text-muted leading-relaxed italic">
          {resource.description}
        </p>
      </CardContent>

      <CardFooter className="p-8 pt-0 flex items-center justify-between">
        <span className="text-xs text-brand-text-muted font-medium">
          {isAudio ? resource.duration : isPdf ? "PDF Guide" : resource.type}
        </span>
        <Button 
          variant="calm" 
          size="sm" 
          className="rounded-full px-6 shadow-md transition-transform active:scale-95"
          onClick={() => window.open(resource.url, "_blank")}
        >
          {isAudio ? (
            <Play className="h-4 w-4 fill-current mr-2" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          {isAudio ? "Listen" : "Download"}
        </Button>
      </CardFooter>
    </Card>
  )
}
