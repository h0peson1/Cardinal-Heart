"use client"

import { useEffect, useState } from "react"
import { ReflectionPrompts } from "@/features/journal/components/reflection-prompts"
import { JournalTimeline } from "@/features/journal/components/journal-timeline"
import { MoodTrends } from "@/features/mood/components/mood-trends"
import { MoodHeatmap } from "@/features/mood/components/mood-heatmap"
import { mockJournalEntries, type JournalEntry } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { CreatePostModal } from "@/features/feed/components/create-post-modal"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/components/auth/auth-provider"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function JournalPage() {
  const { user } = useAuth()
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEntries = async () => {
      if (!user) {
        setEntries(mockJournalEntries)
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from("journal_entries")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) throw error

        if (data && data.length > 0) {
          const transformed: JournalEntry[] = data.map((item: any) => ({
            id: item.id,
            content: item.content,
            mood: item.mood,
            category: item.category,
            isPublic: item.is_public,
            createdAt: item.created_at,
          }))
          setEntries(transformed)
        } else {
          setEntries(mockJournalEntries)
        }
      } catch (error) {
        console.error("Error fetching journal entries:", error)
        setEntries(mockJournalEntries)
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [user])

  return (
    <ProtectedRoute>
      <div className="space-y-12 pb-20">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-serif text-brand-text">Your Journal</h1>
            <p className="text-brand-text-muted max-w-md">
              A safe space for your private reflections and emotional journey.
            </p>
          </div>
          <CreatePostModal 
            mode="journal"
            trigger={
              <Button variant="calm" size="lg" className="rounded-full shadow-soft group">
                <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
                New Reflection
              </Button>
            }
          />
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Timeline */}
          <div className="lg:col-span-8 space-y-12">
            <section>
              <ReflectionPrompts />
            </section>

            <section className="space-y-8">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-medium text-brand-text uppercase tracking-wider">Recent Entries</h2>
                <span className="text-xs text-brand-text-muted italic">{entries.length} entries this month</span>
              </div>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-brand-text-muted gap-4">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <p className="text-sm italic">Gathering your thoughts...</p>
                </div>
              ) : (
                <JournalTimeline entries={entries} />
              )}
            </section>
          </div>

          {/* Right Column: Mood Tracking Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <aside className="sticky top-24 space-y-8">
              <section className="space-y-4">
                <h2 className="text-sm font-medium text-brand-text uppercase tracking-wider px-1">Emotional Pulse</h2>
                <MoodTrends />
              </section>

              <section className="space-y-4">
                <h2 className="text-sm font-medium text-brand-text uppercase tracking-wider px-1">Reflection Streak</h2>
                <MoodHeatmap />
              </section>

              <div className="p-6 rounded-3xl bg-brand-accent/5 border border-brand-accent/10">
                <p className="text-sm font-serif text-brand-text italic leading-relaxed">
                  "Small steps in the right direction can turn out to be the biggest steps of your life."
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
