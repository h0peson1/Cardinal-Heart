"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Bell, Heart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { AuthModal } from "@/components/auth/auth-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function TopNav() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return
      const { data } = await supabase
        .from("profiles")
        .select("anonymous_name")
        .eq("id", user.id)
        .single()
      setProfile(data)
    }
    fetchProfile()
  }, [user])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-border/50 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-brand-accent" />
          <Link href="/feed" className="font-serif text-xl font-medium tracking-tight text-brand-text">
            Cardinal Hearts
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full text-brand-text-muted hover:text-brand-text">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger 
                render={
                  <button className="h-8 w-8 rounded-full bg-brand-surface border border-brand-border/50 flex items-center justify-center ml-2 cursor-pointer transition-transform hover:scale-105">
                    <User className="h-4 w-4 text-brand-text-muted" />
                  </button>
                }
              />
              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 bg-white border-brand-border/40 shadow-xl">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-brand-text px-3 py-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium truncate">{profile?.anonymous_name || "Anonymous"}</span>
                      <span className="text-[10px] uppercase tracking-wider text-brand-text-muted font-bold">Stanford Verified</span>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-brand-border/20" />
                <DropdownMenuItem className="rounded-xl focus:bg-brand-background">
                  <Link href="/sanctuary" className="w-full">Your Sanctuary</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl focus:bg-brand-background">
                  <Link href="/journal" className="w-full">Journal</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-brand-border/20" />
                <DropdownMenuItem onClick={handleSignOut} className="rounded-xl text-brand-accent focus:bg-brand-accent/5 focus:text-brand-accent cursor-pointer">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <AuthModal 
              trigger={
                <Button variant="calm" size="sm" className="ml-2 rounded-full px-5 shadow-soft">
                  Sign In
                </Button>
              }
            />
          )}
        </div>
      </div>
    </header>
  )
}
