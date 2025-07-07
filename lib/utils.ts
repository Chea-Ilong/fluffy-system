import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { LeaderboardEntry, TeamEntry, OverallEntry } from "@/types/leaderboard"
import type { CandidateData } from "@/lib/api"
import { QUESTION_ID_MAPPING, QUESTION_IDS, QUESTION_LABELS } from "@/lib/api"

/* -------------------------------------------------------------------------- */
/*  Generic helpers                                                           */
/* -------------------------------------------------------------------------- */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatScore(score: number) {
  if (isNaN(score) || score === null || score === undefined) {
    return "0"
  }
  return Math.round(score).toString()
}

export function getRankSuffix(rank: number) {
  if (isNaN(rank) || rank === null || rank === undefined) {
    return "th"
  }
  if (rank % 100 >= 11 && rank % 100 <= 13) return "th"
  switch (rank % 10) {
    case 1:
      return "st"
    case 2:
      return "nd"
    case 3:
      return "rd"
    default:
      return "th"
  }
}

export function calculateTotalPoints(scores: number[], bonus = 0, energizer = 0) {
  const validScores = scores.filter((score) => !isNaN(score) && score !== null && score !== undefined)
  const scoresSum = validScores.reduce((sum, s) => sum + s, 0)
  const validBonus = isNaN(bonus) ? 0 : bonus
  const validEnergizer = isNaN(energizer) ? 0 : energizer
  return scoresSum + validBonus + validEnergizer
}

export function formatTimestamp(timestamp: string) {
  try {
    return new Date(timestamp).toLocaleString()
  } catch {
    return "Invalid Date"
  }
}

/* -------------------------------------------------------------------------- */
/*  Question score helpers                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Convert questions object to array of 6 scores using proper question ID mapping
 * This ensures questions appear in the correct positions even if some are missing
 */
export function questionsToScoresArray(questions: Record<string, number>): number[] {
  // Initialize array with 6 zeros
  const scores = new Array(6).fill(0)

  if (!questions || typeof questions !== "object") {
    return scores
  }

  // Map each question ID to its correct position
  Object.entries(questions).forEach(([questionId, score]) => {
    const position = QUESTION_ID_MAPPING[questionId as keyof typeof QUESTION_ID_MAPPING]

    if (position !== undefined && position >= 0 && position < 6) {
      scores[position] = Math.round(Number(score) || 0)
    }
  })

  return scores
}

/**
 * Get question headers for display
 */
export function getQuestionHeaders(): string[] {
  return QUESTION_LABELS || QUESTION_IDS.map((_, index) => `Q${index + 1}`)
}

/**
 * Debug function to show which questions are present
 */
export function debugQuestions(questions: Record<string, number>): void {
  console.log("Questions debug:")
  Object.entries(questions).forEach(([questionId, score]) => {
    const position = QUESTION_ID_MAPPING[questionId as keyof typeof QUESTION_ID_MAPPING]
    console.log(`Question ID ${questionId} -> Position ${position} -> Score ${score}`)
  })
}

/* -------------------------------------------------------------------------- */
/*  Group assignment helper                                                   */
/* -------------------------------------------------------------------------- */

function generateGroup(email: string, index: number): string {
  // Try to extract group from email if it contains group info
  const emailLower = email.toLowerCase()

  // Check for group patterns in email
  const groupMatch = emailLower.match(/[._-]?g(\d+)[._-]?/) || emailLower.match(/group[._-]?(\d+)/)
  if (groupMatch) {
    const groupNum = Number.parseInt(groupMatch[1])
    if (groupNum >= 1 && groupNum <= 20) {
      return `G${groupNum}`
    }
  }

  // Check for class/section patterns
  const classMatch = emailLower.match(/[._-]?(class|section|sec)[._-]?([a-z]|\d+)/)
  if (classMatch) {
    const classId = classMatch[2].toUpperCase()
    // Convert to group number (A=1, B=2, etc.)
    if (classId.match(/[A-Z]/)) {
      const groupNum = classId.charCodeAt(0) - 64 // A=1, B=2, etc.
      if (groupNum >= 1 && groupNum <= 20) {
        return `G${groupNum}`
      }
    }
  }

  // Fallback: distribute evenly across groups based on index
  const groupNum = (index % 20) + 1
  return `G${groupNum}`
}

