import { createClient } from "redis";

import { REDIS_HOST } from "lib/constants/routes";

let client: ReturnType<typeof createClient>;

export async function getRedisClient() {
  if (!client) {
    client = createClient({
      socket: {
        port: 6379,
        host: REDIS_HOST,
      },
      password: process.env.REDIS_PASSWORD,
    });
    await client.connect();
    console.log("connected to redis");
  }
  return client;
}

const UserKeyParams = {
  walletAddress: "walletAddress",
  team: "team",
  twitterHandle: "twitterHandle",
  notifyMe: "notifyMe",
};

export async function getUserWalletAndTeam(twitterHandle: string) {
  const redisClient = await getRedisClient();
  const team = await redisClient.hGet(twitterHandle, UserKeyParams.team);
  const walletAddress = await redisClient.hGet(
    twitterHandle,
    UserKeyParams.walletAddress
  );
  return { team, walletAddress };
}

export function getLeaderBoardKey(game: string, tournament: string) {
  return `leaderBoard:${game}:${tournament}`;
}

export async function setLeaderScore({
  game,
  score,
  tournament,
  userId,
  walletAddress,
  team,
}: {
  game: string;
  tournament: string;
  userId: string;
  walletAddress: string;
  score: number;
  team?: string;
}) {
  const leaderBoardKey = getLeaderBoardKey(game, tournament);
  const redisClient = await getRedisClient();
  const result1 = redisClient.hSet(
    userId,
    UserKeyParams.walletAddress,
    walletAddress
  );
  const result2 = redisClient.hSet(userId, UserKeyParams.team, team || "");
  await Promise.all([result1, result2]);
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
  const detailsResp = getUserWalletAndTeam(userId);

  const [rank, score, details] = await Promise.all([
    rankResp,
    scoreResp,
    detailsResp,
  ]);
  return { rank, score: score[0], ...details };
}

export async function getTopXScores(
  game: string,
  tournament: string,
  topX: number
) {
  const leaderBoardKey = getLeaderBoardKey(game, tournament);
  const results = await (
    await getRedisClient()
  ).zRangeWithScores(leaderBoardKey, 0, topX, {
    REV: true,
  });
  const toAwait = results.map(
    async (result: { score: number; value: string }) => {
      const details = await getUserWalletAndTeam(result.value);
      return { ...result, ...details };
    }
  );
  return Promise.all(toAwait);
}

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
  return (await getRedisClient()).hSet(
    userKey,
    UserKeyParams.twitterHandle,
    handle
  );
}

export async function setNotifyMe(walletAddress: string, notifyMe: boolean) {
  const userKey = getUserKey(walletAddress);
  return (await getRedisClient()).hSet(
    userKey,
    UserKeyParams.notifyMe,
    notifyMe ? "true" : ""
  );
}

export async function isNewUser(walletAddress: string) {
  const twitterHandle = await getUserTwitterHandle(walletAddress);
  return !twitterHandle;
}
