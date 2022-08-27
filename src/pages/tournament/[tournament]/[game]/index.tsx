import { Kbd, Stack, Text } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { z } from "zod";

import { useFlappyBirdGame } from "lib/components/flappyBird/useGame";
import { ROUTE_TOURNAMENT_PAGE } from "lib/constants/routes";
import { getAssetName, getNftHoldings } from "lib/utils/getNftHoldings";
import { getAddressFromCookies } from "lib/utils/getWalletFromReq";
import {
  AvailableGames,
  getTournamentGamesByTournamentAndGame,
} from "services/games";
import { isNewUser } from "services/redis";
import { getTournamentBySlug } from "services/tournament";

const GamePage = ({
  imageLink,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useFlappyBirdGame(imageLink);
  return (
    <Stack gap={5} alignItems="center">
      <Text>
        <Kbd>Space</Kbd> or <Kbd>tap</Kbd> to jump!
      </Text>
      <div id="game-container" />
    </Stack>
  );
};

export default GamePage;

export const GameSearchSchema = z.object({
  tournament: z.string(),
  game: z.nativeEnum(AvailableGames),
});

export const getServerSideProps: GetServerSideProps<{
  imageLink: string;
}> = async (context) => {
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

  const pathToComeBackTo = encodeURIComponent(
    `/tournament/${context.params?.tournament}/${context.params?.game}`
  );

  try {
    const address = await getAddressFromCookies(context.req.cookies);
    if (await isNewUser(address)) {
      return {
        redirect: {
          destination: `/onboard?redirect=${pathToComeBackTo}`,
          permanent: false,
        },
      };
    }

    const nfts = await getNftHoldings(tournament.nftContractAddress, address);
    if (nfts.length === 0) {
      return {
        redirect: {
          destination: `${ROUTE_TOURNAMENT_PAGE(
            gameSearchParams.tournament
          )}?message=${encodeURIComponent("Purchase a character first!")}`,
          permanent: false,
        },
      };
    }
    const assetUrl = getAssetName(nfts);
    console.log(assetUrl);
    return { props: { imageLink: assetUrl } };
  } catch (e) {
    return {
      redirect: {
        destination: `/login?redirect=${pathToComeBackTo}`,
        permanent: false,
      },
    };
  }
};
