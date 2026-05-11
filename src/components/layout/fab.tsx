"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreatePostModal } from "@/features/feed/components/create-post-modal"

export function FAB() {
  return (
    <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50">
      <CreatePostModal 
        trigger={
          <Button 
            size="icon" 
            className="h-14 w-14 rounded-full bg-brand-accent text-white shadow-lg hover:shadow-xl hover:bg-brand-accent/90 transition-all duration-300 hover:-translate-y-1"
          >
            <Plus className="h-6 w-6" />
            <span className="sr-only">New Entry</span>
          </Button>
        }
      />
    </div>
  )
}
