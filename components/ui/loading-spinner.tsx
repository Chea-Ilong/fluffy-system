import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: number
  className?: string
}

export function LoadingSpinner({ size = 40, className }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <div
        className={cn("animate-spin rounded-full border-4 border-gray-300 border-t-orange-400", className)}
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  )
}
