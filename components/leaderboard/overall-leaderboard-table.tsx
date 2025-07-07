"use client"

import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { OverallLeaderboardRow } from "./overall-leaderboard-row"
import { COLORS } from "@/lib/constants"
import type { OverallEntry } from "@/types/leaderboard"

interface OverallLeaderboardTableProps {
  data: OverallEntry[]
  loading: boolean
  error: string | null
  onRetry: () => void
}

export function OverallLeaderboardTable({ data, loading, error, onRetry }: OverallLeaderboardTableProps) {
  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />
  }

  return (
    <div className="w-full mx-auto">
      <div
        className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 overflow-hidden"
        style={{ backgroundColor: COLORS.SECONDARY }}
      >
        {/* Desktop Header */}
        <div className="hidden lg:block mb-6">
          <div className="grid grid-cols-11 gap-3 xl:gap-4">
            <div className="col-span-1">
              <div
                className="rounded-2xl px-3 py-4 h-16 flex items-center justify-center text-white font-bold text-lg xl:text-xl"
                style={{ backgroundColor: COLORS.PRIMARY }}
              >
                Rank
              </div>
            </div>
            <div className="col-span-3">
              <div
                className="rounded-2xl px-3 py-4 h-16 flex items-center justify-center text-white font-bold text-lg xl:text-xl"
                style={{ backgroundColor: COLORS.PRIMARY }}
              >
                Full Name
              </div>
            </div>
            <div className="col-span-1">
              <div
                className="rounded-2xl px-3 py-4 h-16 flex items-center justify-center text-white font-bold text-lg xl:text-xl"
                style={{ backgroundColor: COLORS.PRIMARY }}
              >
                Group
              </div>
            </div>
            <div className="col-span-1">
              <div
                className="rounded-2xl px-3 py-4 h-16 flex items-center justify-center text-white font-bold text-lg xl:text-xl"
                style={{ backgroundColor: COLORS.PRIMARY }}
              >
                Round 1
              </div>
            </div>
            <div className="col-span-1">
              <div
                className="rounded-2xl px-3 py-4 h-16 flex items-center justify-center text-white font-bold text-lg xl:text-xl"
                style={{ backgroundColor: COLORS.PRIMARY }}
              >
                Round 2
              </div>
            </div>
            <div className="col-span-1">
              <div
                className="rounded-2xl px-3 py-4 h-16 flex items-center justify-center text-white font-bold text-lg xl:text-xl"
                style={{ backgroundColor: COLORS.PRIMARY }}
              >
                Game
              </div>
            </div>
            <div className="col-span-1">
              <div
                className="rounded-2xl px-3 py-4 h-16 flex items-center justify-center text-white font-bold text-lg xl:text-xl"
                style={{ backgroundColor: COLORS.PRIMARY }}
              >
                Team
              </div>
            </div>
            <div className="col-span-2">
              <div
                className="rounded-2xl px-3 py-4 h-16 flex items-center justify-center text-white font-bold text-lg xl:text-xl"
                style={{ backgroundColor: COLORS.PRIMARY }}
              >
                Total
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden mb-4 sm:mb-6">
          <div
            className="rounded-2xl px-4 py-3 text-center text-white font-bold text-lg sm:text-xl"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            Overall CADT Leaderboard
          </div>
        </div>

        {/* Data Rows */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {data.map((entry) => (
            <OverallLeaderboardRow key={entry.id} entry={entry} />
          ))}
        </div>

        {data.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No Data Available</h2>
              <p className="text-gray-600">No participants found matching your criteria.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
