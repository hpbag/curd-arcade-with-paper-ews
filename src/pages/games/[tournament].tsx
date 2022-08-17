import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import type { GetServerSideProps } from "next";
import { useState } from "react";

import { GameStats } from "lib/components/gameStats/gameStats";

const Tournament = () => {
  const [isLive] = useState(true);

  return (
    <Flex flexDirection="column">
      <Heading fontSize="2xl" pb={2}>
        The BuildSpace Flap Off:
      </Heading>
      <Heading fontWeight="bold" fontSize="2xl">
        Stand to win up to 3x!
      </Heading>
      <Text mb={2}>42% of players make more than they paid 👀</Text>
      <GameStats />
      <br />
      <Heading fontSize="2xl" textAlign="center" py={4}>
        Choose Your characters
      </Heading>
      <Flex
        flexDirection={{
          base: "column",
          md: "row",
        }}
        alignItems={{ base: "center", md: "unset" }}
        gap={5}
        pb={5}
      >
        <Box>
          <Image src="/buildspace.png" w={60} />
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
            Mint Your Ticket
          </Button>
        </Box>
        <Box>
          <Image src="/farza.png" w={60} />
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
            Mint Your Ticket
          </Button>
        </Box>
        <Box>
          <Image src="/winston.png" w={60} />
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
            Mint Your Ticket
          </Button>
        </Box>
        <Box>
          <Image src="/hans.png" w={60} />
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
            Mint Your Ticket
          </Button>
        </Box>
      </Flex>
      <br />
      <Heading fontSize="2xl">Game Goes Live Time:</Heading>
      {isLive ? (
        <Link href="/play/flap-space">Play Now</Link>
      ) : (
        <Text>Sometime Tomorrow, look out for the message on Whatsapp!</Text>
      )}
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
