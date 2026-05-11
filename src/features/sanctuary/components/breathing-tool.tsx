"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Wind, Play, Pause, RotateCcw } from "lucide-react"

type BreathPhase = "Inhale" | "Hold" | "Exhale" | "Ready"

export function BreathingTool() {
  const [phase, setPhase] = useState<BreathPhase>("Ready")
  const [isActive, setIsActive] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    
    if (isActive) {
      if (phase === "Ready") setPhase("Inhale")

      const durations = {
        Inhale: 4000,
        Hold: 4000,
        Exhale: 4000,
      }

      const cycle = async () => {
        setPhase("Inhale")
        await new Promise(r => setTimeout(r, durations.Inhale))
        if (!isActive) return
        
        setPhase("Hold")
        await new Promise(r => setTimeout(r, durations.Hold))
        if (!isActive) return
        
        setPhase("Exhale")
        await new Promise(r => setTimeout(r, durations.Exhale))
        if (!isActive) return
        
        cycle()
      }

      cycle()
    } else {
      setPhase("Ready")
    }

    return () => clearTimeout(timer)
  }, [isActive])

  return (
    <div className="relative flex flex-col items-center justify-center p-8 rounded-[3rem] bg-brand-surface/40 border border-brand-border/30 backdrop-blur-xl overflow-hidden min-h-[400px]">
      {/* Background Pulse */}
      <div className={cn(
        "absolute inset-0 bg-brand-accent/5 transition-opacity duration-1000",
        phase === "Inhale" ? "opacity-100" : "opacity-0"
      )} />

      {/* Breathing Circle */}
      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Outer Ring */}
        <div className={cn(
          "absolute inset-0 rounded-full border-2 border-brand-accent/20 transition-transform duration-[4000ms] ease-in-out",
          phase === "Inhale" ? "scale-100" : "scale-75",
          phase === "Hold" ? "scale-100 opacity-50" : "",
          phase === "Exhale" ? "scale-75" : ""
        )} />

        {/* Inner Circle (The Breath) */}
        <div className={cn(
          "w-40 h-40 rounded-full bg-gradient-to-br from-brand-accent/40 to-brand-sage/40 shadow-lg shadow-brand-accent/20 transition-all duration-[4000ms] ease-in-out flex flex-col items-center justify-center text-center p-4",
          phase === "Inhale" ? "scale-125 opacity-100 blur-0" : "scale-75 opacity-60 blur-[1px]",
          phase === "Hold" ? "scale-125 opacity-80" : "",
          phase === "Exhale" ? "scale-75 opacity-60" : ""
        )}>
          <span className="text-xl font-serif text-brand-text font-medium animate-pulse">
            {phase}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-12 flex items-center gap-6 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsActive(false)}
          className="rounded-full text-brand-text-muted hover:text-brand-accent transition-colors"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>

        <Button
          onClick={() => setIsActive(!isActive)}
          className={cn(
            "h-16 w-16 rounded-full shadow-xl transition-all active:scale-95 flex items-center justify-center",
            isActive ? "bg-white text-brand-accent" : "bg-brand-accent text-white"
          )}
        >
          {isActive ? (
            <Pause className="h-8 w-8 fill-current" />
          ) : (
            <Play className="h-8 w-8 fill-current ml-1" />
          )}
        </Button>

        <div className="w-10" /> {/* Spacer for balance */}
      </div>

      <p className="mt-8 text-sm text-brand-text-muted font-medium italic animate-in fade-in duration-1000">
        {isActive ? "Follow the pulse..." : "Tap to begin your practice"}
      </p>
    </div>
  )
}
