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
import router from "next/router";

import { CASHIER } from "lib/constants/routes";

import ThemeToggle from "./ThemeToggle";

export const MobileDrawer = ({
  isOpen,
  onClose,
  buttonRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}) => (
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
        <Flex flexDirection="column" h="100%" justifyContent="end" align="end">
          <Button
            px={10}
            colorScheme="orange"
            onClick={() => {
              router.push(CASHIER);
            }}
          >
            Cashier
          </Button>
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
