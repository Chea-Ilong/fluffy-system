"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const visiblePages = getVisiblePages()

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* First Page */}
      <Button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
        className="h-10 w-10 p-0 border-2 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-50"
      >
        <ChevronsLeft className="w-4 h-4" />
      </Button>

      {/* Previous Page */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        size="sm"
        className="h-10 px-3 border-2 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-50"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-gray-500 font-medium">...</span>
            ) : (
              <Button
                onClick={() => onPageChange(page as number)}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className={`h-10 w-10 p-0 border-2 rounded-xl font-medium ${
                  currentPage === page
                    ? "bg-orange-400 hover:bg-orange-500 text-white border-orange-400"
                    : "hover:bg-gray-50"
                }`}
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Next Page */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        size="sm"
        className="h-10 px-3 border-2 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-50"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>

      {/* Last Page */}
      <Button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        variant="outline"
        size="sm"
        className="h-10 w-10 p-0 border-2 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-50"
      >
        <ChevronsRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
