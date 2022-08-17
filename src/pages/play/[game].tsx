import { Box } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";

import { useGame } from "lib/components/flappyBird/useGame";

const FlapSpacePage = () => {
  useGame();
  return <Box id="game-container" />;
};

export default FlapSpacePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params?.game !== "flap-space") {
    return { notFound: true };
  }
  return { props: {} };
};
