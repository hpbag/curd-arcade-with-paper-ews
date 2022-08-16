import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";

const Tournament = () => {
  return (
    <Flex flexDirection="column">
      <Heading>BuildSpace Flap Off</Heading>
      <Heading>Prize Pool</Heading>
      <Heading>Total Participants</Heading>
      <Heading fontSize="2xl">Choose Your characters</Heading>
      <Flex
        flexDirection={{
          base: "column",
          md: "row",
        }}
        alignItems={{ base: "center", md: "unset" }}
        gap={5}
      >
        <Box>
          <Image src="/android-chrome-192x192.png" />
          <Heading fontSize="xl">Super man</Heading>

          <Button
            variant="solid"
            colorScheme="orange"
            onClick={() => {
              window.open("https://google.com", "_blank");
            }}
          >
            Mint Your Ticket
          </Button>
        </Box>
        <Box>
          <Image src="/android-chrome-192x192.png" />
          <Heading fontSize="xl">Super man</Heading>

          <Button
            variant="solid"
            colorScheme="orange"
            onClick={() => {
              window.open("https://google.com", "_blank");
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
