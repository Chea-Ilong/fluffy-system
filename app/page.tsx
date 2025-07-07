"use client"

import { useState } from "react"
import { SearchAndFilters } from "@/components/leaderboard/search-and-filters"
import { OverallLeaderboardRow } from "@/components/leaderboard/overall-leaderboard-row"
import { OverallLeaderboardHeader } from "@/components/leaderboard/overall-leaderboard-header"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { Pagination } from "@/components/leaderboard/pagination"
import { useOverallLeaderboard } from "@/hooks/use-overall-leaderboard"
import { COLORS } from "@/lib/constants"
import { RevealButton } from "@/components/leaderboard/reveal-button"
import { AnimatedPodium } from "@/components/leaderboard/animated-podium"

export default function HomePage() {
  const { overallData, loading, error, filters, pagination, updateFilters, changePage, refetch } =
    useOverallLeaderboard()

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [showPodium, setShowPodium] = useState(false)

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

  const handleRefresh = () => {
    setIsRefreshing(true)
    refetch().finally(() => setIsRefreshing(false))
  }

  if (loading && overallData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 py-8 lg:py-12">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 py-8 lg:py-12">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </div>
    )
  }

  const startIndex = (pagination.currentPage - 1) * filters.participantsPerPage
  const endIndex = startIndex + filters.participantsPerPage
  const paginatedData = overallData.slice(startIndex, endIndex)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 py-8 lg:py-12">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-4xl lg:text-6xl font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6 leading-tight">
              CADT Freshman Coding Competition
            </h1>
          </div>

          {/* Search and Filters */}
          <SearchAndFilters
            filters={filters}
            onFiltersChange={updateFilters}
            onRefresh={handleRefresh}
            totalResults={overallData.length}
            isRefreshing={isRefreshing}
            showScoreFilter={true}
            extraActions={<RevealButton onReveal={handleReveal} isRevealed={isRevealed} />}
          />

          {/* Leaderboard Table */}
          <div
            className="rounded-2xl p-6 lg:p-8 overflow-hidden shadow-lg"
            style={{ backgroundColor: COLORS.SECONDARY }}
          >
            <OverallLeaderboardHeader />

            {/* Mobile Header */}
            <div className="lg:hidden mb-6">
              <div
                className="rounded-2xl px-4 py-3 text-center text-white font-medium text-xl"
                style={{ backgroundColor: COLORS.PRIMARY }}
              >
                CADT Overall Leaderboard
              </div>
            </div>

            {/* Data Rows */}
            <div className="space-y-4 lg:space-y-6">
              {paginatedData.map((entry) => (
                <OverallLeaderboardRow key={entry.id} entry={entry} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={changePage}
              className="mt-8"
            />
          </div>
        </div>
      </div>

      {/* Animated Podium */}
      {showPodium && <AnimatedPodium data={overallData} onComplete={handlePodiumComplete} />}
    </>
  )
}
