import type { GetServerSideProps } from "next";

import { TournamentPage } from "lib/pages/tournament/[tournament]";
import { getUser } from "pages/api/auth/[...thirdweb]";
import type { Game } from "services/games";
import { getTournamentGamesByTournament } from "services/games";
import type { Nfts } from "services/nfts";
import { getNftByAddress } from "services/nfts";
import {
  getTopXScores,
  getUserScoreAndRank,
  getUserTwitterHandle,
} from "services/redis";
import type { Tournament } from "services/tournament";
import { getTournamentBySlug } from "services/tournament";

export default TournamentPage;

export const getServerSideProps: GetServerSideProps<{
  user?: {
    rank: number | null;
    score: number | null;
    value: string;
    team: string | undefined;
    walletAddress: string | undefined;
  };
  rows: {
    score: number;
    value: string;
    team: string | undefined;
    walletAddress: string | undefined;
  }[];
  nfts: Nfts;
  tournament: Tournament;
  game: Game;
}> = async (context) => {
  const tournament = await getTournamentBySlug(
    (context.params?.tournament as string) || ""
  );
  if (!tournament) {
    return { notFound: true };
  }

  const nfts = await getNftByAddress(tournament.nftContractAddress);
  const game = (await getTournamentGamesByTournament(tournament.slug))[0];

  try {
    const user = await getUser(context.req);
    if (!user) {
      throw new Error("Not logged in");
    }
    const { address } = user;
    const handle = await getUserTwitterHandle(address || "");

    if (!handle) {
      throw new Error("Missing handle");
    }
    const values = await getUserScoreAndRank(
      game.slug || "",
      tournament.slug,
      handle
    );
    const result = await getTopXScores(
      game.slug || "",
      tournament.slug,
      parseInt(process.env.LEADER_BOARD_PLAYERS as string, 10)
    );
    console.log("result", result);
    return {
      props: {
        user: { value: handle, ...values },
        rows: result,
        nfts,
        tournament,
        game,
      },
    };
  } catch (e) {
    console.log("e in tournament page", e);
    const result = await getTopXScores(
      game.slug || "",
      tournament.slug,
      parseInt(process.env.LEADER_BOARD_PLAYERS as string, 10)
    );
    return {
      props: {
        rows: result,
        nfts,
        tournament,
        game,
      },
    };
  }
};
