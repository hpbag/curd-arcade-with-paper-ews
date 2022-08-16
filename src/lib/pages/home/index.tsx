import { Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import MotionBox from "lib/components/motion/Box";
import CTASection from "lib/components/samples/CTASection";
import SomeImage from "lib/components/samples/SomeImage";
import SomeText from "lib/components/samples/SomeText";

const Home = () => {
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
        <SomeText />
        <SomeImage />
        <CTASection />
      </Flex>
    </MotionBox>
  );
};

export default Home;
