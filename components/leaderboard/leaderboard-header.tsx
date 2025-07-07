interface LeaderboardHeaderProps {
  title: string
  subtitle: string
}

export function LeaderboardHeader({ title, subtitle }: LeaderboardHeaderProps) {
  return (
    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
      <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
        CADT Freshman Coding Competition
      </h1>
      {/* <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 font-medium mb-4 sm:mb-6">
        {title} - {subtitle}
      </p> */}

      {/* Status Indicators */}
      {/* <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-gray-500 text-sm sm:text-base">
        <div className="flex items-center bg-white rounded-full px-3 sm:px-4 py-2 shadow-md">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          <span className="font-medium">Live Updates</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">12 Participants</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">Round 1 Active</span>
        </div>
      </div> */}

      {/* <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-6 sm:mt-8 rounded-full"></div> */}
    </div>
  )
}
