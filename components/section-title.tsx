import type { ReactNode } from "react"

interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean
  children?: ReactNode
  className?: string
}

export function SectionTitle({ title, subtitle, centered = true, children, className = "" }: SectionTitleProps) {
  return (
    <div className={`space-y-2 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-empresa-primary text-shadow">
        {title}
      </h2>
      {subtitle && <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{subtitle}</p>}
      {children}
    </div>
  )
}
