"use client"

import { useState, useEffect, useCallback } from "react"
import type { TeamEntry, LeaderboardFilters, PaginationState } from "@/types/leaderboard"
import { fetchTeamLeaderboardData } from "@/lib/api"
import { transformApiDataToTeams } from "@/lib/utils"
import { LEADERBOARD_CONFIG } from "@/lib/constants"

export function useTeamLeaderboard() {
  const [teamData, setTeamData] = useState<TeamEntry[]>([])
  const [filteredData, setFilteredData] = useState<TeamEntry[]>([])
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
    let data = [...teamData]

    if (filters.search) {
      const term = filters.search.toLowerCase()
      data = data.filter(
        (d) =>
          d.teamName.toLowerCase().includes(term) ||
          d.member1.fullName.toLowerCase().includes(term) ||
          d.member2.fullName.toLowerCase().includes(term),
      )
    }

    if (filters.group !== "All") {
      data = data.filter((d) => d.member1.group === filters.group || d.member2.group === filters.group)
    }

    const totalPages = Math.max(1, Math.ceil(data.length / filters.participantsPerPage))
    setFilteredData(data)
    setPagination((prev) => ({
      ...prev,
      totalPages,
      currentPage: Math.min(prev.currentPage, totalPages),
      hasMore: false,
    }))
  }, [teamData, filters])

  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      setError(null)

      const res = await fetchTeamLeaderboardData()
      const transformed = transformApiDataToTeams(res)
      setTeamData(transformed)
    } catch (err) {
      console.error("Team fetch error:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch team leaderboard")
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
    teamData: paginatedData,
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
