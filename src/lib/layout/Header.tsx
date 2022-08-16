import { Box, Flex, Heading, Image } from "@chakra-ui/react";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <Image src="/android-chrome-192x192.png" w={10} borderRadius={5} />
      <Heading ml={3}>CurdArcade</Heading>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
