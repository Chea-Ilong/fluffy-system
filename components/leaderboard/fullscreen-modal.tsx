"use client"

import type React from "react"

import { useEffect } from "react"

interface FullscreenModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function FullscreenModal({ isOpen, onClose, children }: FullscreenModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100">
      {/* Content */}
      <div className="h-screen overflow-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-[1800px] mx-auto">{children}</div>
      </div>
    </div>
  )
}
