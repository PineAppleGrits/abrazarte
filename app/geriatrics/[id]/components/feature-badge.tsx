import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureBadgeProps {
  label: string
  className?: string
}

export function FeatureBadge({ label, className }: FeatureBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm bg-brand/20 text-brand",
        className,
      )}
    >
      <Check className="w-3.5 h-3.5" />
      <span>{label}</span>
    </div>
  )
}

