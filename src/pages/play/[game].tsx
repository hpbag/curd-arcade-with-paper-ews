import { Box } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";

const FlapSpacePage = () => {
  return <Box id="game-container" />;
};

export default FlapSpacePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params?.game !== "flap-space") {
    return { notFound: true };
  }
  return { props: {} };
};
