"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { PLAYERS } from "@/constants"
import { assignRanks, formatScore } from "@/utils/leaderboard"
import Waves from "@/Backgrounds/Waves/Waves"

export default function Leaderboard() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const leaderboardRef = useRef<HTMLDivElement>(null)
  const rankedPlayers = assignRanks(PLAYERS)

  const handleHover = (index: number) => {
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  return (
    <div
      onClick={() => setIsExpanded(true)}
      className="h-screen w-full bg-[#1a1a1a] cursor-pointer relative overflow-hidden"
      ref={leaderboardRef}
      onMouseLeave={handleMouseLeave}
    >
      <Waves
        lineColor="rgba(255, 255, 255, 0.1)"
        backgroundColor="transparent"
        waveSpeedX={0.01}
        waveSpeedY={0.005}
        waveAmpX={30}
        waveAmpY={15}
        xGap={10}
        yGap={30}
        friction={0.925}
        tension={0.005}
        maxCursorMove={100}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      />

      <div
        className={cn(
          "absolute inset-0 transition-transform duration-1000 ease-in-out",
          isExpanded ? "translate-y-[-100%]" : "translate-y-0",
        )}
        style={{ zIndex: 1 }}
      >
        <div className="h-full flex flex-col items-center justify-center p-4">
          <h1 className="text-5xl font-bold text-white mb-8">LEADERBOARD</h1>
          <div className="w-full max-w-3xl space-y-4">
            {rankedPlayers.slice(0, 3).map((player, index) => (
              <LeaderboardRow
                key={player.id}
                player={player}
                index={index}
                isActive={index === hoveredIndex}
                onHover={() => handleHover(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-0 overflow-y-auto transition-transform duration-1000 ease-in-out",
          isExpanded ? "translate-y-0" : "translate-y-[100%]",
        )}
        style={{ zIndex: 1 }}
      >
        <div className="min-h-screen">
          <div className="max-w-3xl mx-auto p-4">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Full Leaderboard</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsExpanded(false)
                }}
                className="text-white/80 hover:text-white"
              >
                Show Top 3
              </button>
            </div>

            <div className="flex items-center justify-between mb-4 text-white/80">
              <div className="flex items-center gap-2">
                <span className="w-12 ">Rank</span>
                <span>Player</span>
              </div>
              <div>
                <span>Score</span>
              </div>
            </div>
            <div className="space-y-3">
              {rankedPlayers.map((player, index) => (
                <LeaderboardRow
                  key={player.id}
                  player={player}
                  index={index}
                  isActive={index === hoveredIndex}
                  onHover={() => handleHover(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type RankedPlayer = ReturnType<typeof assignRanks>[0]

interface LeaderboardRowProps {
  player: RankedPlayer
  index: number
  isActive: boolean
  onHover: () => void
}

function LeaderboardRow({ player, index, isActive, onHover }: LeaderboardRowProps) {
  const getRankStyles = (rank: number) => {
    const styles = {
      0: "bg-gradient-to-r from-[#916c36] to-[#a17a3e] shadow-[0_0_15px_rgba(145,108,54,0.5)]",
      1: "bg-gradient-to-r from-[#4a4a4a] to-[#545454] shadow-[0_0_15px_rgba(74,74,74,0.5)]",
      2: "bg-gradient-to-r from-[#614839] to-[#6d503f] shadow-[0_0_15px_rgba(97,72,57,0.5)]",
    }
    return styles[rank as keyof typeof styles] || "bg-gradient-to-r from-[#1e1e1e] to-[#252525] shadow-[0_0_10px_rgba(30,30,30,0.3)]"
  }

  const getUnderlineColor = (rank: number) => {
    const colors = {
      0: "bg-[#ffd700]",
      1: "bg-[#c0c0c0]",
      2: "bg-[#cd7f32]",
    }
    return colors[rank as keyof typeof colors] || "bg-white"
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between p-6 rounded-xl backdrop-blur-sm",
        "transition-all duration-300 ease-out",
        getRankStyles(index),
        "border border-white/5",
        isActive && "scale-[1.02] opacity-100 shadow-lg",
        !isActive && "opacity-90 scale-100 hover:opacity-100",
        "relative overflow-hidden"
      )}
      onMouseEnter={onHover}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex items-center gap-4 relative z-10">
        <span className={cn(
          "w-12 font-semibold",
          index <= 2 ? "text-white" : "text-white/80"
        )}>
          #{player.rank}
        </span>
        <div className="group relative">
          <span className="text-white font-medium tracking-wide">{player.name}</span>
          <div className={cn(
            "absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ease-out",
            getUnderlineColor(index),
            "opacity-60"
          )} />
        </div>
      </div>
      
      <div className="relative z-10">
        <span className={cn(
          "font-medium",
          index <= 2 ? "text-white" : "text-white/80"
        )}>
          {formatScore(player.score)}
        </span>
      </div>
    </div>
  )
}