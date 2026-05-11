"use client"

import { useEffect, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface WritingInterfaceProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
}

export function WritingInterface({ value, onChange, onNext }: WritingInterfaceProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // Focus the textarea on mount
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const charCount = value.length

  return (
    <div className="flex flex-col h-full space-y-4 animate-in fade-in duration-700">
      <Textarea
        ref={textareaRef}
        placeholder="What's on your heart today?"
        className={cn(
          "flex-1 w-full text-xl md:text-2xl font-serif bg-transparent border-none focus-visible:ring-0 resize-none px-0 py-4",
          "placeholder:text-brand-text-muted/40 text-brand-text leading-relaxed",
          "selection:bg-brand-sage/20"
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      
      <div className="flex justify-between items-center text-xs text-brand-text-muted italic px-1 pb-2">
        <span>{charCount > 0 ? `${charCount} characters` : "Take your time..."}</span>
        <span className="opacity-50">Content is shared anonymously</span>
      </div>
    </div>
  )
}
