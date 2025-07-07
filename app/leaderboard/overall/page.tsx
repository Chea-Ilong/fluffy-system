"use client"

import { useState } from "react"
import { LeaderboardHeader } from "@/components/leaderboard/leaderboard-header"
import { SearchAndFilters } from "@/components/leaderboard/search-and-filters"
import { OverallLeaderboardTable } from "@/components/leaderboard/overall-leaderboard-table"
import { RevealButton } from "@/components/leaderboard/reveal-button"
import { AnimatedPodium } from "@/components/leaderboard/animated-podium"
import { FullscreenModal } from "@/components/leaderboard/fullscreen-modal"
import { useOverallLeaderboard } from "@/hooks/use-overall-leaderboard"
import { Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OverallLeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGroup, setSelectedGroup] = useState<string>("all")
  const [isRevealed, setIsRevealed] = useState(false)
  const [showPodium, setShowPodium] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { leaderboardData, loading, error, refetch, refreshing } = useOverallLeaderboard()

  const filteredData = (leaderboardData || []).filter((entry) => {
    const matchesSearch = entry.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGroup = selectedGroup === "all" || entry.group === selectedGroup
    return matchesSearch && matchesGroup
  })

  const handleReveal = () => {
    if (isRevealed) {
      // Reset
      setIsRevealed(false)
      setShowPodium(false)
    } else {
      // Start reveal
      setIsRevealed(true)
      setShowPodium(true)
    }
  }

  const handlePodiumComplete = () => {
    setShowPodium(false)
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const LeaderboardContent = () => (
    <OverallLeaderboardTable data={filteredData} loading={loading} error={error} onRetry={refetch} />
  )

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 py-4 sm:py-8 lg:py-12">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <LeaderboardHeader title="Overall Leaderboard" subtitle="Combined Rankings from All Rounds" />

          <SearchAndFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedGroup={selectedGroup}
            onGroupChange={setSelectedGroup}
            onRefresh={refetch}
            isRefreshing={refreshing}
            totalParticipants={leaderboardData.length}
            filteredCount={filteredData.length}
            extraActions={
              <div className="flex gap-2">
                <RevealButton onReveal={handleReveal} isRevealed={isRevealed} />
                <Button
                  onClick={handleFullscreen}
                  className="h-10 sm:h-12 px-4 lg:px-6 bg-orange-400 hover:bg-orange-500 text-white rounded-lg sm:rounded-xl font-medium text-sm sm:text-base"
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="w-4 h-4 mr-2" />
                      <span className="hidden lg:inline">Exit Fullscreen</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-4 h-4 mr-2" />
                      <span className="hidden lg:inline">Fullscreen</span>
                    </>
                  )}
                </Button>
              </div>
            }
          />

          <LeaderboardContent />
        </div>
      </div>

      {/* Animated Podium */}
      {showPodium && !isFullscreen && <AnimatedPodium data={filteredData} onComplete={handlePodiumComplete} />}

      {/* Fullscreen Modal */}
      <FullscreenModal isOpen={isFullscreen} onClose={() => setIsFullscreen(false)}>
        {showPodium ? <AnimatedPodium data={filteredData} onComplete={handlePodiumComplete} /> : <LeaderboardContent />}
      </FullscreenModal>
    </>
  )
}
