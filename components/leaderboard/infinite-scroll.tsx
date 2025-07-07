"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface InfiniteScrollProps {
  hasMore: boolean
  loading: boolean
  onLoadMore: () => void
  children: React.ReactNode
}

export function InfiniteScroll({ hasMore, loading, onLoadMore, children }: InfiniteScrollProps) {
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore()
        }
      },
      { threshold: 0.1 },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loading, onLoadMore])

  return (
    <>
      {children}
      <div ref={observerRef} className="py-8 flex justify-center">
        {loading && <LoadingSpinner size={32} />}
        {!hasMore && !loading && <p className="text-gray-500 text-center">No more participants to load</p>}
      </div>
    </>
  )
}
