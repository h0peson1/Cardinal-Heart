"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Compass, BookOpen, Feather, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Feed", href: "/feed", icon: Compass },
  { name: "Journal", href: "/journal", icon: Feather },
  { name: "Library", href: "/library", icon: BookOpen },
  { name: "Sanctuary", href: "/sanctuary", icon: Shield },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-t border-brand-border/50 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-300",
                isActive ? "text-brand-sage" : "text-brand-text-muted hover:text-brand-text"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-full transition-all duration-300",
                isActive ? "bg-brand-sage/10" : "bg-transparent"
              )}>
                <Icon className={cn("h-5 w-5", isActive ? "stroke-[2.5px]" : "stroke-2")} />
              </div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