/* -------------------------------------------------------------------------- */
/*  INDIVIDUAL leaderboard helpers                                            */
/* -------------------------------------------------------------------------- */

/**
 * Turn a single Candidate record into a LeaderboardEntry
 */
export function transformCandidateToLeaderboardEntry(candidate: CandidateData, index: number): LeaderboardEntry {
  // Ensure candidate data is valid
  if (!candidate || typeof candidate !== "object") {
    console.warn("Invalid candidate data:", candidate)
    return createDefaultLeaderboardEntry(index)
  }

  // Convert questions object to scores array
  const scores = questionsToScoresArray(candidate.questions)

  // Use email as display name (since your API uses fullName as email)
  const fullName = candidate.email || `Participant ${index + 1}`

  // Validate and parse total score
  const totalScore = Number.parseFloat(candidate.score as any)
  const validTotalScore = isNaN(totalScore) ? 0 : Math.round(totalScore)

  // Generate group assignment from the name
  const group = generateGroup(fullName, index)

  return {
    id: index + 1,
    rank: index + 1,
    fullName,
    hackerRankId: fullName, // Use fullName as hackerRankId for display
    group,
    scores,
    totalPoints: validTotalScore,
    bonus: 0,
    energizer: 0,
  }
}

function createDefaultLeaderboardEntry(index: number): LeaderboardEntry {
  return {
    id: index + 1,
    rank: index + 1,
    fullName: `Participant ${index + 1}`,
    hackerRankId: `participant${index + 1}@example.com`,
    group: generateGroup(`participant${index + 1}@example.com`, index),
    scores: [0, 0, 0, 0, 0, 0],
    totalPoints: 0,
    bonus: 0,
    energizer: 0,
  }
}

/**
 * Convert an array of Candidates into ranked LeaderboardEntries
 */
export function transformApiDataToLeaderboard(candidates: CandidateData[]): LeaderboardEntry[] {
  if (!Array.isArray(candidates)) {
    console.warn("Invalid candidates array:", candidates)
    return []
  }

  // Filter out invalid candidates and sort by score
  const validCandidates = candidates.filter((c) => c && typeof c === "object")
  const sorted = [...validCandidates].sort((a, b) => {
    const scoreA = Number.parseFloat(a.score as any) || 0
    const scoreB = Number.parseFloat(b.score as any) || 0
    return scoreB - scoreA
  })

  return sorted.map((c, i) => transformCandidateToLeaderboardEntry(c, i))
}

/* -------------------------------------------------------------------------- */
/*  TEAM leaderboard helpers                                                  */
/* -------------------------------------------------------------------------- */

