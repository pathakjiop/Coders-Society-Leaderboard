import { Player } from "@/constants"

export function assignRanks(players: Player[]): (Player & { rank: number })[] {
  let currentRank = 1
  let previousScore = -1
  let offset = 0

  return players
    .sort((a, b) => b.score - a.score)
    .map((player, index) => {
      if (previousScore !== player.score) {
        currentRank = index + 1 - offset
        previousScore = player.score
      } else {
        offset++
      }
      
      return {
        ...player,
        rank: currentRank,
      }
    })
}

export function formatScore(score: number): string {
  return `${score.toLocaleString()} POINTS`
}