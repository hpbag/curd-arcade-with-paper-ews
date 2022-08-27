import {
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { HiOutlineMenu } from "react-icons/hi";

import { ThirdWebConnectWalletButton } from "lib/components/connectWallet/ThirdWebConnectWalletButton";

import { MobileDrawer } from "./MobileDrawer";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  return (
    <Flex as="header" width="full" align="center">
      <Image src="/android-chrome-192x192.png" w={10} borderRadius={5} />
      <Heading ml={3}>
        <NextLink href="/" passHref>
          <Link>CurdArcade</Link>
        </NextLink>
      </Heading>
      <Flex
        display={{ base: "none", md: "flex" }}
        marginLeft="auto"
        align="center"
        gap={2}
      >
        <ThirdWebConnectWalletButton />
        <ThemeToggle />
      </Flex>
      <Flex
        display={{ base: "flex", md: "none" }}
        marginLeft="auto"
        align="center"
        gap={2}
      >
        <IconButton
          ref={buttonRef}
          aria-label="menu"
          icon={<HiOutlineMenu />}
          onClick={onOpen}
        />
      </Flex>
      <MobileDrawer buttonRef={buttonRef} isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Header;
