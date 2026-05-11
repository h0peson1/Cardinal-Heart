"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Sparkles, Loader2 } from "lucide-react"
import { toast } from "sonner"

export function AuthModal({ trigger }: { trigger: React.ReactElement }) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Step 21: .edu restriction check (Temporarily disabled for testing)
    /*
    if (!email.toLowerCase().endsWith(".edu")) {
      toast.error("Access is currently restricted to verified .edu email addresses.")
      return
    }
    */

    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      toast.success("Stanford verification link sent! Please check your inbox.")
      setIsOpen(false)
    } catch (error: any) {
      toast.error(error.message || "An error occurred during verification")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="sm:max-w-[400px] p-8 bg-brand-background border-none rounded-3xl shadow-2xl">
        <DialogHeader className="space-y-4 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-brand-accent" />
          </div>
          <DialogTitle className="text-2xl font-serif text-brand-text">Stanford Sanctuary</DialogTitle>
          <p className="text-sm text-brand-text-muted">
            Enter your university email to receive a secure, anonymous magic link.
          </p>
        </DialogHeader>

        <form onSubmit={handleSignIn} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-wider font-bold text-brand-text-muted px-1">
              Stanford Email (.edu)
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-muted" />
              <Input
                id="email"
                type="email"
                placeholder="sunetid@stanford.edu"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 rounded-2xl bg-brand-surface border-brand-border/40 focus:ring-brand-accent/20"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 rounded-full bg-brand-accent hover:bg-brand-accent/90 text-white shadow-md transition-all active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Send Magic Link"
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-[10px] text-brand-text-muted uppercase tracking-widest leading-relaxed">
          Privacy is our priority. Your activity <br /> stays anonymous to others.
        </p>
      </DialogContent>
    </Dialog>
  )
}
