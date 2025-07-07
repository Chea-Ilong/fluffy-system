"use client"

import { useState } from "react"
import { LeaderboardHeader } from "@/components/leaderboard/leaderboard-header"
import { SearchAndFilters } from "@/components/leaderboard/search-and-filters"
import { LeaderboardRow } from "@/components/leaderboard/leaderboard-row"
import { LeaderboardTableHeader } from "@/components/leaderboard/leaderboard-table-header"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { Pagination } from "@/components/leaderboard/pagination"
import { FullscreenButton } from "@/components/leaderboard/fullscreen-button"
import { FullscreenModal } from "@/components/leaderboard/fullscreen-modal"
import { useRound1Leaderboard } from "@/hooks/use-round1-leaderboard"
import { COLORS } from "@/lib/constants"

export default function Round1LeaderboardPage() {
  const { leaderboardData, loading, refreshing, error, filters, pagination, updateFilters, changePage, refetch } =
    useRound1Leaderboard()

  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const LeaderboardContent = () => (
    <div className="rounded-2xl p-6 lg:p-8 overflow-hidden shadow-lg" style={{ backgroundColor: COLORS.SECONDARY }}>
      <LeaderboardTableHeader />

      {/* Mobile Header */}
      <div className="lg:hidden mb-6">
        <div
          className="rounded-2xl px-4 py-3 text-center text-white font-medium text-xl"
          style={{ backgroundColor: COLORS.PRIMARY }}
        >
          CADT Leaderboard - Round 1
        </div>
      </div>

      {/* Data Rows */}
      <div className="space-y-4 lg:space-y-6">
        {leaderboardData.map((entry) => (
          <LeaderboardRow key={entry.id} entry={entry} />
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
  )

  if (loading && leaderboardData.length === 0) {
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
  const paginatedData = leaderboardData.slice(startIndex, endIndex)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 py-8 lg:py-12">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <LeaderboardHeader title="Individual Leaderboard - Round 1" subtitle="Foundation Challenges" />

          {/* Search and Filters */}
          <SearchAndFilters
            filters={filters}
            onFiltersChange={updateFilters}
            onRefresh={refetch}
            totalResults={leaderboardData.length}
            isRefreshing={refreshing}
            showScoreFilter={false}
            extraActions={<FullscreenButton onToggleFullscreen={toggleFullscreen} isFullscreen={isFullscreen} />}
          />

          <LeaderboardContent />
        </div>
      </div>

      {/* Fullscreen Modal */}
      <FullscreenModal isOpen={isFullscreen} onClose={() => setIsFullscreen(false)}>
        <LeaderboardContent />
      </FullscreenModal>
    </>
  )
}
