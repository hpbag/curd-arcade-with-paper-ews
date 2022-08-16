import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import { GameStats } from "lib/components/gameStats/gameStats";
import MotionBox from "lib/components/motion/Box";
import { BASE_URL } from "lib/constants/routes";

const Home = () => {
  const router = useRouter();
  const routeToBuildSpace = () => {
    const url = new URL(
      `/games/${encodeURIComponent("n&w-buildspace")}`,
      BASE_URL
    );
    router.push(url);
  };

  return (
    <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <NextSeo title="Curd Arcade Home" />
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        gap={4}
        mb={8}
        w="full"
      >
        <Box>
          <Heading>Pay To Play</Heading>
          <Text opacity={0.5}>Get rewarded for your skills</Text>
        </Box>
        <Box
          textAlign="center"
          shadow="md"
          onClick={routeToBuildSpace}
          _hover={{
            cursor: "pointer",
          }}
        >
          <Heading>Upcoming Games</Heading>
          <Flex
            shadow="lg"
            border={5}
            p={3}
            flexDirection="column"
            alignItems="center"
          >
            <Image src="/android-chrome-192x192.png" w={32} />
            <Heading as="h2">BuildSpace Flap Off</Heading>
            <GameStats />
          </Flex>
        </Box>
      </Flex>
    </MotionBox>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};
