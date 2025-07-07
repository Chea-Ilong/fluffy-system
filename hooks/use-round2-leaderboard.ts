"use client"

import { useState, useEffect, useCallback } from "react"
import type { LeaderboardEntry, LeaderboardFilters, PaginationState } from "@/types/leaderboard"
import { fetchLeaderboardData } from "@/lib/api"
import { transformApiDataToLeaderboard } from "@/lib/utils"
import { LEADERBOARD_CONFIG } from "@/lib/constants"

export function useRound2Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [filteredData, setFilteredData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
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

  const applyFilters = useCallback(() => {
    let data = [...leaderboardData]

    if (filters.search) {
      const term = filters.search.toLowerCase()
      data = data.filter((d) => d.fullName.toLowerCase().includes(term) || d.hackerRankId.toLowerCase().includes(term))
    }

    if (filters.group !== "All") {
      data = data.filter((d) => d.group === filters.group)
    }

    const totalPages = Math.max(1, Math.ceil(data.length / filters.participantsPerPage))
    setFilteredData(data)
    setPagination((prev) => ({
      ...prev,
      totalPages,
      currentPage: Math.min(prev.currentPage, totalPages),
      hasMore: false,
    }))
  }, [leaderboardData, filters])

  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      setError(null)

      const res = await fetchLeaderboardData()
      const transformed = transformApiDataToLeaderboard(res)

      // Filter for Round 2 data (you may need to adjust this based on your data structure)
      const round2Data = transformed.filter((entry) => {
        // Add your Round 2 filtering logic here
        // For now, assuming all data is Round 2 data
        return true
      })

      setLeaderboardData(round2Data)
    } catch (err) {
      console.error("Round 2 fetch error:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch Round 2 leaderboard")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const updateFilters = (patch: Partial<LeaderboardFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }))
    setPagination((prev) => ({ ...prev, currentPage: 1 }))
  }

  const changePage = (page: number) => {
    setPagination((p) => ({ ...p, currentPage: page }))
  }

  const refetch = useCallback(() => {
    return fetchData(true)
  }, [fetchData])

  const paginatedData = filteredData.slice(
    (pagination.currentPage - 1) * filters.participantsPerPage,
    pagination.currentPage * filters.participantsPerPage,
  )

  return {
    leaderboardData: paginatedData,
    loading,
    refreshing,
    error,
    filters,
    pagination,
    updateFilters,
    changePage,
    refetch,
  }
}
