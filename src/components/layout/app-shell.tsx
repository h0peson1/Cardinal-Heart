"use client"

import * as React from "react"
import { TopNav } from "./top-nav"
import { Sidebar } from "./sidebar"
import { BottomNav } from "./bottom-nav"
import { FAB } from "./fab"
import { Toaster } from "@/components/ui/sonner"
import { usePathname } from "next/navigation"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  
  // Don't show shell on design system page
  if (pathname === "/design-system") {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto pb-24 md:pb-8">
          <div className="mx-auto max-w-4xl p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
      <BottomNav />
      <FAB />
      <Toaster />
    </div>
  )
}
