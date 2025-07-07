"use client"

import { useState } from "react"
import { useLeaderboard } from "@/hooks/use-leaderboard"
import { RoundSelector } from "./round-selector"
import { LeaderboardRow } from "./leaderboard-row"
import { LeaderboardTableHeader } from "./leaderboard-table-header"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { COLORS } from "@/constants/leaderboard"
import type { LeaderboardType } from "@/types/leaderboard"

interface LeaderboardTableProps {
  type: LeaderboardType
}

export function LeaderboardTable({ type }: LeaderboardTableProps) {
  const [activeRound, setActiveRound] = useState(1)
  const { leaderboardData, loading, error, refetch } = useLeaderboard(activeRound, type)

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />
  }

  return (
    <div className="w-full mx-auto p-4 sm:p-6 lg:p-8">
      <RoundSelector activeRound={activeRound} onRoundChange={setActiveRound} />

      <div
        className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 overflow-hidden"
        style={{ backgroundColor: COLORS.SECONDARY }}
      >
        <LeaderboardTableHeader />

        {/* Mobile Header */}
        <div className="lg:hidden mb-4 sm:mb-6">
          <div
            className="rounded-2xl px-4 py-3 text-center text-white font-bold text-lg sm:text-xl"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            CADT Leaderboard
          </div>
        </div>

        {/* Data Rows */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {leaderboardData.map((entry) => (
            <LeaderboardRow key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  )
}
