"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Compass, BookOpen, Feather, Shield, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Feed", href: "/feed", icon: Compass },
  { name: "Journal", href: "/journal", icon: Feather },
  { name: "Library", href: "/library", icon: BookOpen },
  { name: "Sanctuary", href: "/sanctuary", icon: Shield },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-brand-border/50 bg-brand-surface/20 min-h-[calc(100vh-4rem)] p-4">
      <div className="flex-1 space-y-2 py-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon
          
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start rounded-xl mb-1",
                  isActive ? "bg-white shadow-sm hover:bg-white/90" : "hover:bg-brand-surface/60"
                )}
              >
                <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-brand-sage" : "text-brand-text-muted")} />
                <span className={isActive ? "font-medium text-brand-text" : "text-brand-text-muted"}>
                  {item.name}
                </span>
              </Button>
            </Link>
          )
        })}
      </div>
      
      <div className="mt-auto pt-4 pb-2 px-2">
        <p className="text-xs text-brand-text-muted/60 font-serif text-center">
          Take a deep breath.
        </p>
      </div>
    </aside>
  )
}
