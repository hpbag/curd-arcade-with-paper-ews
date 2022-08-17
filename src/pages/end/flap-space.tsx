import { Button } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";

const FlapEndPage = () => {
  return (
    <>
      <div>Thanks for Playing!</div>
      <Button
        variant="solid"
        colorScheme="orange"
        onClick={() => {
          window.open("http://localhost:3000/play/flap-space", "_blank");
        }}
      >
        Play Again
      </Button>
    </>
  );
};

export default FlapEndPage;

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};
