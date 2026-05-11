"use client"

import { useState } from "react"
import { Heart, Bookmark } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuGroup 
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { MoreHorizontal, Flag, Trash2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/components/auth/auth-provider"
import { toast } from "sonner"
import type { Reflection } from "@/lib/mock-data"

interface FeedCardProps {
  reflection: Reflection
}

export function FeedCard({ reflection }: FeedCardProps) {
  const { user } = useAuth()
  const [hasResonated, setHasResonated] = useState(reflection.hasResonated)
  const [isSaved, setIsSaved] = useState(reflection.hasSaved)

  const handleResonate = async () => {
    if (!user) {
      toast.error("Sign in to resonate with this reflection")
      return
    }

    const newValue = !hasResonated
    setHasResonated(newValue)

    try {
      if (newValue) {
        await supabase.from("resonations").insert({
          user_id: user.id,
          reflection_id: reflection.id
        })
      } else {
        await supabase.from("resonations").delete().match({
          user_id: user.id,
          reflection_id: reflection.id
        })
      }
    } catch (error) {
      setHasResonated(!newValue)
      toast.error("Failed to update resonation")
    }
  }

  const handleSave = async () => {
    if (!user) {
      toast.error("Sign in to save this reflection")
      return
    }

    const newValue = !isSaved
    setIsSaved(newValue)

    try {
      if (newValue) {
        await supabase.from("bookmarks").insert({
          user_id: user.id,
          reflection_id: reflection.id
        })
        toast.success("Saved to your bookmarks")
      } else {
        await supabase.from("bookmarks").delete().match({
          user_id: user.id,
          reflection_id: reflection.id
        })
      }
    } catch (error) {
      setIsSaved(!newValue)
      toast.error("Failed to update bookmark")
    }
  }

  const handleReport = async () => {
    if (!user) {
      toast.error("Sign in to report content")
      return
    }

    const reason = window.prompt("Why are you reporting this reflection? (e.g. Hate speech, Harassment, Spam)")
    if (!reason) return

    try {
      const { error } = await supabase.from("reports").insert({
        reflection_id: reflection.id,
        reporter_id: user.id,
        reason
      })

      if (error) throw error
      toast.success("Thank you. Our moderation team will review this reflection.")
    } catch (error) {
      toast.error("Failed to submit report")
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this reflection? This cannot be undone.")) return

    try {
      const { error } = await supabase
        .from("reflections")
        .update({ is_deleted: true })
        .eq("id", reflection.id)

      if (error) throw error
      toast.success("Reflection removed")
      // In a real app, we'd trigger a re-fetch or remove from state
    } catch (error) {
      toast.error("Failed to delete reflection")
    }
  }

  return (
    <Card className="animate-fade-in group/card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <Badge variant="secondary" className="w-fit font-normal">
              {reflection.category}
            </Badge>
            {reflection.authorName && (
              <span className="text-[10px] uppercase tracking-widest text-brand-text-muted font-bold pl-1">
                {reflection.authorName}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-brand-text-muted italic">
              {formatDistanceToNow(new Date(reflection.createdAt), { addSuffix: true })}
            </span>
            
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <button className="p-1 rounded-full text-brand-text-muted hover:bg-brand-surface transition-colors opacity-0 group-hover/card:opacity-100">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              } />
              <DropdownMenuContent align="end" className="w-48 rounded-2xl bg-white shadow-xl border-brand-border/40 p-2">
                <DropdownMenuGroup>
                  <DropdownMenuItem 
                    onClick={handleReport}
                    className="rounded-xl flex items-center gap-2 text-brand-text-muted hover:text-brand-text"
                  >
                    <Flag className="h-4 w-4" />
                    <span>Report Reflection</span>
                  </DropdownMenuItem>
                  
                  {user?.id === (reflection as any).author_id && (
                    <DropdownMenuItem 
                      onClick={handleDelete}
                      className="rounded-xl flex items-center gap-2 text-brand-accent hover:bg-brand-accent/5"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete Post</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-lg md:text-xl text-brand-text leading-relaxed font-serif text-balance">
          {reflection.content}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0 bg-transparent border-t-0 p-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleResonate}
          className={cn(
            "group transition-all duration-300 rounded-full",
            hasResonated ? "text-brand-sage hover:text-brand-sage/80 bg-brand-sage/10" : "text-brand-text-muted"
          )}
        >
          <Heart 
            className={cn(
              "mr-2 h-5 w-5 transition-all duration-300",
              hasResonated ? "fill-brand-sage" : "group-hover:fill-brand-surface"
            )} 
          />
          <span>Resonate</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleSave}
          className={cn(
            "rounded-full transition-all duration-300",
            isSaved ? "text-brand-accent hover:text-brand-accent/80 bg-brand-accent/10" : "text-brand-text-muted"
          )}
        >
          <Bookmark 
            className={cn(
              "h-5 w-5 transition-all duration-300",
              isSaved ? "fill-brand-accent" : ""
            )} 
          />
          <span className="sr-only">Save</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
