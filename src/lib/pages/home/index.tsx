import {
  Flex,
  Heading,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import type { InferGetServerSidePropsType } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import type { IGameStatsProps } from "lib/components/gameStats/gameStats";
import { GameStats } from "lib/components/gameStats/gameStats";
import type { getServerSideProps } from "pages";
import type { Tournament } from "services/tournament";

export type TournamentCardProps = {
  imageUrl: string;
  title: string;
  tournamentLink: string;
} & IGameStatsProps;

export function TournamentCard({
  imageUrl,
  title,
  tournamentLink,

  nftContractAddress,
  tokenContractAddress,
  treasuryAddress,
  participantsOverride,
  prizePoolOverride,
}: Tournament) {
  const router = useRouter();
  const routeToTournament = () => {
    const url = new URL(tournamentLink);
    router.push(url);
  };
  const bgColor = useColorModeValue("white", "#323232");
  return (
    <Flex
      shadow="lg"
      p={8}
      gap={5}
      flexDirection={{ base: "column", md: "row" }}
      alignItems="center"
      bg={bgColor}
      rounded="lg"
      _hover={{
        transition: "all",
        cursor: "pointer",
        shadow: "2xl",
      }}
      onClick={routeToTournament}
    >
      <Image src={imageUrl} w={48} h={48} rounded="lg" />
      <Stack align="start" h="100%" w="100%">
        <Heading as="h2" fontSize="2xl" mb={5}>
          {title}
        </Heading>
        <GameStats
          nftContractAddress={nftContractAddress}
          tokenContractAddress={tokenContractAddress}
          treasuryAddress={treasuryAddress}
          participantsOverride={participantsOverride}
          prizePoolOverride={prizePoolOverride}
        />
      </Stack>
    </Flex>
  );
}

export function TournamentSection({
  sectionTitle,
  tournaments,
}: {
  sectionTitle: string;
  tournaments: Tournament[];
}) {
  const tournamentDisplays = tournaments.map((tournament) => {
    return <TournamentCard key={tournament.slug} {...tournament} />;
  });
  return (
    <Stack alignItems="center" w="100%" gap={8}>
      <Heading>{sectionTitle}</Heading>
      {tournamentDisplays}
    </Stack>
  );
}

const Home = ({
  sections,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const sectionComponent = sections.map((value) => {
    return (
      <TournamentSection
        key={value.sectionTitle}
        sectionTitle={value.sectionTitle}
        tournaments={value.tournaments}
      />
    );
  });

  return (
    <>
      <NextSeo title="Home" />
      <Stack minHeight="80vh" gap={20} my={8} w="full">
        {sectionComponent}
      </Stack>
    </>
  );
};

export default Home;
