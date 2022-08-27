import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";

import { NativeMintButton } from "./nativeMintButton";
import type { NftCardProps } from "./NftCard";

export function PurchaseNftModal({
  isOpen,
  onClose,
  imageUrl,
  purchaseId,
  contractAddress,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
} & NftCardProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack align="center">
            <Image rounded="lg" src={imageUrl} maxW={52} />
          </Stack>
          {/* <iframe
            src={`https://paper.xyz/checkout/${purchaseId}?display=MODAL`}
            title="Purchase Nft Flow"
            style={{
                width: "100%",
                height: "600px",
            }}
          /> */}
        </ModalBody>

        <ModalFooter>
          <Stack w="100%" align="center">
            <NativeMintButton
              contractAddress={contractAddress}
              contractArgs={{ tokenId: 1 }}
              title={title}
              w={56}
            >
              Mint With USDC
            </NativeMintButton>
            <Button
              w={56}
              onClick={() => {
                window.open(`https://paper.xyz/checkout/${purchaseId}`);
              }}
            >
              Buy With Card or Eth
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
