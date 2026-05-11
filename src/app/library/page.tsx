"use client"

import { useEffect, useState } from "react"
import { ResourceSearch } from "@/features/library/components/resource-search"
import { ResourceCard, type Resource } from "@/features/library/components/resource-card"
import { RecommendationSection } from "@/features/library/components/recommendation-section"
import { mockResources, type ResourceType } from "@/lib/mock-data"
import { EmptyState } from "@/components/ui/empty-state"
import { BookOpen, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

const fallbackResources: Resource[] = mockResources.map((resource) => ({
  id: resource.id,
  title: resource.title,
  description: resource.description,
  category: resource.tags[0] ?? resource.type,
  type: resource.type,
  duration: resource.duration ?? resource.author ?? resource.type,
  url: "#",
}))

export default function LibraryPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [activeType, setActiveType] = useState<ResourceType | "All">("All")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from("resources")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) throw error

        if (data && data.length > 0) {
          const transformed: Resource[] = data.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            category: item.category,
            type: item.type as "audio" | "pdf",
            duration: item.duration,
            url: supabase.storage.from("resources").getPublicUrl(item.storage_path).data.publicUrl
          }))
          setResources(transformed)
        } else {
          setResources(fallbackResources)
        }
      } catch (error) {
        console.error("Error fetching resources:", error)
        setResources(fallbackResources)
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [])

  const filteredResources = resources.filter((r) => {
    const matchesType = activeType === "All" || r.type === activeType
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const recommended = resources.slice(0, 2)

  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-serif text-brand-text">Resource Library</h1>
        <p className="text-brand-text-muted max-w-2xl text-lg">
          Explore curated articles, books, and campus resources to support your mental and emotional well-being.
        </p>
      </header>

      <section>
        <ResourceSearch 
          activeType={activeType} 
          onTypeChange={setActiveType} 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </section>

      {searchQuery === "" && activeType === "All" && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <RecommendationSection resources={recommended} />
        </section>
      )}

      <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-medium text-brand-text uppercase tracking-wider">All Resources</h2>
          <span className="text-xs text-brand-text-muted italic">{filteredResources.length} resources found</span>
        </div>
        
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-brand-text-muted gap-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm italic">Curating your wellness library...</p>
        </div>
      ) : filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
          <div className="pt-8">
            <EmptyState 
              icon={<BookOpen className="h-6 w-6" />}
              title="No resources found"
              description={`We couldn't find any resources matching your search "${searchQuery}". Try a different term or category.`}
            />
          </div>
        )}
      </section>
    </div>
  )
}
