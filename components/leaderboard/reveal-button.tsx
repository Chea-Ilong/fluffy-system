"use client"

import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RevealButtonProps {
  onReveal: () => void
  isRevealed: boolean
}

export function RevealButton({ onReveal, isRevealed }: RevealButtonProps) {
  return (
    <Button
      onClick={onReveal}
      className="h-10 sm:h-12 px-4 lg:px-6 bg-orange-400 hover:bg-orange-500 text-white rounded-lg sm:rounded-xl font-medium text-sm sm:text-base"
    >
      {isRevealed ? (
        <>
          <EyeOff className="w-4 h-4 mr-2" />
          <span className="hidden lg:inline">Reset</span>
        </>
      ) : (
        <>
          <Eye className="w-4 h-4 mr-2" />
          <span className="hidden lg:inline">Reveal</span>
        </>
      )}
    </Button>
  )
}
