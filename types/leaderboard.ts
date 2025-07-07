export interface LeaderboardEntry {
  id: number
  rank: number
  fullName: string
  hackerRankId: string
  group: string
  scores: number[]
  totalPoints: number
  bonus?: number
  energizer?: number
  avatar?: string
}

export interface OverallEntry {
  id: number
  rank: number
  fullName: string
  hackerRankId: string
  group: string
  round1Score: number
  round2Score: number
  teamScore: number
  bonus: number
  energizer: number
  totalPoints: number
}

export interface TeamEntry {
  id: number
  rank: number
  teamName: string
  member1: LeaderboardEntry
  member2: LeaderboardEntry
  totalPoints: number
  combinedScores: number[]
}

export interface LeaderboardResponse {
  success: boolean
  round: number
  data: LeaderboardEntry[]
  timestamp: string
  error?: string
  message?: string
  totalCount: number
  hasMore: boolean
}

export interface HackerRankApiResponse {
  models: Array<{
    hacker: string
    score: number
    rank: number
  }>
}

export type LeaderboardType = "individual" | "team" | "overall"

export interface LeaderboardFilters {
  search: string
  group: string
  participantsPerPage: number // Added participants per page filter
}

export interface PaginationState {
  currentTab: number
  currentPage: number
  totalPages: number
  hasMore: boolean
}

export interface AdminUser {
  name: string
  password: string
}

export interface AdminData {
  participants: LeaderboardEntry[]
  teams: TeamEntry[]
}
