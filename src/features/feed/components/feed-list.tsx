"use client"

import { useState, useEffect } from "react"
import { Compass } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"
import { FeedCard } from "./feed-card"
import { FilterChips } from "./filter-chips"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { mockReflections, type ReflectionCategory, type Reflection } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/components/auth/auth-provider"

export function FeedList() {
  const { user } = useAuth()
  const [activeCategory, setActiveCategory] = useState<ReflectionCategory>("All")
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(5)
  const [reflections, setReflections] = useState<Reflection[]>([])

  useEffect(() => {
    const fetchReflections = async () => {
      setIsLoading(true)
      try {
        let query = supabase
          .from("reflections")
          .select("*, profiles!author_id(anonymous_name), resonations(user_id), bookmarks(user_id)")
          .order("created_at", { ascending: false })

        if (activeCategory !== "All") {
          query = query.eq("category", activeCategory)
        }

        const { data, error } = await query

        if (error) {
          console.error("Supabase Query Error:", error.message, error.details, error.hint)
          throw error
        }

        if (data && data.length > 0) {
          // Transform DB data to match UI interface
          const transformed: Reflection[] = data.map((item: any) => ({
            id: item.id,
            content: item.content,
            category: item.category as ReflectionCategory,
            createdAt: item.created_at,
            hasResonated: item.resonations?.some((r: any) => r.user_id === user?.id) ?? false, 
            hasSaved: item.bookmarks?.some((b: any) => b.user_id === user?.id) ?? false,
            authorName: item.profiles?.anonymous_name
          }))
          setReflections(transformed)
        } else {
          // Fallback to mock data if DB is empty for demonstration
          setReflections(mockReflections)
        }
      } catch (error) {
        console.error("Error fetching reflections:", error)
        setReflections(mockReflections)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReflections()
  }, [activeCategory])

  const filteredReflections = reflections.filter((ref) => {
    if (activeCategory === "All") return true
    return ref.category === activeCategory
  })

  const visibleReflections = filteredReflections.slice(0, visibleCount)
  const hasMore = visibleCount < filteredReflections.length

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5)
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        <FilterChips 
          activeCategory={activeCategory} 
          onCategorySelect={(cat) => {
            setActiveCategory(cat)
            setVisibleCount(5)
          }} 
        />
      </div>

      <div className="space-y-6 pb-12">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="opacity-70">
              <CardHeader className="pb-2 flex-row justify-between">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </CardHeader>
              <CardContent className="pb-4 space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-[90%]" />
                <Skeleton className="h-5 w-[60%]" />
              </CardContent>
              <CardFooter className="pt-0 p-6 flex justify-between border-t-0 bg-transparent">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </CardFooter>
            </Card>
          ))
        ) : visibleReflections.length > 0 ? (
          <>
            {visibleReflections.map((reflection) => (
              <FeedCard key={reflection.id} reflection={reflection} />
            ))}
            
            {hasMore && (
              <div className="pt-6 flex justify-center">
                <Button variant="ghost" onClick={handleLoadMore} className="text-brand-text-muted">
                  Load more reflections...
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="pt-8">
            <EmptyState 
              icon={<Compass className="h-6 w-6" />}
              title="No reflections found"
              description={`We couldn't find any reflections tagged with "${activeCategory}". They may have been archived or removed.`}
              action={<Button variant="calm" onClick={() => setActiveCategory("All")}>Clear filter</Button>}
            />
          </div>
        )}
      </div>
    </div>
  )
}
