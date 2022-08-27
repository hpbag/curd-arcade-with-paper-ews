import { Flex, IconButton, Link, Text } from "@chakra-ui/react";
import { FaDiscord, FaTwitter } from "react-icons/fa";

import { DISCORD_LINK, TWITTER_LINK } from "lib/constants/routes";

const Footer = () => {
  return (
    <Flex
      as="footer"
      width="full"
      justifyContent="center"
      align="center"
      gap={2}
    >
      <Text fontSize="sm" color="gray.500">
        {new Date().getFullYear()} -{" "}
        <Link href="https://curdinc.com" isExternal rel="noopener noreferrer">
          curdinc.com
        </Link>
      </Text>
      <IconButton
        aria-label="Twitter"
        icon={<FaTwitter />}
        onClick={() => {
          window.open(TWITTER_LINK, "_blank");
        }}
      />
      <IconButton
        aria-label="Twitter"
        icon={<FaDiscord />}
        onClick={() => {
          window.open(DISCORD_LINK, "_blank");
        }}
      />
    </Flex>
  );
};

export default Footer;
