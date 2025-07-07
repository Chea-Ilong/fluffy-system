"use client"

import axios from "axios"

function emailToFullName(email: string): string {
  const localPart = email.split("@")[0]
  const parts = localPart.split(".")

  const capitalized = parts.map((word) => word.charAt(0).toUpperCase() + word.slice(1))

  return capitalized.reverse().join(" ")
}

type Participant = {
  email: string
  group?: number
}

type APIEntry = {
  email: string
  score: number
  questions: Record<string, number>
}

export interface CandidateData {
  email: string
  score: number
  questions: Record<string, number>
}

export interface ApiResponse {
  data: CandidateData[]
  totalCount?: number
  hasMore?: boolean
}

// Define the standard question order mapping with specific IDs
export const QUESTION_ID_MAPPING = {
  problem_1: 0, // Algorithm Problem 1
  problem_2: 1, // Algorithm Problem 2
  problem_3: 2, // Data Structure Problem
  problem_4: 3, // Dynamic Programming
  problem_5: 4, // Graph Theory
  problem_6: 5, // Advanced Problem
  // Legacy support for old IDs
  "2095148": 0,
  "2095248": 1,
  "2097662": 2,
  "2127626": 3,
  "2114046": 4,
  "2114049": 5,
}

// Updated question IDs for easier reference
export const QUESTION_IDS = ["problem_1", "problem_2", "problem_3", "problem_4", "problem_5", "problem_6"]

// Question labels for display
export const QUESTION_LABELS = [
  "Algorithm 1",
  "Algorithm 2",
  "Data Structure",
  "Dynamic Programming",
  "Graph Theory",
  "Advanced Problem",
]

// Mock data that matches your exact structure - EXPANDED WITH MORE PARTICIPANTS
const MOCK_ROUND_1_DATA = [
  {
    fullName: "John Doe",
    group: 1,
    questions: {
      problem_1: 25,
      problem_2: 10,
      problem_3: 15,
      problem_4: 20,
      problem_5: 8,
      problem_6: 12,
    },
    totalScore: 90,
  },
  {
    fullName: "Jane Smith",
    group: 2,
    questions: {
      problem_1: 30,
      problem_2: 15,
      problem_3: 20,
      problem_4: 25,
      problem_5: 10,
      problem_6: 12,
    },
    totalScore: 115,
  },
  {
    fullName: "Alice Johnson",
    group: 1,
    questions: {
      problem_1: 20,
      problem_2: 8,
      problem_3: 12,
      problem_4: 18,
      problem_5: 5,
    },
    totalScore: 63,
  },
  {
    fullName: "Bob Wilson",
    group: 3,
    questions: {
      problem_1: 35,
      problem_2: 20,
      problem_3: 25,
      problem_4: 30,
      problem_5: 15,
      problem_6: 20,
    },
    totalScore: 145,
  },
  {
    fullName: "Carol Brown",
    group: 2,
    questions: {
      problem_1: 15,
      problem_2: 5,
      problem_3: 8,
      problem_4: 12,
    },
    totalScore: 40,
  },
  {
    fullName: "David Lee",
    group: 4,
    questions: {
      problem_1: 28,
      problem_2: 12,
      problem_3: 18,
      problem_4: 22,
      problem_5: 9,
      problem_6: 16,
    },
    totalScore: 105,
  },
  {
    fullName: "Emma Davis",
    group: 1,
    questions: {
      problem_1: 32,
      problem_2: 18,
      problem_3: 22,
      problem_4: 28,
      problem_5: 14,
      problem_6: 18,
    },
    totalScore: 132,
  },
  {
    fullName: "Frank Miller",
    group: 3,
    questions: {
      problem_1: 22,
      problem_2: 9,
      problem_3: 14,
      problem_4: 19,
      problem_5: 7,
      problem_6: 11,
    },
    totalScore: 82,
  },
  {
    fullName: "Grace Chen",
    group: 2,
    questions: {
      problem_1: 38,
      problem_2: 22,
      problem_3: 28,
      problem_4: 32,
      problem_5: 16,
      problem_6: 22,
    },
    totalScore: 158,
  },
  {
    fullName: "Henry Taylor",
    group: 4,
    questions: {
      problem_1: 26,
      problem_2: 11,
      problem_3: 16,
      problem_4: 21,
      problem_5: 8,
      problem_6: 13,
    },
    totalScore: 95,
  },
  {
    fullName: "Ivy Rodriguez",
    group: 1,
    questions: {
      problem_1: 29,
      problem_2: 14,
      problem_3: 19,
      problem_4: 24,
      problem_5: 11,
      problem_6: 15,
    },
    totalScore: 112,
  },
  {
    fullName: "Jack Anderson",
    group: 3,
    questions: {
      problem_1: 24,
      problem_2: 10,
      problem_3: 15,
      problem_4: 20,
      problem_5: 8,
      problem_6: 12,
    },
    totalScore: 89,
  },
  {
    fullName: "Kelly White",
    group: 2,
    questions: {
      problem_1: 33,
      problem_2: 17,
      problem_3: 23,
      problem_4: 27,
      problem_5: 13,
      problem_6: 19,
    },
    totalScore: 132,
  },
  {
    fullName: "Leo Garcia",
    group: 4,
    questions: {
      problem_1: 21,
      problem_2: 8,
      problem_3: 13,
      problem_4: 17,
      problem_5: 6,
      problem_6: 10,
    },
    totalScore: 75,
  },
  {
    fullName: "Maya Patel",
    group: 1,
    questions: {
      problem_1: 36,
      problem_2: 20,
      problem_3: 26,
      problem_4: 31,
      problem_5: 15,
      problem_6: 21,
    },
    totalScore: 149,
  },
]

