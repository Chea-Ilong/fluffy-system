"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, RefreshCw, Filter, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchAndFiltersProps {
  /* ORIGINAL prop-shape that the pages expect */
  filters: {
    search: string
    group: string
    participantsPerPage: number
  }
  onFiltersChange: (next: SearchAndFiltersProps["filters"]) => void
  onRefresh: () => void
  totalResults: number
  isRefreshing: boolean
  showScoreFilter?: boolean
  extraActions?: React.ReactNode
}

export function SearchAndFilters({
  filters,
  onFiltersChange,
  onRefresh,
  totalResults,
  isRefreshing,
  showScoreFilter = true,
  extraActions,
}: SearchAndFiltersProps) {
  /* keep a local mirror for nicer UX */
  const [localSearchTerm, setLocalSearchTerm] = useState(filters.search ?? "")
  const [showFilters, setShowFilters] = useState(false)

  /* sync external → local */
  useEffect(() => {
    setLocalSearchTerm(filters.search ?? "")
  }, [filters.search])

  const handleSearchChange = (value: string) => {
    setLocalSearchTerm(value)
    onFiltersChange({ ...filters, search: value })
  }

  const handleGroupChange = (value: string) => {
    onFiltersChange({ ...filters, group: value })
  }

  const handlePageSizeChange = (value: string) => {
    onFiltersChange({ ...filters, participantsPerPage: Number.parseInt(value, 10) })
  }

  return (
    <div className="mb-4 sm:mb-6 lg:mb-8 space-y-3 sm:space-y-4">
      {/* Main Search and Actions Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg">
        {/* Search Bar */}
        <div className="flex-1 relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <Input
            placeholder="Search by name..."
            /* ensure always-controlled */
            value={localSearchTerm ?? ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 sm:pl-10 h-10 sm:h-12 border-2 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base"
          />
        </div>

        {/* Desktop Filters */}
        <div className="hidden sm:flex items-center gap-3 lg:gap-4">
          <div className="w-32 lg:w-48">
            <Select
              /* always provide a value to keep it controlled */
              value={filters.group ?? "All"}
              onValueChange={handleGroupChange}
            >
              <SelectTrigger className="h-10 sm:h-12 border-2 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="All Groups" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Groups</SelectItem>
                {Array.from({ length: 10 }, (_, i) => (
                  <SelectItem key={i + 1} value={`G${i + 1}`}>
                    Group {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-20 lg:w-32">
            <Select value={(filters.participantsPerPage ?? 25).toString()} onValueChange={handlePageSizeChange}>
              <SelectTrigger className="h-10 sm:h-12 border-2 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="h-10 sm:h-12 px-4 lg:px-6 bg-orange-400 hover:bg-orange-500 text-white rounded-lg sm:rounded-xl font-medium text-sm sm:text-base"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            <span className="hidden lg:inline">Refresh</span>
          </Button>

          {extraActions}
        </div>

        {/* Mobile Filter Toggle */}
        <div className="sm:hidden w-full flex justify-between items-center">
          <Button
            onClick={() => setShowFilters((p) => !p)}
            variant="outline"
            className="h-10 px-4 border-2 rounded-lg font-medium text-sm"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>

          <div className="flex gap-2">
            <Button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="h-10 px-4 bg-orange-400 hover:bg-orange-500 text-white rounded-lg font-medium text-sm"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>

            {extraActions}
          </div>
        </div>
      </div>

      {/* Mobile Filters Dropdown */}
      {showFilters && (
        <div className="sm:hidden bg-white rounded-xl p-4 shadow-lg space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Group Filter</label>
            <Select value={filters.group ?? "All"} onValueChange={handleGroupChange}>
              <SelectTrigger className="h-10 border-2 rounded-lg font-medium text-sm">
                <SelectValue placeholder="All Groups" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Groups</SelectItem>
                {Array.from({ length: 20 }, (_, i) => (
                  <SelectItem key={i + 1} value={`G${i + 1}`}>
                    Group {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Items per Page</label>
            <Select value={(filters.participantsPerPage ?? 25).toString()} onValueChange={handlePageSizeChange}>
              <SelectTrigger className="h-10 border-2 rounded-lg font-medium text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="25">25 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
                <SelectItem value="100">100 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Results Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 px-1">
        <span className="font-medium text-sm sm:text-base">
          Showing {totalResults} {totalResults === 1 ? "participant" : "participants"}
        </span>
        <div className="flex items-center gap-2 text-xs sm:text-sm mt-1 sm:mt-0">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-medium">Live Updates</span>
        </div>
      </div>
    </div>
  )
}
