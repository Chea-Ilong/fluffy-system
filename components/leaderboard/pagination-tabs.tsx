"use client"

import { Button } from "@/components/ui/button"
import { COLORS, LEADERBOARD_CONFIG } from "@/constants/leaderboard"
import type { PaginationState } from "@/types/leaderboard"

interface PaginationTabsProps {
  pagination: PaginationState
  onTabChange: (tab: number) => void
  totalParticipants: number
}

export function PaginationTabs({ pagination, onTabChange, totalParticipants }: PaginationTabsProps) {
  const participantsPerTab = LEADERBOARD_CONFIG.PARTICIPANTS_PER_PAGE
  const totalTabs = Math.min(LEADERBOARD_CONFIG.PAGINATION_TABS, Math.ceil(totalParticipants / participantsPerTab))

  const getTabRange = (tab: number) => {
    const start = (tab - 1) * participantsPerTab + 1
    const end = Math.min(tab * participantsPerTab, totalParticipants)
    return `${start}-${end}`
  }

  const getTabLabel = (tab: number) => {
    if (tab === 1) return "Top Performers"
    if (tab === 2) return "High Achievers"
    if (tab === 3) return "Rising Stars"
    if (tab === 4) return "Participants"
    return `Group ${tab}`
  }

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
        {Array.from({ length: totalTabs }, (_, i) => i + 1).map((tab) => (
          <Button
            key={tab}
            onClick={() => onTabChange(tab)}
            variant={pagination.currentTab === tab ? "default" : "outline"}
            className={`px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold transition-all duration-200 ${
              pagination.currentTab === tab ? "text-white shadow-lg" : "text-gray-700 hover:bg-gray-50 border-2"
            }`}
            style={{
              backgroundColor: pagination.currentTab === tab ? COLORS.PRIMARY : undefined,
              borderColor: pagination.currentTab === tab ? COLORS.PRIMARY : undefined,
            }}
          >
            <div className="text-center">
              <div className="font-bold">{getTabLabel(tab)}</div>
              <div className="text-xs opacity-80">#{getTabRange(tab)}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}
