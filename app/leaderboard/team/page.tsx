"use client"

import { useState } from "react"
import { SearchAndFilters } from "@/components/leaderboard/search-and-filters"
import { TeamLeaderboardRow } from "@/components/leaderboard/team-leaderboard-row"
import { TeamLeaderboardHeader } from "@/components/leaderboard/team-leaderboard-header"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { Pagination } from "@/components/leaderboard/pagination"
import { FullscreenButton } from "@/components/leaderboard/fullscreen-button"
import { FullscreenModal } from "@/components/leaderboard/fullscreen-modal"
import { useTeamLeaderboard } from "@/hooks/use-team-leaderboard"
import { COLORS } from "@/lib/constants"

export default function TeamLeaderboardPage() {
  const { teamData, loading, refreshing, error, filters, pagination, updateFilters, changePage, refetch } =
    useTeamLeaderboard()

  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const LeaderboardContent = () => (
    <div className="rounded-2xl p-6 lg:p-8 overflow-hidden shadow-lg" style={{ backgroundColor: COLORS.SECONDARY }}>
      <TeamLeaderboardHeader />

      {/* Mobile Header */}
      <div className="lg:hidden mb-6">
        <div
          className="rounded-2xl px-4 py-3 text-center text-white font-medium text-xl"
          style={{ backgroundColor: COLORS.PRIMARY }}
        >
          CADT Team Leaderboard
        </div>
      </div>

      {/* Data Rows */}
      <div className="space-y-4 lg:space-y-6">
        {teamData.map((team) => (
          <TeamLeaderboardRow key={team.id} team={team} />
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

  if (loading && teamData.length === 0) {
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
  const paginatedData = teamData.slice(startIndex, endIndex)

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
            onRefresh={refetch}
            totalResults={teamData.length}
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
