export const BASE_URL =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://curdinc.com";

export const REDIS_HOST =
  process.env.NEXT_PUBLIC_NODE_ENV === "development"
    ? "localhost"
    : "srv-captain--curd-casino-redis";

export const ROUTE_TOURNAMENT_PAGE = (tournamentName: string) => {
  return `/tournament/${encodeURIComponent(tournamentName)}`;
};
