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
import MotionBox from "lib/components/motion/Box";
import { BASE_URL } from "lib/constants/routes";
import type { getServerSideProps } from "pages";

export type TournamentCardProps = {
  imageUrl: string;
  title: string;
  tournamentLink: string;
} & IGameStatsProps;

export function TournamentCard({
  imageUrl,
  title,
  tournamentLink,
  ...gameStatProps
}: TournamentCardProps) {
  const router = useRouter();
  const routeToTournament = () => {
    const url = new URL(tournamentLink, BASE_URL);
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
      <Image src={imageUrl} w={48} h-={48} rounded="lg" />
      <Stack align="start" h="100%" w="100%">
        <Heading as="h2" fontSize="2xl" mb={5}>
          {title}
        </Heading>
        <GameStats {...gameStatProps} />
      </Stack>
    </Flex>
  );
}

export function TournamentSection({
  sectionTitle,
  tournaments,
}: {
  sectionTitle: string;
  tournaments: TournamentCardProps[];
}) {
  const tournamentDisplays = tournaments.map((tournament) => {
    return <TournamentCard {...tournament} />;
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
    <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <NextSeo title="Home" />
      <Stack minHeight="80vh" gap={20} my={8} w="full">
        {sectionComponent}
      </Stack>
    </MotionBox>
  );
};

export default Home;
