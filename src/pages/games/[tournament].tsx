import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { GameStats } from "lib/components/gameStats/gameStats";
import { Board } from "lib/pages/leader-board/board";

const Tournament = () => {
  const [isLive] = useState(true);
  const router = useRouter();

  return (
    <Flex flexDirection="column" gap={10}>
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={{ base: 5 }}
      >
        <Heading pb={2} fontSize={{ base: "2xl", md: "4xl" }}>
          BuildSpace Flap Off
        </Heading>
        <GameStats />
        <Box mt={6} textAlign="center">
          <Text fontWeight="bold">Stand to win up to 3x!</Text>
          <Text mb={2}>42% of players make more than they paid 👀</Text>
        </Box>
      </Flex>
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
          gap={8}
          pb={5}
        >
          <Stack alignItems="center">
            <Image src="/buildspace.png" w={52} />
            <Heading fontSize="xl">Buildspace</Heading>

            <Button
              variant="solid"
              colorScheme="orange"
              onClick={() => {
                window.open(
                  "https://paper.xyz/checkout/8e968f93-7619-4a57-8ee9-2beab2f39207",
                  "_blank"
                );
              }}
            >
              Mint Buildspace
            </Button>
          </Stack>
          <Stack alignItems="center">
            <Image src="/farza.png" w={52} />
            <Heading fontSize="xl">Farza</Heading>

            <Button
              variant="solid"
              colorScheme="orange"
              onClick={() => {
                window.open(
                  "https://paper.xyz/checkout/fcf69353-4915-47dd-a76b-9659106b4ed6",
                  "_blank"
                );
              }}
            >
              Mint Farza
            </Button>
          </Stack>
          <Stack alignItems="center">
            <Image src="/winston.png" w={52} />
            <Heading fontSize="xl">Winston@Curd</Heading>

            <Button
              variant="solid"
              colorScheme="orange"
              onClick={() => {
                window.open(
                  "https://paper.xyz/checkout/59c0c1e6-65ea-46a8-9c8b-bc4894266568",
                  "_blank"
                );
              }}
            >
              Mint Winston
            </Button>
          </Stack>
          <Stack alignItems="center">
            <Image src="/hans.png" w={52} />
            <Heading fontSize="xl">Hans@Curd</Heading>

            <Button
              variant="solid"
              colorScheme="orange"
              onClick={() => {
                window.open(
                  "https://paper.xyz/checkout/8081f09b-f034-4731-803d-9368e6629a65",
                  "_blank"
                );
              }}
            >
              Mint Hans
            </Button>
          </Stack>
        </Flex>
      </Stack>

      <Board />

      <Stack alignItems="center">
        <Heading fontSize="2xl" pb={3}>
          Game Goes Live Time
        </Heading>
        {isLive ? (
          <Button
            colorScheme="orange"
            onClick={() => {
              router.push("/play/flap-space");
            }}
          >
            Play Now
          </Button>
        ) : (
          <Text>Sometime Tomorrow, look out for the message on Whatsapp!</Text>
        )}
      </Stack>
    </Flex>
  );
};

export default Tournament;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params?.tournament !== "n&w-buildspace") {
    return { notFound: true };
  }
  return { props: {} };
};
