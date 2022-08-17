import { createClient } from "redis";

let client: ReturnType<typeof createClient>;

export async function getRedisClient() {
  if (!client) {
    client = createClient({
      socket: {
        port: 6379,
        host:
          process.env.NEXT_PUBLIC_NODE_ENV === "development"
            ? "localhost"
            : "srv-captain--curd-casino-redis ",
      },
    });
    await client.connect();
    console.log("connected to redis");
  }
  return client;
}

export const GAME = "flap-space";
export const TOURNAMENT = "n&w-buildspace";
export function getLeaderBoardKey(game: string, tournament: string) {
  return `leaderBoard:${game}:${tournament}`;
}

export async function setLeaderScore(
  game: string,
  tournament: string,
  userId: string,
  score: number
) {
  const leaderBoardKey = getLeaderBoardKey(game, tournament);
  return (await getRedisClient()).zAdd(
    leaderBoardKey,
    [{ score, value: userId }],
    {
      GT: true,
    }
  );
}

export async function getUserScoreAndRank(
  game: string,
  tournament: string,
  userId: string
) {
  const leaderBoardKey = getLeaderBoardKey(game, tournament);
  const redisClient = await getRedisClient();
  const rankResp = redisClient.zRevRank(leaderBoardKey, userId);
  const scoreResp = redisClient.zmScore(leaderBoardKey, userId);
  const [rank, score] = await Promise.all([rankResp, scoreResp]);
  return { rank, score: score[0] };
}

export async function getTopXScores(
  game: string,
  tournament: string,
  topX: number
) {
  const leaderBoardKey = getLeaderBoardKey(game, tournament);
  return (await getRedisClient()).zRangeWithScores(leaderBoardKey, 0, topX, {
    REV: true,
  });
}

const UserKeyParams = {
  twitterHandle: "twitterHandle",
};

export function getUserKey(walletAddress: string) {
  return `user:${walletAddress}`;
}

export async function getUserTwitterHandle(walletAddress: string) {
  const userKey = getUserKey(walletAddress);
  return (await getRedisClient()).hGet(userKey, UserKeyParams.twitterHandle);
}

export async function setUserTwitterHandle(
  walletAddress: string,
  handle: string
) {
  const userKey = getUserKey(walletAddress);
  return (await getRedisClient()).hSet(userKey, "twitterHandle", handle);
}

export async function setNotifyMe(walletAddress: string, notifyMe: boolean) {
  const userKey = getUserKey(walletAddress);
  return (await getRedisClient()).hSet(
    userKey,
    "notifyMe",
    notifyMe ? "true" : ""
  );
}

export async function isNewUser(walletAddress: string) {
  const twitterHandle = await getUserTwitterHandle(walletAddress);
  return !twitterHandle;
}
