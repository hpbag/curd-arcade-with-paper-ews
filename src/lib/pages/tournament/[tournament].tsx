import {
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { isAfter, isBefore } from "date-fns";
import type { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Board } from "../leaderboard/Board";
import { TeamBoard } from "../leaderboard/TeamBoard";
import { CountDownTimer } from "lib/components/countDownTimer/CountdownTimer";
import { LoyaltyBoost } from "lib/components/loyaltyBoost/LoyaltyBoost";
import { NftCard } from "lib/components/NFt/NftCard";
import { DISCORD_LINK, ROUTE_GAME_PAGE } from "lib/constants/routes";
import type { getServerSideProps } from "pages/tournament/[tournament]/index";
import { web3Slug } from "services/tournament";

export const TournamentPage = ({
  rows,
  user,
  nfts,
  tournament,
  game,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (router.query.message) {
      toast({
        description: router.query.message,
        status: "info",
        isClosable: true,
        duration: 6000,
        id: "message",
      });
      router.replace(router.asPath.split("?")[0], undefined, { shallow: true });
    }
  }, [router, router.query.message, toast]);

  const startDate = new Date(tournament.dateStart);
  const endDate = new Date(tournament.dateEnd);
  const now = new Date();

  return (
    <Flex flexDirection="column" gap={10}>
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={{ base: 4 }}
        gap={5}
      >
        <Image
          src={tournament.imageUrl}
          alt="Tournament"
          maxW={64}
          rounded="lg"
        />
        <Heading pb={2} fontSize={{ base: "2xl", md: "4xl" }}>
          {tournament.title}
        </Heading>
        {tournament.slug === "web3sf" ? (
          <>
            <Text>
              Top Team will distribute the prize pool among team members based
              on scores
            </Text>

            <Link href={DISCORD_LINK} isExternal>
              <u>Join our discord for the most up to date information</u>
            </Link>
            <Text>May the best team win!</Text>
          </>
        ) : (
          <Text>{tournament.description}</Text>
        )}
      </Flex>

      <Stack alignItems="center" gap={4}>
        {isBefore(startDate, now) && isAfter(endDate, now) ? (
          <Button
            px={10}
            colorScheme="orange"
            onClick={() => {
              router.push(ROUTE_GAME_PAGE(tournament.slug, game.slug));
            }}
          >
            Play Now
          </Button>
        ) : null}
        {tournament.slug === "web3sf" ? (
          <LoyaltyBoost contractAddress="0xC50Ee7a95AEcEb509f305AAff326481001A5D5b6" />
        ) : null}
        <CountDownTimer
          dateStart={tournament.dateStart}
          dateEnd={tournament.dateEnd}
        />
      </Stack>

      <Stack>
        <Heading fontSize="2xl" textAlign="center" py={4}>
          Choose Your characters
        </Heading>
        <Flex
          flexDirection={{
            base: "column",
            md: "row",
          }}
          alignItems={{ base: "center", md: "unset" }}
          flexWrap="wrap"
          gap={8}
          pb={5}
        >
          {nfts.map((nft) => {
            return (
              <NftCard
                contractAddress={nft.contractAddress}
                contractArgs={nft.contractArgs}
                imageUrl={nft.imageUrl}
                title={nft.title}
                purchaseId={nft.paperId}
                key={nft.title}
              />
            );
          })}
        </Flex>
      </Stack>
      {router.query.tournament === web3Slug && (
        <TeamBoard rows={rows} user={user} />
      )}
      <Board rows={rows} user={user} game={game.name} />
    </Flex>
  );
};
