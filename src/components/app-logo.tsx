import { CreditCard } from "@phosphor-icons/react"
import { cn } from "cn"

interface AppLogoProps {
  name?: string
  className?: string
}

export function AppLogo({ name = "Acme Inc.", className }: AppLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="flex size-8 shrink-0 items-center justify-center rounded-md bg-foreground text-background"
      >
        <CreditCard weight="bold" className="size-4" />
      </span>
      <span className="text-sm font-semibold tracking-tight">{name}</span>
    </div>
  )
}