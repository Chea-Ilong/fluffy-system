"use client"

import { useState, useEffect } from "react"
import { Trophy, Medal, Award, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OverallLeaderboardRow } from "./overall-leaderboard-row"
import { COLORS } from "@/lib/constants"
import type { OverallEntry } from "@/types/leaderboard"

interface AnimatedPodiumProps {
  data: OverallEntry[]
  onComplete: () => void
}

export function AnimatedPodium({ data, onComplete }: AnimatedPodiumProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const topThree = data.slice(0, 3)
  const remainingParticipants = data.slice(3)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault()
        if (currentStep < 4) {
          setCurrentStep(currentStep + 1)
          if (currentStep === 2) {
            setShowConfetti(true)
          }
        }
      }
      if (e.key === "Escape") {
        onComplete()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [currentStep, onComplete])

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return null
    }
  }

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1:
        return 160 // pixels for 1st place - made higher
      case 2:
        return 80  // pixels for 2nd place
      case 3:
        return 40  // pixels for 3rd place
      default:
        return 0
    }
  }

  const getAnimationDelay = (rank: number) => {
    switch (rank) {
      case 3:
        return currentStep >= 1
      case 2:
        return currentStep >= 2
      case 1:
        return currentStep >= 3
      default:
        return false
    }
  }

  const getPodiumOrder = () => {
    if (topThree.length < 3) return topThree
    // Create podium order: 2nd, 1st, 3rd (left to right)
    const sortedTop3 = [...topThree].sort((a, b) => a.rank - b.rank)
    return [sortedTop3[1], sortedTop3[0], sortedTop3[2]] // 2nd, 1st, 3rd
  }

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 overflow-auto">
      {/* Background Stars - Fixed behind content */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Sparkles
              className="w-3 h-3 text-yellow-300 opacity-30 animate-pulse"
              style={{
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Confetti Effect - Above background stars but below content */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
          ))}
        </div>
      )}

      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-30">
        {/* Podium Section */}
        <div className="w-full max-w-6xl mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ color: COLORS.SECONDARY }}>
              🏆 Top 3 Champions 🏆
            </h1>
            <p className="text-lg text-gray-600">Congratulations to our winners!</p>
          </div>

          {/* Podium Display */}
          <div className="flex items-end justify-center gap-8 mb-12" style={{ height: '400px' }}>
            {getPodiumOrder().map((participant, index) => {
              const actualRank = participant.rank
              const shouldShow = getAnimationDelay(actualRank)
              const podiumHeight = getPodiumHeight(actualRank)

              // Podium styles for Kahoot-like effect
              const podiumStyles = [
                {
                  // 2nd place (left)
                  base: "bg-gradient-to-t from-gray-400 to-gray-200",
                  shadow: "shadow-lg",
                  ring: "ring-4 ring-gray-400",
                  glow: "",
                  emoji: "🥈",
                },
                {
                  // 1st place (center)
                  base: "bg-gradient-to-t from-yellow-400 to-yellow-200",
                  shadow: "shadow-2xl",
                  ring: "ring-8 ring-yellow-400",
                  glow: "animate-glow",
                  emoji: "👑",
                },
                {
                  // 3rd place (right)
                  base: "bg-gradient-to-t from-amber-600 to-amber-300",
                  shadow: "shadow-md",
                  ring: "ring-4 ring-amber-600",
                  glow: "",
                  emoji: "🥉",
                },
              ]
              // 2nd, 1st, 3rd order
              const styleIdx = index

              return (
                <div
                  key={participant.id}
                  className={`flex flex-col items-center justify-end transition-all duration-1000 ${
                    shouldShow ? "opacity-100 translate-y-0 animate-bounceIn" : "opacity-0 translate-y-20"
                  }`}
                  style={{ 
                    minWidth: 160,
                    height: '100%',
                    paddingBottom: `${podiumHeight}px`
                  }}
                >
                  {/* Rank Circle */}
                  <div className={`relative mb-3 flex flex-col items-center`}>
                    <div
                      className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-extrabold border-4 ${podiumStyles[styleIdx].ring} ${podiumStyles[styleIdx].glow} bg-white shadow-xl`}
                      style={{
                        background: `linear-gradient(135deg, #fff 60%, ${COLORS.PRIMARY} 100%)`,
                        color: COLORS.PRIMARY,
                        zIndex: 2,
                      }}
                    >
                      {actualRank}
                      {actualRank === 1 && (
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-4xl drop-shadow-lg">👑</span>
                      )}
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-3xl">
                      {podiumStyles[styleIdx].emoji}
                    </div>
                  </div>
                  {/* Name, Group, Points */}
                  <div className="flex flex-col items-center text-center mb-6">
                    <h3 className="font-extrabold text-xl mb-1" style={{ color: COLORS.SECONDARY }}>
                      {participant.fullName}
                    </h3>
                    <p className="text-sm text-gray-700 font-semibold">Group {participant.group}</p>
                    <p className="font-bold text-lg text-red-500 mt-1">{participant.totalPoints} pts</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Remaining Participants */}
        {currentStep >= 4 && remainingParticipants.length > 0 && (
          <div className="w-full max-w-6xl relative z-40">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.SECONDARY }}>
                Other Participants
              </h2>
              <p className="text-gray-600">Great job everyone!</p>
            </div>

            <div
              className="rounded-2xl p-6 shadow-lg animate-fade-in bg-white bg-opacity-95 backdrop-blur-sm"
              style={{ backgroundColor: COLORS.SECONDARY }}
            >
              <div className="space-y-4">
                {remainingParticipants.slice(0, 10).map((participant) => (
                  <div key={participant.id} className="animate-slide-up">
                    <OverallLeaderboardRow entry={participant} />
                  </div>
                ))}
              </div>

              {remainingParticipants.length > 10 && (
                <div className="text-center mt-6">
                  <p className="text-white">... and {remainingParticipants.length - 10} more participants</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes glow {
          0% { box-shadow: 0 0 0 0 #ffe06688; }
          50% { box-shadow: 0 0 32px 8px #ffe066cc; }
          100% { box-shadow: 0 0 0 0 #ffe06688; }
        }
        
        @keyframes bounceIn {
          0% { opacity: 0; transform: translateY(60px) scale(0.8);}
          60% { opacity: 1; transform: translateY(-10px) scale(1.05);}
          80% { transform: translateY(5px) scale(0.98);}
          100% { opacity: 1; transform: translateY(0) scale(1);}
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-glow {
          animation: glow 1.5s infinite;
        }

        .animate-bounceIn {
          animation: bounceIn 0.9s cubic-bezier(.68,-0.55,.27,1.55);
        }
      `}</style>
    </div>
  )
}