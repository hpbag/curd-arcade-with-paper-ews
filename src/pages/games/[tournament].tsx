import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";

const Tournament = () => {
  return (
    <Flex flexDirection="column">
      <Heading>The BuildSpace Flap Off:</Heading>
      <Heading fontSize="2xl">Prize Pool - $33.66</Heading>
      <Heading fontSize="2xl">Total Participants - 2</Heading>
      <br />
      <Heading fontSize="2xl" textDecoration="underline">
        Choose Your characters
      </Heading>
      <Flex
        flexDirection={{
          base: "column",
          md: "row",
        }}
        alignItems={{ base: "center", md: "unset" }}
        gap={5}
      >
        <Box>
          <Image src="/buildspace.png" w={60} />
          <Heading fontSize="xl">Buildspace Unicorn</Heading>

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
      <Heading fontSize="2xl">Game Goes live in</Heading>
      <Text>1 Day</Text>
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
