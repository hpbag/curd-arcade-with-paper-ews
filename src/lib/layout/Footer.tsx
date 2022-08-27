import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center">
      <Text fontSize="sm" color="gray.500">
        {new Date().getFullYear()} -{" "}
        <Link href="https://curdinc.com" isExternal rel="noopener noreferrer">
          curdinc.com
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
