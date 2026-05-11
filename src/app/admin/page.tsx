"use client"

import { AdminStats } from "@/features/admin/components/admin-stats"
import { CommunityAnalytics } from "@/features/admin/components/community-analytics"
import { ModerationTable } from "@/features/admin/components/moderation-table"
import { ShieldCheck, BarChart3 } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-accent mb-2">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Institutional Access</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-brand-text">Community Health</h1>
          <p className="text-brand-text-muted max-w-md text-lg">
            Aggregated insights into the emotional pulse and engagement of the Cardinal Hearts community.
          </p>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-3xl bg-brand-surface border border-brand-border/40 shadow-soft">
          <BarChart3 className="h-5 w-5 text-brand-sage" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-brand-text-muted tracking-wider">Live Activity</span>
            <span className="text-sm font-medium text-brand-text">328 Active Today</span>
          </div>
        </div>
      </header>

      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <AdminStats />
      </section>

      <div className="grid grid-cols-1 gap-12">
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-medium text-brand-text uppercase tracking-wider">Trends & Stability</h2>
            <span className="text-xs text-brand-text-muted italic">Last updated: Just now</span>
          </div>
          <CommunityAnalytics />
        </section>

        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-medium text-brand-text uppercase tracking-wider">Safety & Moderation</h2>
          </div>
          <ModerationTable />
        </section>
      </div>
    </div>
  )
}
