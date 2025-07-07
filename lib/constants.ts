export const LEADERBOARD_CONFIG = {
  ROUNDS: [1, 2] as const,
  QUESTIONS_COUNT: 6,
  GROUPS: ["G1", "G2", "G3"] as const,
  REFRESH_INTERVAL: 300000, // 5 minutes in milliseconds
  MAX_PARTICIPANTS: 100,
  PARTICIPANTS_PER_PAGE_OPTIONS: [25, 50, 100] as const, // Options for participants per page
  DEFAULT_PARTICIPANTS_PER_PAGE: 50,
  PAGINATION_TABS: 4,
  LIVE_UPDATE_INTERVAL: 5 * 60 * 1000, // 5 minutes
} as const

export const COLORS = {
  PRIMARY: "#F58C29",
  SECONDARY: "#15284C",
  SUCCESS: "#10B981",
  ERROR: "#EF4444",
  WARNING: "#F59E0B",
} as const

export const FILTER_OPTIONS = {
  GROUPS: ["All", "G1", "G2", "G3"] as const,
} as const
