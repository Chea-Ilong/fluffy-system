import { COLORS } from "@/lib/constants"
import type { TeamEntry } from "@/types/leaderboard"

interface TeamLeaderboardRowProps {
  team: TeamEntry
}

export function TeamLeaderboardRow({ team }: TeamLeaderboardRowProps) {
  // Add safety check for undefined team
  if (!team) {
    return null
  }

  // Ensure all required properties exist with fallbacks
  const safeTeam = {
    rank: team.rank || 0,
    teamName: team.teamName || "Unknown Team",
    member1: team.member1 || { fullName: "Unknown Member" },
    member2: team.member2 || { fullName: "Unknown Member" },
    combinedScores: team.combinedScores || [0, 0, 0, 0, 0, 0],
    totalPoints: team.totalPoints || 0,
  }

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:gap-3 xl:gap-4">
        {/* Rank */}
        <div className="flex-shrink-0 w-20 xl:w-24">
          <div className="bg-white rounded-2xl px-4 py-3 xl:py-4 h-14 xl:h-16 flex items-center justify-center shadow-sm">
            <span className="font-bold text-base xl:text-lg" style={{ color: COLORS.SECONDARY }}>
              {safeTeam.rank}
            </span>
          </div>
        </div>

        {/* Team Name */}
        <div className="flex-shrink-0 w-48 xl:w-56">
          <div className="bg-white rounded-2xl px-4 py-3 xl:py-4 h-14 xl:h-16 flex items-center justify-center shadow-sm">
            <span className="font-semibold text-base xl:text-lg truncate" style={{ color: COLORS.SECONDARY }}>
              {safeTeam.teamName}
            </span>
          </div>
        </div>

        {/* Team Members */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl px-6 py-3 xl:py-4 h-14 xl:h-16 flex items-center justify-center shadow-sm">
            <div className="flex items-center justify-center w-full">
              <span className="font-medium text-sm xl:text-base truncate" style={{ color: COLORS.SECONDARY }}>
                {safeTeam.member1.fullName}
              </span>
              <span className="mx-4 text-gray-400 font-bold text-lg">+</span>
              <span className="font-medium text-sm xl:text-base truncate" style={{ color: COLORS.SECONDARY }}>
                {safeTeam.member2.fullName}
              </span>
            </div>
          </div>
        </div>

        {/* Combined Scores */}
        <div className="flex-shrink-0 w-80 xl:w-96">
          <div className="bg-white rounded-2xl px-4 py-3 xl:py-4 h-14 xl:h-16 flex items-center shadow-sm">
            <div className="grid grid-cols-6 gap-2 w-full">
              {safeTeam.combinedScores.map((score, index) => (
                <div key={index} className="text-center">
                  <span className="font-bold text-sm xl:text-base" style={{ color: COLORS.SECONDARY }}>
                    {score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total Points */}
        <div className="flex-shrink-0 w-24 xl:w-28">
          <div className="bg-white rounded-2xl px-4 py-3 xl:py-4 h-14 xl:h-16 flex items-center justify-center shadow-sm">
            <span className="font-bold text-red-500 text-lg xl:text-xl">{safeTeam.totalPoints}</span>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center min-w-0 flex-1">
            <div
              className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full mr-4 text-white flex-shrink-0"
              style={{ backgroundColor: COLORS.PRIMARY }}
            >
              <span className="font-bold text-white text-lg sm:text-xl">{safeTeam.rank}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-lg sm:text-xl truncate" style={{ color: COLORS.SECONDARY }}>
                {safeTeam.teamName}
              </div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">Team Competition</div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-bold text-red-500 text-2xl sm:text-3xl">{safeTeam.totalPoints}</div>
            <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide font-medium">Total Points</div>
          </div>
        </div>

        {/* Team Members */}
        <div className="mb-4 p-4 bg-gray-50 rounded-xl">
          <div className="text-sm font-semibold mb-3" style={{ color: COLORS.SECONDARY }}>
            Team Members
          </div>
          <div className="flex items-center justify-center">
            <span className="font-medium text-sm bg-white rounded-lg px-3 py-2" style={{ color: COLORS.SECONDARY }}>
              {safeTeam.member1.fullName}
            </span>
            <span className="mx-3 text-gray-400 font-bold">+</span>
            <span className="font-medium text-sm bg-white rounded-lg px-3 py-2" style={{ color: COLORS.SECONDARY }}>
              {safeTeam.member2.fullName}
            </span>
          </div>
        </div>

        {/* Combined Scores */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="text-sm font-semibold mb-3" style={{ color: COLORS.SECONDARY }}>
            Combined Scores
          </div>
          <div className="grid grid-cols-3 gap-2">
            {safeTeam.combinedScores.map((score, index) => (
              <div key={index} className="bg-white rounded-lg py-3 text-center">
                <div className="text-xs text-gray-500 mb-1">Q{index + 1}</div>
                <div className="font-bold text-lg" style={{ color: COLORS.SECONDARY }}>
                  {score}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