const MOCK_ROUND_2_DATA = [
  {
    fullName: "John Doe",
    group: 1,
    questions: {
      problem_1: 30,
      problem_3: 18,
      problem_4: 22,
      problem_5: 10,
      problem_6: 15,
    },
    totalScore: 107,
  },
  {
    fullName: "Jane Smith",
    group: 2,
    questions: {
      problem_1: 35,
      problem_2: 18,
      problem_3: 25,
      problem_4: 28,
      problem_5: 12,
      problem_6: 18,
    },
    totalScore: 136,
  },
  {
    fullName: "Alice Johnson",
    group: 1,
    questions: {
      problem_1: 25,
      problem_2: 10,
      problem_3: 15,
      problem_4: 20,
      problem_5: 8,
    },
    totalScore: 78,
  },
  {
    fullName: "Bob Wilson",
    group: 3,
    questions: {
      problem_1: 40,
      problem_3: 30,
      problem_4: 35,
      problem_5: 18,
      problem_6: 25,
    },
    totalScore: 173,
  },
  {
    fullName: "Carol Brown",
    group: 2,
    questions: {
      problem_1: 18,
      problem_2: 8,
      problem_3: 10,
      problem_4: 15,
    },
    totalScore: 51,
  },
  {
    fullName: "David Lee",
    group: 4,
    questions: {
      problem_1: 28,
      problem_2: 15,
      problem_3: 20,
      problem_4: 25,
      problem_5: 12,
    },
    totalScore: 100,
  },
  {
    fullName: "Emma Davis",
    group: 1,
    questions: {
      problem_1: 38,
      problem_2: 20,
      problem_3: 28,
      problem_4: 32,
      problem_5: 16,
      problem_6: 22,
    },
    totalScore: 156,
  },
  {
    fullName: "Frank Miller",
    group: 3,
    questions: {
      problem_1: 26,
      problem_2: 12,
      problem_3: 18,
      problem_4: 23,
      problem_5: 9,
      problem_6: 14,
    },
    totalScore: 102,
  },
  {
    fullName: "Grace Chen",
    group: 2,
    questions: {
      problem_1: 42,
      problem_2: 25,
      problem_3: 32,
      problem_4: 38,
      problem_5: 19,
      problem_6: 26,
    },
    totalScore: 182,
  },
  {
    fullName: "Henry Taylor",
    group: 4,
    questions: {
      problem_1: 31,
      problem_2: 14,
      problem_3: 21,
      problem_4: 26,
      problem_5: 11,
      problem_6: 17,
    },
    totalScore: 120,
  },
  {
    fullName: "Ivy Rodriguez",
    group: 1,
    questions: {
      problem_1: 34,
      problem_2: 17,
      problem_3: 24,
      problem_4: 29,
      problem_5: 13,
      problem_6: 19,
    },
    totalScore: 136,
  },
  {
    fullName: "Jack Anderson",
    group: 3,
    questions: {
      problem_1: 29,
      problem_2: 13,
      problem_3: 19,
      problem_4: 24,
      problem_5: 10,
      problem_6: 15,
    },
    totalScore: 110,
  },
  {
    fullName: "Kelly White",
    group: 2,
    questions: {
      problem_1: 37,
      problem_2: 19,
      problem_3: 27,
      problem_4: 31,
      problem_5: 15,
      problem_6: 21,
    },
    totalScore: 150,
  },
  {
    fullName: "Leo Garcia",
    group: 4,
    questions: {
      problem_1: 24,
      problem_2: 10,
      problem_3: 16,
      problem_4: 21,
      problem_5: 8,
      problem_6: 12,
    },
    totalScore: 91,
  },
  {
    fullName: "Maya Patel",
    group: 1,
    questions: {
      problem_1: 41,
      problem_2: 23,
      problem_3: 30,
      problem_4: 36,
      problem_5: 17,
      problem_6: 24,
    },
    totalScore: 171,
  },
]

