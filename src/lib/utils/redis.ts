import { createClient } from "redis";

let client: ReturnType<typeof createClient>;

export function getRedisClient() {
  if (!client) {
    client = createClient({
      url:
        process.env.NEXT_PUBLIC_NDOE_ENV === "development"
          ? "localhost:6379"
          : "srv-captain--curd-casino-redis ",
    });
  }
  return client;
}

export function getLeaderBoardKey(game: string, tournament: string) {
  return `leaderBoard:${game}:${tournament}`;
}

export async function setLeaderScore(
  leaderBoardKey: string,
  userId: string,
  score: number
) {
  return getRedisClient().zAdd(leaderBoardKey, [{ score, value: userId }], {
    GT: true,
  });
}

export async function getTopXScores(leaderBoardKey: string, topX: number) {
  return getRedisClient().zRange(leaderBoardKey, 0, topX, {
    REV: true,
  });
}
