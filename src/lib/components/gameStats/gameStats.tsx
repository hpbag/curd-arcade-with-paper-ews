import { Box, Spinner, Text } from "@chakra-ui/react";
import { useEditionDrop, useToken } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";

export interface IGameStatsProps {
  nftContractAddress: string;
  treasuryAddress: string;
  tokenContractAddress: string;
  participantsOverride: number | null;
  prizePoolOverride: number | null;
}
export const GameStats = ({
  nftContractAddress,
  participantsOverride,
  prizePoolOverride,
  tokenContractAddress,
  treasuryAddress,
}: IGameStatsProps) => {
  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("us-en", {
        style: "currency",
        currency: "USD",
      }),
    []
  );

  const editionDrop = useEditionDrop(nftContractAddress);
  const token = useToken(tokenContractAddress);

  const [prizePool, setPrizePool] = useState<string>("");
  const [participants, setParticipants] = useState<number | undefined>();

  useEffect(() => {
    const getData = async () => {
      const fetchBalance = await token?.balanceOf(treasuryAddress);
      const tokenOneSupply =
        (await editionDrop?.totalSupply(0)) || ethers.BigNumber.from(0);

      return {
        participants: tokenOneSupply,
        balance: fetchBalance,
      };
    };
    getData().then((result) => {
      setParticipants(parseInt(result.participants?.toString() || "0", 10));
      setPrizePool(
        currencyFormatter.format(
          parseFloat(result.balance?.displayValue || "0")
        )
      );
    });
  }, [currencyFormatter, editionDrop, token, treasuryAddress]);

  const finalParticipants =
    typeof participantsOverride === "number"
      ? participantsOverride
      : participants;

  return (
    <Box>
      <Text fontWeight="bold" fontSize="md">
        Prize Pool :{" "}
        {typeof prizePoolOverride === "number"
          ? currencyFormatter.format(prizePoolOverride)
          : prizePool || <Spinner />}
      </Text>
      <Text fontWeight="bold" fontSize="md">
        Total Participants:{" "}
        {typeof finalParticipants === "number" ? (
          finalParticipants
        ) : (
          <Spinner />
        )}
      </Text>
    </Box>
  );
};
