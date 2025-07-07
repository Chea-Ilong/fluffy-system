"use client"
import { Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FullscreenButtonProps {
  onToggleFullscreen: () => void
  isFullscreen: boolean
}

export function FullscreenButton({ onToggleFullscreen, isFullscreen }: FullscreenButtonProps) {
  return (
    <Button
      onClick={onToggleFullscreen}
      className="h-10 sm:h-12 px-4 lg:px-6 bg-orange-400 hover:bg-orange-500 text-white rounded-lg sm:rounded-xl font-medium text-sm sm:text-base"
    >
      {isFullscreen ? <Minimize2 className="w-4 h-4 mr-2" /> : <Maximize2 className="w-4 h-4 mr-2" />}
      <span className="hidden lg:inline">{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
    </Button>
  )
}
