import type { GetServerSideProps } from "next";

import { TournamentPage } from "lib/pages/tournament/[tournament]";
import { getAddressFromCookies } from "lib/utils/getWalletFromReq";
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
  };
  rows: {
    score: number;
    value: string;
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
    const address = await getAddressFromCookies(context.req.cookies);
    const handle = await getUserTwitterHandle(address || "");

    if (!handle) {
      throw new Error("Missing handle");
    }
    const { rank, score } = await getUserScoreAndRank(
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
        user: { value: handle, rank, score },
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
