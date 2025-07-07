"use client"

import { useLeaderboard } from "@/hooks/use-leaderboard"
import { LEADERBOARD_CONFIG, COLORS } from "@/constants/leaderboard"

export function LeaderboardStats() {
  const { leaderboardData } = useLeaderboard(1, "individual")

  const stats = [
    {
      value: leaderboardData.length,
      label: "Participants",
      color: "text-white",
    },
    {
      value: LEADERBOARD_CONFIG.QUESTIONS_COUNT,
      label: "Questions",
      color: "text-white",
    },
    {
      value: Math.max(...leaderboardData.map((d) => d.totalPoints)),
      label: "Highest Score",
      color: COLORS.PRIMARY,
    },
    {
      value: "R1",
      label: "Active Round",
      color: "text-white",
    },
  ]

  return (
    <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border border-white/20 ${
            index === 3 ? "col-span-2 sm:col-span-3 lg:col-span-1" : ""
          }`}
        >
          <div
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 ${
              typeof stat.color === "string" && stat.color.startsWith("#") ? "" : stat.color
            }`}
            style={{ color: typeof stat.color === "string" && stat.color.startsWith("#") ? stat.color : undefined }}
          >
            {stat.value}
          </div>
          <div className="text-gray-300 text-xs sm:text-sm lg:text-base font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
