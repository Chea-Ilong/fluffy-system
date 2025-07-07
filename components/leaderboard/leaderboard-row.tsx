import { COLORS } from "@/lib/constants"
import type { LeaderboardEntry } from "@/types/leaderboard"

interface LeaderboardRowProps {
  entry: LeaderboardEntry
}

export function LeaderboardRow({ entry }: LeaderboardRowProps) {
  return (
    <>
      {/* Desktop Layout - Extra Large screens */}
      <div className="hidden xl:grid xl:grid-cols-12 xl:gap-4">
        <div className="col-span-1">
          <div className="bg-white rounded-2xl px-3 py-4 h-16 flex items-center justify-center shadow-sm">
            <span className="font-bold text-lg" style={{ color: COLORS.SECONDARY }}>
              {entry.rank}
            </span>
          </div>
        </div>
        <div className="col-span-3 min-w-0">
          <div className="bg-white rounded-2xl px-4 py-4 h-16 flex items-center shadow-sm">
            <span className="font-semibold text-lg truncate" style={{ color: COLORS.SECONDARY }}>
              {entry.fullName}
            </span>
          </div>
        </div>
        <div className="col-span-1">
          <div
            className="rounded-2xl px-3 py-4 h-16 flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            {entry.group}
          </div>
        </div>
        <div className="col-span-5">
          <div className="bg-white rounded-2xl px-4 py-4 h-16 flex items-center shadow-sm">
            <div className="grid grid-cols-6 gap-2 w-full">
              {entry.scores.map((score, scoreIndex) => (
                <div key={scoreIndex} className="text-center">
                  <span className="font-bold text-lg" style={{ color: COLORS.SECONDARY }}>
                    {score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="bg-white rounded-2xl px-4 py-4 h-16 flex items-center justify-center shadow-sm">
            <span className="font-bold text-red-500 text-xl">{entry.totalPoints}</span>
          </div>
        </div>
      </div>

      {/* Tablet Layout - Large screens */}
      <div className="hidden lg:grid xl:hidden lg:grid-cols-10 lg:gap-3">
        <div className="col-span-1">
          <div className="bg-white rounded-xl px-2 py-3 h-14 flex items-center justify-center shadow-sm">
            <span className="font-bold text-base" style={{ color: COLORS.SECONDARY }}>
              {entry.rank}
            </span>
          </div>
        </div>
        <div className="col-span-3 min-w-0">
          <div className="bg-white rounded-xl px-3 py-3 h-14 flex items-center shadow-sm">
            <span className="font-semibold text-base truncate" style={{ color: COLORS.SECONDARY }}>
              {entry.fullName}
            </span>
          </div>
        </div>
        <div className="col-span-1">
          <div
            className="rounded-xl px-2 py-3 h-14 flex items-center justify-center text-white font-bold text-base"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            {entry.group}
          </div>
        </div>
        <div className="col-span-4">
          <div className="bg-white rounded-xl px-3 py-3 h-14 flex items-center shadow-sm">
            <div className="grid grid-cols-6 gap-1 w-full">
              {entry.scores.map((score, scoreIndex) => (
                <div key={scoreIndex} className="text-center">
                  <span className="font-bold text-sm" style={{ color: COLORS.SECONDARY }}>
                    {score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-white rounded-xl px-2 py-3 h-14 flex items-center justify-center shadow-sm">
            <span className="font-bold text-red-500 text-base">{entry.totalPoints}</span>
          </div>
        </div>
      </div>

      {/* Small Tablet Layout - Medium screens */}
      <div className="hidden md:grid lg:hidden md:grid-cols-8 md:gap-2">
        <div className="col-span-1">
          <div className="bg-white rounded-lg px-2 py-2 h-12 flex items-center justify-center shadow-sm">
            <span className="font-bold text-sm" style={{ color: COLORS.SECONDARY }}>
              {entry.rank}
            </span>
          </div>
        </div>
        <div className="col-span-3 min-w-0">
          <div className="bg-white rounded-lg px-3 py-2 h-12 flex items-center shadow-sm">
            <span className="font-semibold text-sm truncate" style={{ color: COLORS.SECONDARY }}>
              {entry.fullName}
            </span>
          </div>
        </div>
        <div className="col-span-1">
          <div
            className="rounded-lg px-2 py-2 h-12 flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            {entry.group}
          </div>
        </div>
        <div className="col-span-2">
          <div className="bg-white rounded-lg px-2 py-2 h-12 flex items-center shadow-sm">
            <div className="flex justify-center space-x-1 w-full">
              {entry.scores.slice(0, 3).map((score, scoreIndex) => (
                <span key={scoreIndex} className="font-bold text-xs" style={{ color: COLORS.SECONDARY }}>
                  {score}
                </span>
              ))}
              <span className="text-xs text-gray-400">...</span>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-white rounded-lg px-2 py-2 h-12 flex items-center justify-center shadow-sm">
            <span className="font-bold text-red-500 text-sm">{entry.totalPoints}</span>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Small screens */}
      <div className="md:hidden bg-white rounded-xl p-3 sm:p-4 shadow-lg">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center min-w-0 flex-1">
            <div
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 text-white flex-shrink-0"
              style={{ backgroundColor: COLORS.PRIMARY }}
            >
              <span className="font-bold text-white text-base sm:text-lg">{entry.rank}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-base sm:text-lg truncate" style={{ color: COLORS.SECONDARY }}>
                {entry.fullName}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">Group {entry.group}</div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-bold text-red-500 text-xl sm:text-2xl">{entry.totalPoints}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Total</div>
          </div>
        </div>

        {/* Question Scores - Compact Mobile View */}
        <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
          <div className="text-xs sm:text-sm font-bold mb-2 text-center" style={{ color: COLORS.SECONDARY }}>
            Question Scores
          </div>
          <div className="grid grid-cols-6 gap-1">
            {entry.scores.map((score, scoreIndex) => (
              <div key={scoreIndex} className="bg-white rounded-md py-1 sm:py-2 text-center shadow-sm">
                <div className="text-xs text-gray-500 mb-0.5">Q{scoreIndex + 1}</div>
                <div className="font-bold text-sm sm:text-base" style={{ color: COLORS.SECONDARY }}>
                  {score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Extra Small Mobile - Very small screens */}
      <div className="block sm:hidden md:hidden">
        <div className="bg-white rounded-lg p-2 shadow-lg mb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center mr-2 text-white"
                style={{ backgroundColor: COLORS.PRIMARY }}
              >
                <span className="font-bold text-sm">{entry.rank}</span>
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm truncate" style={{ color: COLORS.SECONDARY }}>
                  {entry.fullName}
                </div>
                <div className="text-xs text-gray-600">{entry.group}</div>
              </div>
            </div>
            <div className="font-bold text-red-500 text-lg">{entry.totalPoints}</div>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {entry.scores.slice(0, 3).map((score, scoreIndex) => (
              <div key={scoreIndex} className="bg-gray-50 rounded p-1 text-center">
                <div className="text-xs text-gray-500">Q{scoreIndex + 1}</div>
                <div className="font-bold text-sm" style={{ color: COLORS.SECONDARY }}>
                  {score}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-1">
            <button className="text-xs text-blue-500 font-medium">View All Scores</button>
          </div>
        </div>
      </div>
    </>
  )
}
