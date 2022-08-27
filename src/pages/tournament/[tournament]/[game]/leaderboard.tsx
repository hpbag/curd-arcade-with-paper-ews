import { Button, Stack } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import type { ComponentProps } from "react";
import { useEffect, useRef } from "react";
import { FaDiscord } from "react-icons/fa";

import { ROUTE_GAME_PAGE } from "lib/constants/routes";
import { Board } from "lib/pages/leader-board/board";
import { getAddressFromCookies } from "lib/utils/getWalletFromReq";
import { getTournamentGamesByTournamentAndGame } from "services/games";
import {
  getTopXScores,
  getUserScoreAndRank,
  getUserTwitterHandle,
} from "services/redis";
import { getTournamentBySlug } from "services/tournament";

import { GameSearchSchema } from ".";

export default function LeaderBoard({
  rows,
  user,
}: ComponentProps<typeof Board>) {
  const router = useRouter();
  const replayButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (replayButtonRef.current) {
      replayButtonRef.current.focus();
    }
  }, []);

  return (
    <Stack alignItems="center" gap={8}>
      <Button
        ref={replayButtonRef}
        colorScheme="orange"
        w="100%"
        maxW="md"
        mt={20}
        onClick={() => {
          const parsedData = GameSearchSchema.safeParse(router.query);
          if (!parsedData.success) {
            return;
          }
          const { game, tournament } = parsedData.data;
          router.push(ROUTE_GAME_PAGE(tournament, game));
        }}
      >
        Play Again
      </Button>
      <Button leftIcon={<FaDiscord />} variant="solid">
        Join Discord to know when you get your money
      </Button>
      <Board rows={rows} user={user} game="Flap Bird" />
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const gameSearchParamsParsed = GameSearchSchema.safeParse(context.params);
  if (!gameSearchParamsParsed.success) {
    console.error(gameSearchParamsParsed.error.format());
    return { notFound: true };
  }

  const gameSearchParams = gameSearchParamsParsed.data;
  const gameDetails = await getTournamentGamesByTournamentAndGame(
    gameSearchParams.tournament,
    gameSearchParams.game
  );
  const tournament = await getTournamentBySlug(gameSearchParams.tournament);
  if (!gameDetails || !tournament) {
    return { notFound: true };
  }

  try {
    const address = await getAddressFromCookies(context.req.cookies);
    const handle = await getUserTwitterHandle(address || "");
    if (!handle) {
      throw new Error("Missing handle");
    }
    const { rank, score } = await getUserScoreAndRank(
      gameDetails.slug,
      tournament.slug,
      handle
    );
    const result = await getTopXScores(
      gameDetails.slug,
      tournament.slug,
      parseInt(process.env.LEADER_BOARD_PLAYERS as string, 10)
    );
    return { props: { user: { value: handle, rank, score }, rows: result } };
  } catch (e) {
    const result = await getTopXScores(
      gameDetails.slug,
      tournament.slug,
      parseInt(process.env.LEADER_BOARD_PLAYERS as string, 10)
    );
    return { props: { rows: result } };
  }
};
