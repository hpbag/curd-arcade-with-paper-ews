import { Button, Stack } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import type { ComponentProps } from "react";

import { Board } from "lib/pages/leader-board/board";
import { getAddressFromCookies } from "lib/utils/getWalletFromReq";
import {
  GAME,
  getTopXScores,
  getUserScoreAndRank,
  getUserTwitterHandle,
  TOURNAMENT,
} from "lib/utils/redis";

export default function LeaderBoard({
  rows,
  user,
}: ComponentProps<typeof Board>) {
  const router = useRouter();
  return (
    <Stack alignItems="center" gap={8}>
      <Board rows={rows} user={user} game="Flap Bird" />
      <Button
        w="100%"
        maxW="md"
        onClick={() => {
          router.push("/play/flap-space");
        }}
      >
        Play Again
      </Button>
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params?.game !== GAME) {
    return { notFound: true };
  }
  try {
    const address = await getAddressFromCookies(context.req.cookies);
    const handle = await getUserTwitterHandle(address || "");
    if (!handle) {
      throw new Error("Missing handle");
    }
    const { rank, score } = await getUserScoreAndRank(GAME, TOURNAMENT, handle);
    const result = await getTopXScores(
      GAME,
      TOURNAMENT,
      parseInt(process.env.LEADER_BOARD_PLAYERS as string, 10)
    );
    return { props: { user: { value: handle, rank, score }, rows: result } };
  } catch (e) {
    const result = await getTopXScores(
      GAME,
      TOURNAMENT,
      parseInt(process.env.LEADER_BOARD_PLAYERS as string, 10)
    );
    return { props: { rows: result } };
  }
};