const MOCK_TEAM_DATA = [
  {
    fullNameMember1: "John Doe",
    fullNameMember2: "Alice Johnson",
    questions: {
      problem_1: 45,
      problem_2: 22,
      problem_3: 30,
      problem_4: 38,
      problem_5: 16,
      problem_6: 27,
    },
    totalScore: 178,
  },
  {
    fullNameMember1: "Jane Smith",
    fullNameMember2: "Carol Brown",
    questions: {
      problem_1: 48,
      problem_2: 23,
      problem_3: 35,
      problem_4: 40,
      problem_5: 18,
      problem_6: 30,
    },
    totalScore: 194,
  },
  {
    fullNameMember1: "Bob Wilson",
    fullNameMember2: "David Lee",
    questions: {
      problem_1: 63,
      problem_2: 40,
      problem_3: 50,
      problem_4: 60,
      problem_5: 30,
      problem_6: 45,
    },
    totalScore: 288,
  },
  {
    fullNameMember1: "Emma Davis",
    fullNameMember2: "Frank Miller",
    questions: {
      problem_1: 52,
      problem_2: 28,
      problem_3: 38,
      problem_4: 45,
      problem_5: 21,
      problem_6: 32,
    },
    totalScore: 216,
  },
  {
    fullNameMember1: "Grace Chen",
    fullNameMember2: "Henry Taylor",
    questions: {
      problem_1: 65,
      problem_2: 42,
      problem_3: 55,
      problem_4: 68,
      problem_5: 32,
      problem_6: 48,
    },
    totalScore: 310,
  },
  {
    fullNameMember1: "Ivy Rodriguez",
    fullNameMember2: "Jack Anderson",
    questions: {
      problem_1: 49,
      problem_2: 25,
      problem_3: 34,
      problem_4: 41,
      problem_5: 18,
      problem_6: 28,
    },
    totalScore: 195,
  },
  {
    fullNameMember1: "Kelly White",
    fullNameMember2: "Leo Garcia",
    questions: {
      problem_1: 46,
      problem_2: 24,
      problem_3: 32,
      problem_4: 38,
      problem_5: 17,
      problem_6: 26,
    },
    totalScore: 183,
  },
  {
    fullNameMember1: "Maya Patel",
    fullNameMember2: "John Doe",
    questions: {
      problem_1: 58,
      problem_2: 35,
      problem_3: 45,
      problem_4: 52,
      problem_5: 26,
      problem_6: 39,
    },
    totalScore: 255,
  },
]

const MOCK_OVERALL_DATA = [
  {
    fullName: "Grace Chen",
    group: 2,
    round1: 158,
    round2: 182,
    teamScore: 310,
    bonusScore: 45,
    totalScore: 695,
  },
  {
    fullName: "Bob Wilson",
    group: 3,
    round1: 145,
    round2: 173,
    teamScore: 288,
    bonusScore: 40,
    totalScore: 646,
  },
  {
    fullName: "Maya Patel",
    group: 1,
    round1: 149,
    round2: 171,
    teamScore: 255,
    bonusScore: 35,
    totalScore: 610,
  },
  {
    fullName: "Jane Smith",
    group: 2,
    round1: 115,
    round2: 136,
    teamScore: 194,
    bonusScore: 30,
    totalScore: 475,
  },
  {
    fullName: "Emma Davis",
    group: 1,
    round1: 132,
    round2: 156,
    teamScore: 216,
    bonusScore: 28,
    totalScore: 532,
  },
  {
    fullName: "Henry Taylor",
    group: 4,
    round1: 95,
    round2: 120,
    teamScore: 310,
    bonusScore: 25,
    totalScore: 550,
  },
  {
    fullName: "Kelly White",
    group: 2,
    round1: 132,
    round2: 150,
    teamScore: 183,
    bonusScore: 22,
    totalScore: 487,
  },
  {
    fullName: "Ivy Rodriguez",
    group: 1,
    round1: 112,
    round2: 136,
    teamScore: 195,
    bonusScore: 20,
    totalScore: 463,
  },
  {
    fullName: "John Doe",
    group: 1,
    round1: 90,
    round2: 107,
    teamScore: 178,
    bonusScore: 25,
    totalScore: 400,
  },
  {
    fullName: "David Lee",
    group: 4,
    round1: 105,
    round2: 100,
    teamScore: 288,
    bonusScore: 20,
    totalScore: 513,
  },
  {
    fullName: "Jack Anderson",
    group: 3,
    round1: 89,
    round2: 110,
    teamScore: 195,
    bonusScore: 18,
    totalScore: 412,
  },
  {
    fullName: "Alice Johnson",
    group: 1,
    round1: 63,
    round2: 78,
    teamScore: 178,
    bonusScore: 15,
    totalScore: 334,
  },
  {
    fullName: "Frank Miller",
    group: 3,
    round1: 82,
    round2: 102,
    teamScore: 216,
    bonusScore: 16,
    totalScore: 416,
  },
  {
    fullName: "Carol Brown",
    group: 2,
    round1: 40,
    round2: 51,
    teamScore: 194,
    bonusScore: 10,
    totalScore: 295,
  },
  {
    fullName: "Leo Garcia",
    group: 4,
    round1: 75,
    round2: 91,
    teamScore: 183,
    bonusScore: 12,
    totalScore: 361,
  },
]

