import { COLORS } from "@/lib/constants"

export function OverallLeaderboardHeader() {
  return (
    <div className="hidden lg:block mb-6">
      <div className="grid grid-cols-11 gap-3 xl:gap-4">
        {/* Rank Header - 1 column */}
        <div className="col-span-1">
          <div
            className="rounded-2xl px-3 py-4 h-16 flex items-center justify-center text-white font-bold text-lg xl:text-xl"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            Rank
          </div>
        </div>

        {/* Full Name Header - 3 columns */}
        <div className="col-span-3">
          <div
            className="rounded-2xl px-4 py-4 h-16 flex items-center justify-center text-white font-bold text-lg xl:text-xl"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            Full Name
          </div>
        </div>

        {/* Group Header - 1 column */}
        <div className="col-span-1">
          <div
            className="rounded-2xl px-3 py-4 h-16 flex items-center justify-center text-white font-bold text-lg xl:text-xl"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            Group
          </div>
        </div>

        {/* Round 1 Header - 1 column */}
        <div className="col-span-1">
          <div
            className="rounded-2xl px-3 py-4 h-16 flex items-center justify-center text-white font-bold text-lg xl:text-xl"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            Round 1
          </div>
        </div>

        {/* Round 2 Header - 1 column */}
        <div className="col-span-1">
          <div
            className="rounded-2xl px-3 py-4 h-16 flex items-center justify-center text-white font-bold text-lg xl:text-xl"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            Round 2
          </div>
        </div>

        {/* Game Header - 1 column (was Bonus) */}
        <div className="col-span-1">
          <div
            className="rounded-2xl px-3 py-4 h-16 flex items-center justify-center text-white font-bold text-lg xl:text-xl"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            Game
          </div>
        </div>

        {/* Team Header - 1 column (was Game) */}
        <div className="col-span-1">
          <div
            className="rounded-2xl px-3 py-4 h-16 flex items-center justify-center text-white font-bold text-lg xl:text-xl"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            Team
          </div>
        </div>

        {/* Total Header - 2 columns */}
        <div className="col-span-2">
          <div
            className="rounded-2xl px-4 py-4 h-16 flex items-center justify-center text-white font-bold text-lg xl:text-xl"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            Total
          </div>
        </div>
      </div>
    </div>
  )
}
