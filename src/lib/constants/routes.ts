import type { AvailableGames } from "services/games";

export const BASE_URL =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://curdinc.com";

export const REDIS_HOST =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? "localhost"
    : "srv-captain--curd-casino-redis";

export const CASHIER = `${BASE_URL}/cashier`;

export const POLYGON_SCAN_TRANSACTION = (txHash: string) =>
  `https://polygonscan.com/tx/${txHash}`;

export const DISCORD_LINK = "https://discord.com/invite/qTP3czz9pE";
export const TWITTER_LINK = "https://twitter.com/curd_inc";

export const ROUTE_TOURNAMENT_PAGE = (tournamentName: string) => {
  return `${BASE_URL}/tournament/${encodeURIComponent(tournamentName)}`;
};
export const ROUTE_LOGIN_PAGE = (redirectTo: string) => {
  return `${BASE_URL}/login?redirect=${encodeURIComponent(redirectTo)}`;
};
export const ROUTE_GAME_PAGE = (
  tournamentName: string,
  gameSlug: AvailableGames
) => {
  return `${ROUTE_TOURNAMENT_PAGE(tournamentName)}/${gameSlug}`;
};
export const ROUTE_LEADERBOARD_PAGE = (
  tournamentName: string,
  gameSlug: AvailableGames
) => {
  return `${ROUTE_GAME_PAGE(tournamentName, gameSlug)}/leaderboard`;
};

export const ROUTE_NFT_IMAGE_PREVIEW = (imageName: string) => {
  return `${BASE_URL}/nft-preview/${encodeURIComponent(imageName)}`;
};
