import type { ButtonProps } from "@chakra-ui/react";
import { Button, Link, Text, useToast } from "@chakra-ui/react";
import { useAddress, useClaimNFT, useEditionDrop } from "@thirdweb-dev/react";
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
  ...props
}: {
  title: string;
  contractAddress: string;
  contractArgs: { tokenId: number };
} & ButtonProps) {
  const address = useAddress();
  const editionDropContract = useEditionDrop(contractAddress);
  const { mutate: claimNft, isLoading } = useClaimNFT(editionDropContract);
  const toast = useToast();
  const router = useRouter();
  const onNativeMintClick = async () => {
    if (!address) {
      router.push(ROUTE_LOGIN_PAGE(router.asPath));
      return;
    }
    claimNft(
      {
        to: contractAddress,
        quantity: 1,
        tokenId: 1,
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
  return (
    <Button {...props} isLoading={isLoading} onClick={onNativeMintClick} />
  );
}
