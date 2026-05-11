"use client"

import { useAuth } from "./auth-provider"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/?auth=required&next=${pathname}`)
    }
  }, [user, loading, router, pathname])

  if (loading) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center text-brand-text-muted gap-3">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p className="text-sm font-serif italic">Verifying sanctuary access...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
