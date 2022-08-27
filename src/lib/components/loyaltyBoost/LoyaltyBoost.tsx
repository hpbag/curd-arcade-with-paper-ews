import { Spinner, Text } from "@chakra-ui/react";
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
    return <ThirdWebConnectWalletButton />;
  }
  if (isLoading) {
    return <Spinner />;
  }

  if (!ownedNFTs || !ownedNFTs.length) {
    return <Text>No bonus this tournament</Text>;
  }

  return (
    <Text>
      As Buildspace Flap Off holder, you enjoy a 110% multiplier on your scores!
    </Text>
  );
};
