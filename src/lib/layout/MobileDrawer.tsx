import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";

import { ThirdWebConnectWalletButton } from "lib/components/connectWallet/ThirdWebConnectWalletButton";

import ThemeToggle from "./ThemeToggle";

export const MobileDrawer = ({
  isOpen,
  onClose,
  buttonRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={buttonRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>

        <DrawerBody>
          <Flex
            flexDirection="column"
            h="100%"
            justifyContent="end"
            align="end"
          >
            <ThirdWebConnectWalletButton />
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <ThemeToggle />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
