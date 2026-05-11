"use client"

import { BreathingTool } from "@/features/sanctuary/components/breathing-tool"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Music, AlertCircle, Sparkles, Play } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SanctuaryPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto space-y-12 pb-20">
        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-brand-accent">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-widest">Grounding Space</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-brand-text">The Sanctuary</h1>
          <p className="text-brand-text-muted max-w-xl text-lg italic">
            A quiet space to find your center. Focus on your breath, listen to the silence, and know that you are safe.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Breathing Tool */}
          <section className="lg:col-span-7">
            <BreathingTool />
          </section>

          {/* Sidebar Tools */}
          <div className="lg:col-span-5 space-y-8">
            {/* Emergency Grounding */}
            <Card className="rounded-[2.5rem] border-none bg-brand-accent/5 shadow-soft overflow-hidden group hover:bg-brand-accent/10 transition-colors duration-500">
              <CardHeader className="p-8 pb-4 flex-row items-center gap-4">
                <div className="p-3 rounded-2xl bg-brand-accent/10 text-brand-accent">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl font-serif text-brand-text">Emergency Support</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-4">
                <p className="text-brand-text-muted leading-relaxed italic">
                  Feeling overwhelmed? Use the 5-4-3-2-1 technique to reconnect with your senses.
                </p>
                <Button variant="calm" className="w-full rounded-full h-12 shadow-md">
                  Start Grounding Exercise
                </Button>
              </CardContent>
            </Card>

            {/* Audio Landscapes */}
            <Card className="rounded-[2.5rem] border-none bg-brand-sage/5 shadow-soft overflow-hidden group hover:bg-brand-sage/10 transition-colors duration-500">
              <CardHeader className="p-8 pb-4 flex-row items-center gap-4">
                <div className="p-3 rounded-2xl bg-brand-sage/10 text-brand-sage">
                  <Music className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl font-serif text-brand-text">Audio Landscapes</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                <div className="space-y-4">
                  {[
                    { title: "Memorial Church Echoes", duration: "10:00" },
                    { title: "Stanford Rain on Redwoods", duration: "âˆž" },
                    { title: "Quiet Library Ambience", duration: "25:00" },
                  ].map((track, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-transparent hover:border-brand-sage/20 transition-all cursor-pointer">
                      <div className="flex flex-col">
                        <span className="font-medium text-brand-text">{track.title}</span>
                        <span className="text-xs text-brand-text-muted">{track.duration}</span>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-brand-sage/10 flex items-center justify-center text-brand-sage group-hover:bg-brand-sage group-hover:text-white transition-all">
                        <Play className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full text-brand-text-muted italic">
                  Explore full library
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
