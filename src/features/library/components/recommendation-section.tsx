"use client"

import { ResourceCard, type Resource } from "./resource-card"
import { Sparkles } from "lucide-react"

interface RecommendationSectionProps {
  resources: Resource[]
}

export function RecommendationSection({ resources }: RecommendationSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-brand-text font-medium px-1">
        <Sparkles className="h-4 w-4 text-brand-accent" />
        <h2 className="text-sm uppercase tracking-wider">Recommended for you</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  )
}
