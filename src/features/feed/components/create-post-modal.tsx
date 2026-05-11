"use client"

import * as React from "react"
import { useState } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus, ChevronRight, ChevronLeft, Send, Check, Loader2 } from "lucide-react"
import { WritingInterface } from "./writing-interface"
import { MoodSelector } from "./mood-selector"
import { ReflectionCategory } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Step = "writing" | "categorizing" | "preview"

import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { reflectionSchema, journalEntrySchema } from "@/lib/validations"
import { ZodError } from "zod"

export function CreatePostModal({ 
  trigger, 
  initialContent = "",
  mode = "feed"
}: { 
  trigger?: React.ReactElement,
  initialContent?: string,
  mode?: "feed" | "journal"
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const [step, setStep] = useState<Step>("writing")
  const [content, setContent] = useState(initialContent)
  const [category, setCategory] = useState<ReflectionCategory>("Mindfulness")
  const [mood, setMood] = useState<string>("Calm")
  const [isPrivate, setIsPrivate] = useState(mode === "journal")
  const resetForm = () => {
    setStep("writing")
    setContent(initialContent)
    setCategory("Mindfulness")
    setMood("Calm")
    setIsPosting(false)
  }

  const handlePost = async () => {
    setIsPosting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error("You must be signed in to save your reflection.")
        return
      }

      // Validate inputs
      try {
        if (mode === "journal") {
          journalEntrySchema.parse({ content, category, mood })
        } else {
          reflectionSchema.parse({ content, category, mood })
        }
      } catch (err) {
        if (err instanceof ZodError) {
          toast.error(err.issues[0]?.message ?? "Please check your reflection and try again.")
          return
        }
        throw err
      }

      let insertError
      if (mode === "journal") {
        const { error } = await supabase.from("journal_entries").insert({
          user_id: user.id,
          content,
          category,
          mood,
          is_public: false,
        })
        insertError = error
      } else {
        const { error } = await supabase.from("reflections").insert({
          author_id: user.id,
          content,
          category,
          mood,
          is_anonymous: true,
        })
        insertError = error
      }

      if (insertError) throw insertError

      // Log to mood_logs for tracking trends
      const moodValues: Record<string, number> = {
        "Peaceful": 8, "Grateful": 9, "Thoughtful": 6, 
        "Tired": 3, "Anxious": 2, "Stressed": 2, "Hopeful": 7
      }
      
      await supabase.from("mood_logs").insert({
        user_id: user.id,
        mood: mood,
        intensity: moodValues[mood] || 5
      })

      toast.success(mode === "journal" ? "Entry saved to your journal." : "Reflection shared with the community!")
      setIsOpen(false)
      resetForm()
    } catch (error: any) {
      toast.error(error.message || "Failed to save reflection")
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) resetForm()
    }}>
      <DialogTrigger render={trigger || (
        <Button size="icon" className="h-14 w-14 rounded-full bg-brand-accent text-white shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      )}>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-brand-background border-none shadow-2xl rounded-3xl">
        <div className="flex flex-col h-[80vh] max-h-[600px]">
          {/* Header */}
          <DialogHeader className="p-6 pb-2">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-serif text-brand-text">
                {step === "writing" && "Share a reflection"}
                {step === "categorizing" && "Add some context"}
                {step === "preview" && "Ready to share?"}
              </DialogTitle>
              <div className="flex gap-1">
                <div className={cn("h-1.5 w-8 rounded-full transition-colors", step === "writing" ? "bg-brand-accent" : "bg-brand-border")} />
                <div className={cn("h-1.5 w-8 rounded-full transition-colors", step === "categorizing" ? "bg-brand-accent" : "bg-brand-border")} />
                <div className={cn("h-1.5 w-8 rounded-full transition-colors", step === "preview" ? "bg-brand-accent" : "bg-brand-border")} />
              </div>
            </div>
          </DialogHeader>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 pt-2">
            {step === "writing" && (
              <WritingInterface 
                value={content} 
                onChange={setContent} 
                onNext={() => setStep("categorizing")} 
              />
            )}
            
            {step === "categorizing" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  <label className="text-sm font-medium text-brand-text-muted px-1">How are you feeling?</label>
                  <MoodSelector value={mood} onChange={setMood} />
                </div>
                
                <div className="space-y-4">
                  <label className="text-sm font-medium text-brand-text-muted px-1">Choose a category</label>
                  <div className="flex flex-wrap gap-2">
                    {(["Anxiety", "Gratitude", "Growth", "Mindfulness", "Grief"] as ReflectionCategory[]).map((cat) => (
                      <Button
                        key={cat}
                        variant={category === cat ? "calm" : "ghost"}
                        onClick={() => setCategory(cat)}
                        className="rounded-full"
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === "preview" && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="p-8 rounded-2xl bg-brand-surface border border-brand-border/50 shadow-soft">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary" className="bg-brand-sage/10 text-brand-sage border-none">
                      {category}
                    </Badge>
                    <span className="text-xs text-brand-text-muted italic">Feeling {mood}</span>
                  </div>
                  <p className="text-lg font-serif leading-relaxed text-brand-text whitespace-pre-wrap italic">
                    "{content}"
                  </p>
                </div>
                <p className="text-center text-sm text-brand-text-muted italic">
                  This will be shared anonymously with the community.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 pt-2 flex flex-row justify-between items-center bg-brand-surface/30 border-t border-brand-border/30">
            {step !== "writing" ? (
              <Button variant="ghost" onClick={() => setStep(step === "preview" ? "categorizing" : "writing")}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            ) : (
              <div /> // Spacer
            )}

            {step === "writing" && (
              <Button 
                variant="calm" 
                onClick={() => setStep("categorizing")}
                disabled={!content.trim()}
                className="rounded-full px-6 shadow-soft"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}

            {step === "categorizing" && (
              <Button 
                variant="calm" 
                onClick={() => setStep("preview")}
                className="rounded-full px-6 shadow-soft"
              >
                Preview
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}

            {step === "preview" && (
              <Button 
                variant="calm" 
                onClick={handlePost}
                disabled={isPosting}
                className="rounded-full bg-brand-accent hover:bg-brand-accent/90 text-white px-8 shadow-md"
              >
                {isPosting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {isPosting ? "Posting..." : "Post Reflection"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
