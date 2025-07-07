"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { OverallEntry, LeaderboardFilters, PaginationState } from "@/types/leaderboard"
import { getAllParticipantOverall } from "@/lib/api"
import { LEADERBOARD_CONFIG } from "@/lib/constants"

export function useOverallLeaderboard() {
  const [overallData, setOverallData] = useState<OverallEntry[]>([])
  const [filteredData, setFilteredData] = useState<OverallEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<LeaderboardFilters>({
    search: "",
    group: "All",
    participantsPerPage: LEADERBOARD_CONFIG.DEFAULT_PARTICIPANTS_PER_PAGE,
  })
  const [pagination, setPagination] = useState<PaginationState>({
    currentTab: 1,
    currentPage: 1,
    totalPages: 1,
    hasMore: false,
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("Fetching overall leaderboard data from custom API...")

      // Use your custom overall API function
      const overallResults = await getAllParticipantOverall()

      // Transform the data to match OverallEntry format
      const transformedData: OverallEntry[] = overallResults
        .map((result, index) => ({
          id: index + 1,
          rank: index + 1, // Will be recalculated after sorting
          fullName: result.fullName,
          hackerRankId: result.fullName, // Use fullName as hackerRankId
          group: `G${result.group}`, // Convert number to group format
          round1Score: result.round1,
          round2Score: result.round2,
          teamScore: result.teamScore,
          bonus: result.bonusScore,
          energizer: 0, // Not in your data structure
          totalPoints: result.totalScore,
        }))
        .sort((a, b) => b.totalPoints - a.totalPoints) // Sort by total score descending
        .map((entry, index) => ({ ...entry, rank: index + 1 })) // Recalculate ranks

      setOverallData(transformedData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching data")
      console.error("Overall leaderboard fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const applyFilters = useCallback(() => {
    let filtered = [...overallData]

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        (entry) =>
          entry.fullName.toLowerCase().includes(searchTerm) || entry.hackerRankId.toLowerCase().includes(searchTerm),
      )
    }

    // Group filter
    if (filters.group && filters.group !== "All" && filters.group !== "all") {
      filtered = filtered.filter((entry) => entry.group === filters.group)
    }

    setFilteredData(filtered)

    // Update pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / filters.participantsPerPage))
    setPagination((prev) => ({
      ...prev,
      totalPages,
      currentPage: Math.min(prev.currentPage, totalPages),
    }))
  }, [overallData, filters])

  const updateFilters = useCallback((newFilters: Partial<LeaderboardFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      // Ensure values are never undefined
      search: newFilters.search ?? prev.search ?? "",
      group: newFilters.group ?? prev.group ?? "All",
      participantsPerPage:
        newFilters.participantsPerPage ?? prev.participantsPerPage ?? LEADERBOARD_CONFIG.DEFAULT_PARTICIPANTS_PER_PAGE,
    }))
    setPagination((prev) => ({ ...prev, currentPage: 1 }))
  }, [])

  const changePage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }, [])

  // Initial data fetch
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Apply filters when data or filters change
  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  // Set up live updates
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      fetchData()
    }, LEADERBOARD_CONFIG.LIVE_UPDATE_INTERVAL)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [fetchData])

  return {
    leaderboardData: filteredData,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    changePage,
    refetch: fetchData,
    refreshing: loading,
  }
}
