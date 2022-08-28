import type { ButtonProps } from "@chakra-ui/react";
import { Button, Link, Text, useToast } from "@chakra-ui/react";
import {
  ChainId,
  useAddress,
  useClaimNFT,
  useEditionDrop,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";

import {
  DISCORD_LINK,
  POLYGON_SCAN_TRANSACTION,
  ROUTE_LOGIN_PAGE,
} from "lib/constants/routes";

export function NativeMintButton({
  title,
  contractAddress,
  contractArgs,
  onSuccess,
  ...props
}: {
  title: string;
  contractAddress: string;
  contractArgs: { tokenId: number };
  onSuccess: () => void;
} & ButtonProps) {
  const address = useAddress();
  const isMismatched = useNetworkMismatch();
  const editionDropContract = useEditionDrop(contractAddress);
  const { mutate: claimNft, isLoading } = useClaimNFT(editionDropContract);

  const [, switchNetwork] = useNetwork();

  const toast = useToast();
  const router = useRouter();
  const onSwitchNetwork = () => {
    if (!switchNetwork) {
      toast({
        status: "error",
        title: "Cannot Switch Network automatically",
        description: "Please make sure that you are on Polygon and try again",
      });
      return;
    }
    switchNetwork(ChainId.Polygon);
  };

  const onNativeMintClick = async () => {
    if (!address) {
      router.push(ROUTE_LOGIN_PAGE(router.asPath));
      return;
    }

    claimNft(
      {
        to: address,
        quantity: 1,
        tokenId: contractArgs.tokenId,
        checkERC20Allowance: true,
      },
      {
        onError(error) {
          console.error(error);
          toast({
            status: "error",
            title: "Something Went Wrong",
            description: (
              <Text>
                <Link href={DISCORD_LINK} isExternal>
                  <u>Click here</u>
                </Link>{" "}
                to join our Discord and get help!
              </Text>
            ),
            isClosable: true,
          });
        },
        onSuccess(data) {
          onSuccess();

          const { transactionHash } = data.receipt;
          toast({
            title: `Successfully minted ${title}`,
            description: (
              <Text>
                Transaction Hash:{" "}
                <Link
                  isExternal
                  href={POLYGON_SCAN_TRANSACTION(transactionHash)}
                >
                  <u>{transactionHash}</u>
                </Link>
              </Text>
            ),
            status: "success",
            isClosable: true,
          });
        },
      }
    );
  };
  return isMismatched ? (
    <Button onClick={onSwitchNetwork}>Switch Network</Button>
  ) : (
    <Button {...props} isLoading={isLoading} onClick={onNativeMintClick} />
  );
}
