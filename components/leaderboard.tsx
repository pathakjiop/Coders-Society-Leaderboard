"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { PLAYERS } from "@/constants";
import { assignRanks, formatScore } from "@/utils/leaderboard";
import Waves from "@/Backgrounds/Waves/Waves";

export default function Leaderboard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const leaderboardRef = useRef<HTMLDivElement>(null);
  const rankedPlayers = assignRanks(PLAYERS);

  // Handle hover events
  const handleHover = (index: number) => {
    setHoveredIndex(index);
  };

  // Reset hover effect when mouse leaves the leaderboard
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div
      onClick={() => setIsExpanded(true)}
      className="min-h-screen w-full bg-[#1a1a1a] cursor-pointer relative overflow-hidden"
      ref={leaderboardRef}
      onMouseLeave={handleMouseLeave}
    >
      {/* Waves Background */}
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

      {/* Initial view with forest background */}
      <div
        className={cn(
          "fixed inset-0 transition-transform duration-1000 ease-in-out",
          isExpanded ? "translate-y-[-100%]" : "translate-y-0",
        )}
        style={{ zIndex: 1 }}
      >
        <div className="h-full flex flex-col items-center justify-center p-4">
          <h1 className="text-5xl font-bold text-white mb-8">GAME LEADERBOARD</h1>
          <div className="w-full max-w-3xl space-y-2">
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

      {/* Full leaderboard view */}
      <div
        className={cn(
          "min-h-screen w-full transition-transform duration-1000 ease-in-out",
          isExpanded ? "translate-y-0" : "translate-y-[100%]",
        )}
        style={{ zIndex: 1 }}
      >
        <div className="max-w-3xl mx-auto p-4">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Full Leaderboard</h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="text-white/80 hover:text-white"
            >
              Show Top 3
            </button>
          </div>

          <div className="flex items-center justify-between mb-4 text-white/80">
            <div className="flex items-center gap-2">
              <span className="w-12">Rank</span>
              <span>Player</span>
            </div>
            <div>
              <span>Score</span>
            </div>
          </div>
          <div className="space-y-[2px]">
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
  );
}

type RankedPlayer = ReturnType<typeof assignRanks>[0];

interface LeaderboardRowProps {
  player: RankedPlayer;
  index: number;
  isActive: boolean;
  onHover: () => void;
}

function LeaderboardRow({ player, index, isActive, onHover }: LeaderboardRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded transition-all duration-500 ease-in-out",
        index === 0 && "bg-[#916c36] hover:bg-[#a17a3e]",
        index === 1 && "bg-[#4a4a4a] hover:bg-[#545454]",
        index === 2 && "bg-[#614839] hover:bg-[#6d503f]",
        index > 2 && "bg-[#1e1e1e] hover:bg-[#252525]",
        isActive && "scale-105 opacity-100",
        !isActive && "opacity-80 scale-100" // Make rows readable even when not hovered
      )}
      onMouseEnter={onHover}
    >
      <div className="flex items-center gap-4">
        <span className="w-12 text-white/80">#{player.rank}</span>
        <span className="text-white font-medium">{player.name}</span>
      </div>
      <div>
        <span className="text-white/80">{formatScore(player.score)}</span>
      </div>
    </div>
  );
}