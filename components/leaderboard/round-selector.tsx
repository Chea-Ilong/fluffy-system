"use client"

import { LEADERBOARD_CONFIG, COLORS } from "@/constants/leaderboard"

interface RoundSelectorProps {
  activeRound: number
  onRoundChange: (round: number) => void
}

export function RoundSelector({ activeRound, onRoundChange }: RoundSelectorProps) {
  return (
    <div className="flex justify-center mb-6 sm:mb-8">
      <div className="flex w-full max-w-md sm:max-w-lg">
        {LEADERBOARD_CONFIG.ROUNDS.map((round, index) => (
          <button
            key={round}
            onClick={() => onRoundChange(round)}
            className={`flex-1 px-4 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-bold transition-all duration-200 ${
              index === 0 ? "rounded-l-2xl" : "rounded-r-2xl"
            } ${activeRound === round ? "text-white" : "text-white hover:opacity-80"}`}
            style={{
              backgroundColor: activeRound === round ? COLORS.PRIMARY : COLORS.SECONDARY,
            }}
          >
            Round {round}
          </button>
        ))}
      </div>
    </div>
  )
}
