"use client"

import { useEffect, useState } from "react"
import { COLORS } from "@/lib/constants"
import type { OverallEntry } from "@/types/leaderboard"

interface PodiumAnimationProps {
  topThree: OverallEntry[]
  onComplete: () => void
  isActive: boolean
}

export function PodiumAnimation({ topThree, onComplete, isActive }: PodiumAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(0)
      setShowConfetti(false)
      return
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
        if (currentStep === 0) {
          // Show "Get Ready" screen
          setCurrentStep(1)
        } else if (currentStep === 1) {
          // Show 3rd place
          setCurrentStep(2)
        } else if (currentStep === 2) {
          // Show 2nd place
          setCurrentStep(3)
        } else if (currentStep === 3) {
          // Show 1st place
          setCurrentStep(4)
          // Start confetti after a short delay
          setTimeout(() => {
            setShowConfetti(true)
            // End confetti and complete after 3 seconds
            setTimeout(() => {
              setShowConfetti(false)
              onComplete()
            }, 3000)
          }, 800)
        }
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [currentStep, isActive, onComplete])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 flex items-center justify-center">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-60">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ["#f59e0b", "#ef4444", "#10b981", "#3b82f6", "#8b5cf6"][
                    Math.floor(Math.random() * 5)
                  ],
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Get Ready Screen */}
      {currentStep === 0 && (
        <div className="text-center">
          <h1 className="text-6xl sm:text-8xl font-bold mb-8" style={{ color: COLORS.SECONDARY }}>
            Get Ready!
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8">Press SPACE to reveal the winners</p>
          <div className="animate-pulse">
            <div className="w-16 h-16 mx-auto bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">🏆</span>
            </div>
          </div>
        </div>
      )}

      {/* Podium Animation */}
      {currentStep >= 1 && (
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="flex items-end justify-center gap-8 sm:gap-12">
            {/* Third Place */}
            <div className="flex flex-col items-center">
              <div
                className={`relative transition-all duration-800 ease-out ${
                  currentStep >= 2 ? "animate-slide-up-third" : "opacity-0 translate-y-full"
                }`}
              >
                <div
                  className="w-24 sm:w-32 h-32 sm:h-40 rounded-xl p-3 flex flex-col items-center justify-center text-white shadow-lg relative"
                  style={{ backgroundColor: COLORS.PRIMARY }}
                >
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🥉</span>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm sm:text-base mb-1">{topThree[2]?.fullName}</div>
                    <div className="text-xs opacity-90">Group {topThree[2]?.group}</div>
                    <div className="text-lg sm:text-xl font-bold mt-1">{topThree[2]?.totalPoints}</div>
                  </div>
                </div>
              </div>
              <div
                className={`w-24 sm:w-32 h-12 rounded-t-xl flex items-center justify-center text-white font-bold transition-all duration-800 ease-out ${
                  currentStep >= 2 ? "animate-slide-up-third" : "opacity-0 translate-y-full"
                }`}
                style={{ backgroundColor: COLORS.SECONDARY }}
              >
                3rd
              </div>
            </div>

            {/* First Place */}
            <div className="flex flex-col items-center">
              <div
                className={`relative transition-all duration-800 ease-out ${
                  currentStep >= 4 ? "animate-slide-up-first" : "opacity-0 translate-y-full"
                }`}
              >
                <div
                  className="w-28 sm:w-36 h-36 sm:h-44 rounded-xl p-3 flex flex-col items-center justify-center text-white shadow-lg relative"
                  style={{ backgroundColor: COLORS.PRIMARY }}
                >
                  <div className="absolute -top-1 -right-1 w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🥇</span>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-base sm:text-lg mb-1">{topThree[0]?.fullName}</div>
                    <div className="text-xs opacity-90">Group {topThree[0]?.group}</div>
                    <div className="text-xl sm:text-2xl font-bold mt-1">{topThree[0]?.totalPoints}</div>
                  </div>
                </div>
              </div>
              <div
                className={`w-28 sm:w-36 h-16 rounded-t-xl flex items-center justify-center text-white font-bold text-lg transition-all duration-800 ease-out ${
                  currentStep >= 4 ? "animate-slide-up-first" : "opacity-0 translate-y-full"
                }`}
                style={{ backgroundColor: COLORS.SECONDARY }}
              >
                1st
              </div>
            </div>

            {/* Second Place */}
            <div className="flex flex-col items-center">
              <div
                className={`relative transition-all duration-800 ease-out ${
                  currentStep >= 3 ? "animate-slide-up-second" : "opacity-0 translate-y-full"
                }`}
              >
                <div
                  className="w-24 sm:w-32 h-34 sm:h-42 rounded-xl p-3 flex flex-col items-center justify-center text-white shadow-lg relative"
                  style={{ backgroundColor: COLORS.PRIMARY }}
                >
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🥈</span>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm sm:text-base mb-1">{topThree[1]?.fullName}</div>
                    <div className="text-xs opacity-90">Group {topThree[1]?.group}</div>
                    <div className="text-lg sm:text-xl font-bold mt-1">{topThree[1]?.totalPoints}</div>
                  </div>
                </div>
              </div>
              <div
                className={`w-24 sm:w-32 h-14 rounded-t-xl flex items-center justify-center text-white font-bold transition-all duration-800 ease-out ${
                  currentStep >= 3 ? "animate-slide-up-second" : "opacity-0 translate-y-full"
                }`}
                style={{ backgroundColor: COLORS.SECONDARY }}
              >
                2nd
              </div>
            </div>
          </div>

          {/* Instructions */}
          {currentStep < 4 && (
            <div className="text-center mt-8">
              <p className="text-lg text-gray-600">Press SPACE to continue</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
