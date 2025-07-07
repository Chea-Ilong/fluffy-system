import { COLORS } from "@/lib/constants"

export function TeamLeaderboardHeader() {
  return (
    <div className="hidden lg:block mb-6 lg:mb-8">
      <div className="flex gap-3 xl:gap-4">
        {/* Rank Header */}
        <div className="flex-shrink-0 w-20 xl:w-24">
          <div
            className="rounded-2xl px-4 py-3 xl:py-4 text-center h-14 xl:h-16 flex items-center justify-center text-white font-bold text-base xl:text-lg"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            Rank
          </div>
        </div>

        {/* Team Name Header */}
        <div className="flex-shrink-0 w-48 xl:w-56">
          <div
            className="rounded-2xl px-4 py-3 xl:py-4 text-center h-14 xl:h-16 flex items-center justify-center text-white font-bold text-base xl:text-lg"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            Team Name
          </div>
        </div>

        {/* Team Members Header */}
        <div className="flex-1 min-w-0">
          <div
            className="rounded-2xl px-4 py-3 xl:py-4 text-center h-14 xl:h-16 flex items-center justify-center text-white font-bold text-base xl:text-lg"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            Team Members
          </div>
        </div>

        {/* Combined Scores Header */}
        <div className="flex-shrink-0 w-80 xl:w-96">
          <div className="bg-white rounded-2xl px-2 py-1 h-14 xl:h-16 flex flex-col justify-center">
            <div className="font-bold text-base xl:text-lg text-center mb-1" style={{ color: COLORS.SECONDARY }}>
              Combined Scores
            </div>
            <div className="rounded-lg overflow-hidden" style={{ backgroundColor: COLORS.PRIMARY }}>
              <div className="grid grid-cols-6 h-6">
                {["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"].map((question) => (
                  <div
                    key={question}
                    className="flex items-center justify-center text-white font-bold text-xs xl:text-sm border-r border-white/20 last:border-r-0"
                  >
                    {question}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Total Header */}
        <div className="flex-shrink-0 w-24 xl:w-28">
          <div
            className="rounded-2xl px-4 py-3 xl:py-4 text-center h-14 xl:h-16 flex items-center justify-center text-white font-bold text-base xl:text-lg"
            style={{ backgroundColor: COLORS.PRIMARY }}
          >
            Total
          </div>
        </div>
      </div>
    </div>
  )
}
