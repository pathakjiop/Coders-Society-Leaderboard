
// components/LeaderboardRow.tsx
import { cn } from "@/lib/utils";
import { PlayerProfile } from './PlayerProfile';
import { formatScore } from '../utils/leaderboard';
import { Player } from '../types/player';

interface LeaderboardRowProps {
  player: Player & { rank: number };
  index: number;
  isActive: boolean;
  onHover: () => void;
}

export function LeaderboardRow({ player, index, isActive, onHover }: LeaderboardRowProps) {
  const getRankStyles = (rank: number) => {
    const styles = {
      0: "bg-gradient-to-r from-[#916c36] to-[#a17a3e] shadow-[0_0_15px_rgba(145,108,54,0.5)]",
      1: "bg-gradient-to-r from-[#4a4a4a] to-[#545454] shadow-[0_0_15px_rgba(74,74,74,0.5)]",
      2: "bg-gradient-to-r from-[#614839] to-[#6d503f] shadow-[0_0_15px_rgba(97,72,57,0.5)]",
    }
    return styles[rank as keyof typeof styles] || "bg-gradient-to-r from-[#1e1e1e] to-[#252525] shadow-[0_0_10px_rgba(30,30,30,0.3)]"
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
        <span className="text-white font-medium tracking-wide">{player.name}</span>
      </div>
      
      <div className="flex items-center gap-4 relative z-10">
        <PlayerProfile player={player} />
        <span className={cn(
          "font-medium w-16 text-right",
          index <= 2 ? "text-white" : "text-white/80"
        )}>
          {formatScore(player.score)}
        </span>
      </div>
    </div>
  );
}
