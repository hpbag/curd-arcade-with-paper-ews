import { Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { useAddress, useEditionDrop, useOwnedNFTs } from "@thirdweb-dev/react";

import { ThirdWebConnectWalletButton } from "../connectWallet/ThirdWebConnectWalletButton";

export type LoyaltyBoostProps = {
  contractAddress: string;
};
export const LoyaltyBoost = ({ contractAddress }: LoyaltyBoostProps) => {
  const address = useAddress();
  const editionDrop = useEditionDrop(contractAddress);
  const {
    data: ownedNFTs,
    isLoading,
    error,
  } = useOwnedNFTs(editionDrop, address);

  if (error) {
    console.error(error);
  }
  if (!address) {
    return (
      <Stack align="center">
        <Heading fontSize="lg">See Your Power-Up</Heading>
        <ThirdWebConnectWalletButton />
      </Stack>
    );
  }
  if (isLoading) {
    return <Spinner />;
  }

  if (!ownedNFTs || !ownedNFTs.length) {
    return (
      <Text>
        Unfortunately, you don&apos;t have any existing NFTs. Join this round to
        get in on the next one!
      </Text>
    );
  }

  return (
    <Text>
      As Buildspace Flap Off NFT holder, you enjoy a 1.1 multiplier on your
      scores!
    </Text>
  );
};
