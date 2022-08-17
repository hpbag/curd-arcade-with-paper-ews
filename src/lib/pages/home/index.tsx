import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
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
  const bgColor = useColorModeValue("white", "#323232");

  return (
    <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <NextSeo title="Curd Arcade Home" />
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        gap={8}
        mb={8}
        w="full"
      >
        <Stack
          justifyContent="center"
          h="60vh"
          w="100%"
          alignItems="center"
          bgImage="/coin-bg.webp"
        >
          <Box textAlign="center" bg={bgColor} p={5} rounded="xl">
            <Heading>Pay To Play</Heading>
            <Text opacity={0.5}>Get rewarded for your skills</Text>
          </Box>
        </Stack>
        <Heading>Upcoming Games</Heading>
        <Stack textAlign="center">
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            shadow="lg"
            p={8}
            gap={5}
            alignItems="center"
            bg={bgColor}
            rounded="lg"
            _hover={{
              transition: "all",
              cursor: "pointer",
              shadow: "2xl",
            }}
            onClick={routeToBuildSpace}
          >
            <Image src="/buildspace.png" w={48} rounded="lg" />
            <Box>
              <Heading as="h2" fontSize="lg">
                BuildSpace Flap Off
              </Heading>
              <GameStats />
            </Box>
          </Flex>
        </Stack>
      </Flex>
    </MotionBox>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};
