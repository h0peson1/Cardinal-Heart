import * as React from "react"
import { cn } from "@/lib/utils"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({
  className,
  icon,
  title,
  description,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-brand-border/60 bg-brand-surface/30 p-8 text-center animate-fade-in",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-soft text-brand-sage">
          {icon}
        </div>
      )}
      <h3 className="mb-2 text-xl font-serif font-medium text-brand-text">
        {title}
      </h3>
      {description && (
        <p className="mb-6 max-w-sm text-sm text-brand-text-muted text-balance">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  )
}