// Check if we should use mock data
const USE_MOCK_DATA =
  process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true" ||
  !process.env.NEXT_PUBLIC_TOKEN ||
  !process.env.NEXT_PUBLIC_HACKERRANK_ROUND1_URL ||
  !process.env.NEXT_PUBLIC_HACKERRANK_ROUND2_URL ||
  !process.env.NEXT_PUBLIC_HACKERRANK_ROUND_TEAM_URL ||
  !process.env.NEXT_PUBLIC_FIREBASE_URL

export async function getAllParticipantIndividualRoundOne() {
  if (USE_MOCK_DATA) {
    console.log("Using Round 1 mock data")
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

    // Debug: Log the questions structure
    console.log(
      "Mock data questions structure:",
      MOCK_ROUND_1_DATA.map((p) => ({
        name: p.fullName,
        questions: p.questions,
        questionCount: Object.keys(p.questions).length,
      })),
    )

    return MOCK_ROUND_1_DATA
  }

  const response = await axios.get(process.env.NEXT_PUBLIC_HACKERRANK_ROUND1_URL!, {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
  })

  const apiData: APIEntry[] = response.data.data

  const firebaseResponse = await axios.get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/participants.json`)
  const firebaseList: Participant[] = Object.values(firebaseResponse.data || {})

  const result = apiData.map((item) => {
    const match = firebaseList.find((p) => p.email === item.email)

    // Debug: Log questions for each participant
    console.log(`Participant ${emailToFullName(item.email)} questions:`, item.questions)

    return {
      fullName: emailToFullName(item.email),
      group: match?.group || 0,
      questions: item.questions,
      totalScore: item.score || 0,
    }
  })

  return result
}

export async function getAllParticipantIndividualRoundTwo() {
  if (USE_MOCK_DATA) {
    console.log("Using Round 2 mock data")
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
    return MOCK_ROUND_2_DATA
  }

  const response = await axios.get(process.env.NEXT_PUBLIC_HACKERRANK_ROUND2_URL!, {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
  })

  const apiData: APIEntry[] = response.data.data

  const firebaseResponse = await axios.get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/participants.json`)
  const firebaseList: Participant[] = Object.values(firebaseResponse.data || {})

  return apiData.map((item) => {
    const match = firebaseList.find((p) => p.email === item.email)
    return {
      fullName: emailToFullName(item.email),
      group: match?.group || 0,
      questions: item.questions,
      totalScore: item.score || 0,
    }
  })
}

