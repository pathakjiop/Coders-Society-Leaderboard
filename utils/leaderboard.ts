import { Player } from "@/types/player";

export function assignRanks(players: Player[]) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  let currentRank = 1;
  let previousScore = sortedPlayers[0]?.score;

  return sortedPlayers.map((player, index) => {
    if (player.score < previousScore) {
      currentRank = index + 1;
      previousScore = player.score;
    }
    return { ...player, rank: currentRank };
  });
}

export function formatScore(score: number) {
  return score.toLocaleString();
}