export function transformApiDataToTeams(candidates: CandidateData[]): TeamEntry[] {
  console.log("transformApiDataToTeams input:", candidates)

  if (!Array.isArray(candidates)) {
    console.warn("Invalid candidates array for teams:", candidates)
    return []
  }

  if (candidates.length === 0) {
    console.warn("Empty candidates array for teams")
    return []
  }

  // Check if this is already team data (emails contain "&")
  const isTeamData = candidates.some((c) => c.email && c.email.includes("&"))

  if (isTeamData) {
    console.log("Processing team-specific data")
    // Transform team candidates directly into team entries
    return candidates
      .map((candidate, index) => {
        const teamMembers = candidate.email.split(" & ")
        const member1Name = teamMembers[0] || `Team ${index + 1} Member 1`
        const member2Name = teamMembers[1] || `Team ${index + 1} Member 2`

        // Convert questions to scores array
        const combinedScores = questionsToScoresArray(candidate.questions)

        // Create mock team members from the team data
        const member1: LeaderboardEntry = {
          id: index * 2 + 1,
          rank: index + 1,
          fullName: member1Name,
          hackerRankId: member1Name,
          group: generateGroup(member1Name, index * 2),
          scores: combinedScores.map((score) => Math.round(score / 2)),
          totalPoints: Math.round(candidate.score / 2),
          bonus: 0,
          energizer: 0,
        }

        const member2: LeaderboardEntry = {
          id: index * 2 + 2,
          rank: index + 1,
          fullName: member2Name,
          hackerRankId: member2Name,
          group: generateGroup(member2Name, index * 2 + 1),
          scores: combinedScores.map((score) => Math.round(score / 2)),
          totalPoints: Math.round(candidate.score / 2),
          bonus: 0,
          energizer: 0,
        }

        return {
          id: index + 1,
          rank: index + 1,
          teamName: `Team ${index + 1}`,
          member1,
          member2,
          combinedScores,
          totalPoints: isNaN(candidate.score) ? 0 : Math.round(candidate.score),
        }
      })
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((team, idx) => ({ ...team, rank: idx + 1 }))
  }

  // Otherwise, treat as individual participants and pair them
  const participants = transformApiDataToLeaderboard(candidates)
  const teams: TeamEntry[] = []

  console.log("Pairing individual participants into teams:", participants.length)

  // Simple pairing: 0&1, 2&3, ...
  for (let i = 0; i < participants.length - 1; i += 2) {
    const member1 = participants[i]
    const member2 = participants[i + 1]

    if (!member1 || !member2) continue

    const combinedScores = member1.scores.map((s, idx) => {
      const score1 = isNaN(s) ? 0 : s
      const score2 = isNaN(member2.scores[idx]) ? 0 : member2.scores[idx]
      return score1 + score2
    })

    const totalPoints =
      (isNaN(member1.totalPoints) ? 0 : member1.totalPoints) + (isNaN(member2.totalPoints) ? 0 : member2.totalPoints)

    teams.push({
      id: teams.length + 1,
      rank: teams.length + 1,
      teamName: `Team ${teams.length + 1}`,
      member1,
      member2,
      combinedScores,
      totalPoints,
    })
  }

  console.log("Generated teams:", teams)

  // Sort & re-rank by total
  return teams
    .sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0))
    .map((team, idx) => ({ ...team, rank: idx + 1 }))
}

/* -------------------------------------------------------------------------- */
/*  OVERALL leaderboard helper                                                */
/* -------------------------------------------------------------------------- */

export function transformApiDataToOverall(
  round1: CandidateData[],
  round2: CandidateData[],
  team: CandidateData[],
): OverallEntry[] {
  // Validate inputs
  const validRound1 = Array.isArray(round1) ? round1 : []
  const validRound2 = Array.isArray(round2) ? round2 : []
  const validTeam = Array.isArray(team) ? team : []

  type PartialOverall = Omit<OverallEntry, "rank" | "totalPoints">
  const map = new Map<string, PartialOverall>()

  const nameFromEmail = (email: string) => {
    if (!email || typeof email !== "string") {
      return "Unknown Participant"
    }
    return email
      .split("@")[0]
      .replace(/\./g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const upsert = (source: CandidateData[], key: "round1Score" | "round2Score" | "teamScore") => {
    source.forEach((c, index) => {
      if (!c || typeof c !== "object" || !c.email) {
        console.warn("Invalid candidate in overall data:", c)
        return
      }

      const existing =
        map.get(c.email) ||
        ({
          id: map.size + 1,
          fullName: nameFromEmail(c.email),
          hackerRankId: c.email,
          group: generateGroup(c.email, index),
          round1Score: 0,
          round2Score: 0,
          teamScore: 0,
          bonus: 0,
          energizer: 0,
        } as PartialOverall)

      const score = Number.parseFloat(c.score as any)
      existing[key] = isNaN(score) ? 0 : Math.round(score)
      map.set(c.email, existing)
    })
  }

  upsert(validRound1, "round1Score")
  upsert(validRound2, "round2Score")
  upsert(validTeam, "teamScore")

  const overall: OverallEntry[] = Array.from(map.values()).map((p) => {
    const totalPoints =
      (p.round1Score || 0) + (p.round2Score || 0) + (p.teamScore || 0) + (p.bonus || 0) + (p.energizer || 0)
    return {
      ...p,
      totalPoints: isNaN(totalPoints) ? 0 : totalPoints,
    }
  })

  overall.sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0))
  overall.forEach((p, i) => (p.rank = i + 1))

  return overall
}