export async function getAllParticipantTeamRound() {
  if (USE_MOCK_DATA) {
    console.log("Using Team mock data")
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
    return MOCK_TEAM_DATA
  }

  const response = await axios.get(process.env.NEXT_PUBLIC_HACKERRANK_ROUND_TEAM_URL!, {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
  })

  const apiData: APIEntry[] = response.data.data

  const scoreMap = new Map<string, { score: number; questions: any }>()
  for (const item of apiData) {
    if (item.email && item.score != null) {
      scoreMap.set(item.email, {
        score: item.score,
        questions: item.questions,
      })
    }
  }

  const firebaseResponseTeam = await axios.get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/teams.json`)
  const firebaseTeamList: any[] = Object.values(firebaseResponseTeam.data || {})

  const results: {
    fullNameMember1: string
    fullNameMember2: string
    questions: Record<string, number>
    totalScore: number
  }[] = []

  for (const team of firebaseTeamList) {
    const m1 = team.member_1_email
    const m2 = team.member_2_email

    const m1Score = scoreMap.get(m1)
    const m2Score = scoreMap.get(m2)

    const finalScore = m1Score?.score ?? m2Score?.score ?? 0
    const finalQuestions = m1Score?.questions ?? m2Score?.questions ?? {}

    results.push({
      fullNameMember1: emailToFullName(m1),
      fullNameMember2: emailToFullName(m2),
      questions: finalQuestions,
      totalScore: finalScore,
    })
  }

  return results
}

export async function getAllParticipantOverall() {
  if (USE_MOCK_DATA) {
    console.log("Using Overall mock data")
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
    return MOCK_OVERALL_DATA
  }

  const [round1, round2, teamRound, participantsRes, gamesRes] = await Promise.all([
    getAllParticipantIndividualRoundOne(),
    getAllParticipantIndividualRoundTwo(),
    getAllParticipantTeamRound(),
    axios.get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/participants.json`),
    axios.get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/games.json`),
  ])

  const participants: Participant[] = Object.values(participantsRes.data || {})
  const games: any[] = Object.values(gamesRes.data || {})

  // Map round scores by full name
  const round1Map = new Map<string, number>()
  round1.forEach((p) => round1Map.set(p.fullName, p.totalScore))

  const round2Map = new Map<string, number>()
  round2.forEach((p) => round2Map.set(p.fullName, p.totalScore))

  // Map team scores by full name
  const teamScoreMap = new Map<string, number>()
  teamRound.forEach((team) => {
    teamScoreMap.set(team.fullNameMember1, team.totalScore)
    teamScoreMap.set(team.fullNameMember2, team.totalScore)
  })

  // Map bonus score from games by email
  const bonusScoreMap = new Map<string, number>()
  for (const game of games) {
    const members = [game.member_1_email, game.member_2_email, game.member_3_email, game.member_4_email]
    for (const email of members) {
      if (email) {
        bonusScoreMap.set(email, game.score || 0)
      }
    }
  }

  const results = participants.map((p) => {
    const email = p.email
    const fullName = emailToFullName(email)
    const group = p.group || 0

    const round1Score = round1Map.get(fullName) || 0
    const round2Score = round2Map.get(fullName) || 0
    const teamScore = teamScoreMap.get(fullName) || 0
    const bonusScore = bonusScoreMap.get(email) || 0

    const totalScore = round1Score + round2Score + teamScore + bonusScore

    return {
      fullName,
      group,
      round1: round1Score,
      round2: round2Score,
      teamScore,
      bonusScore,
      totalScore,
    }
  })

  return results
}

// API adapter functions for backward compatibility
export async function fetchRound1Data(): Promise<CandidateData[]> {
  try {
    const data = await getAllParticipantIndividualRoundOne()
    return data.map((item) => ({
      email: item.fullName,
      score: item.totalScore,
      questions: item.questions,
    }))
  } catch (error) {
    console.error("Error fetching Round 1 data:", error)
    throw new Error("Failed to fetch Round 1 data")
  }
}

export async function fetchRound2Data(): Promise<CandidateData[]> {
  try {
    const data = await getAllParticipantIndividualRoundTwo()
    return data.map((item) => ({
      email: item.fullName,
      score: item.totalScore,
      questions: item.questions,
    }))
  } catch (error) {
    console.error("Error fetching Round 2 data:", error)
    throw new Error("Failed to fetch Round 2 data")
  }
}

export async function fetchTeamLeaderboardData(): Promise<CandidateData[]> {
  try {
    const data = await getAllParticipantTeamRound()
    return data.map((team) => ({
      email: `${team.fullNameMember1} & ${team.fullNameMember2}`,
      score: team.totalScore,
      questions: team.questions,
    }))
  } catch (error) {
    console.error("Error fetching team leaderboard data:", error)
    throw new Error("Failed to fetch team leaderboard data")
  }
}

// Legacy functions for backward compatibility
export async function fetchLeaderboardData(): Promise<CandidateData[]> {
  return await fetchRound1Data()
}

export async function testRound1(): Promise<ApiResponse> {
  const data = await fetchRound1Data()
  return { data, totalCount: data.length, hasMore: false }
}

export async function testRound2(): Promise<ApiResponse> {
  const data = await fetchRound2Data()
  return { data, totalCount: data.length, hasMore: false }
}

export async function testTeam(): Promise<ApiResponse> {
  const data = await fetchTeamLeaderboardData()
  return { data, totalCount: data.length, hasMore: false }
}

export async function test(): Promise<ApiResponse> {
  return await testRound1()
}
