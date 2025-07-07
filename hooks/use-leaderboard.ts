"use client"

import { useState, useEffect, useCallback } from "react"
import type { LeaderboardEntry, LeaderboardType, LeaderboardFilters, PaginationState } from "@/types/leaderboard"
import { fetchLeaderboardData } from "@/lib/api"
import { transformApiDataToLeaderboard } from "@/lib/utils"
import { LEADERBOARD_CONFIG } from "@/lib/constants"

/**
 * React hook for fetching, filtering and paginating individual- or team-type
 * leaderboards.
 *
 * Filters:
 *   • search (string)
 *   • group (string | "All")
 *   • participantsPerPage (number)  ← NEW
 *
 * Pagination is page-based (no infinite scroll).
 */
export function useLeaderboard(roundId: string, type: LeaderboardType = "individual") {
  /* ---------- STATE ---------- */
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [filteredData, setFilteredData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filters, setFilters] = useState<LeaderboardFilters>({
    search: "",
    group: "All",
    participantsPerPage: LEADERBOARD_CONFIG.DEFAULT_PARTICIPANTS_PER_PAGE,
  })

  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    hasMore: false,
  })

  /* ---------- HELPERS ---------- */
  const applyFilters = useCallback(() => {
    let data = [...leaderboardData]

    // text search
    if (filters.search) {
      const term = filters.search.toLowerCase()
      data = data.filter((d) => d.fullName.toLowerCase().includes(term) || d.hackerRankId.toLowerCase().includes(term))
    }

    // group filter
    if (filters.group !== "All") data = data.filter((d) => d.group === filters.group)

    // pagination meta
    const totalPages = Math.max(1, Math.ceil(data.length / filters.participantsPerPage))
    setFilteredData(data)
    setPagination((prev) => ({
      ...prev,
      totalPages,
      currentPage: Math.min(prev.currentPage, totalPages),
      hasMore: false,
    }))
  }, [leaderboardData, filters])

  const fetchData = useCallback(
    async (page = 1) => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetchLeaderboardData()
        const transformed = transformApiDataToLeaderboard(res)
        setLeaderboardData(transformed)
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : "Failed to fetch leaderboard")
      } finally {
        setLoading(false)
      }
    },
    [roundId],
  )

  /* ---------- EFFECTS ---------- */
  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  /* ---------- API ---------- */
  const updateFilters = (patch: Partial<LeaderboardFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }))
    setPagination((prev) => ({ ...prev, currentPage: 1 }))
  }

  const changePage = (page: number) => setPagination((p) => ({ ...p, currentPage: page }))

  // slice data for the current page
  const paginatedData = filteredData.slice(
    (pagination.currentPage - 1) * filters.participantsPerPage,
    pagination.currentPage * filters.participantsPerPage,
  )

  return {
    leaderboardData: paginatedData,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    changePage,
    refetch: () => fetchData(),
  }
}
