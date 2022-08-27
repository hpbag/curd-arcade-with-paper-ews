import {
  Heading,
  Image,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import { PurchaseNftModal } from "./NftPurchaseModal";

export interface NftCardProps {
  imageUrl: string;
  title: string;
  purchaseId: string;
  contractAddress: string;
  contractArgs: { tokenId: number };
}

const PLAYER_QUERY = "player";

export function NftCard({
  imageUrl,
  title,
  purchaseId,
  contractAddress,
  contractArgs,
}: NftCardProps) {
  const bgColor = useColorModeValue("white", "#323232");
  const { onOpen, onClose, isOpen: isPurchaseNftModalOpen } = useDisclosure();
  const router = useRouter();

  const onCloseNftPurchaseModal = useCallback(() => {
    onClose();
    delete router.query[PLAYER_QUERY];
    router.replace(router, undefined, { shallow: true });
  }, [onClose, router]);

  const onOpenPurchaseNftModal = useCallback(() => {
    router.query[PLAYER_QUERY] = title;
    router.replace(router, undefined, { shallow: true });
  }, [router, title]);

  useEffect(() => {
    if (router.query[PLAYER_QUERY] === title) {
      onOpen();
    }
  }, [onOpen, router.query, title]);

  return (
    <>
      <Stack
        shadow="lg"
        p={8}
        gap={5}
        minW={48}
        maxW={56}
        alignItems="center"
        bg={bgColor}
        rounded="lg"
        _hover={{
          transition: "all",
          cursor: "pointer",
          shadow: "2xl",
        }}
        onClick={onOpenPurchaseNftModal}
      >
        <Image rounded="lg" src={imageUrl} />
        <Heading fontSize="lg" wordBreak="break-all">
          {title}
        </Heading>
      </Stack>
      <PurchaseNftModal
        title={title}
        purchaseId={purchaseId}
        imageUrl={imageUrl}
        contractArgs={contractArgs}
        contractAddress={contractAddress}
        isOpen={isPurchaseNftModalOpen}
        onClose={onCloseNftPurchaseModal}
      />
    </>
  );
}
