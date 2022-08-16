import { Box, Spinner, Text } from "@chakra-ui/react";
import { useEditionDrop, useToken } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const GameStats = () => {
  const editionDrop = useEditionDrop(
    "0xC50Ee7a95AEcEb509f305AAff326481001A5D5b6"
  );
  const token = useToken("0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174");
  const [prizePool, setPrizePool] = useState<string>("");
  const [participants, setParticipants] = useState<number | undefined>();

  useEffect(() => {
    const getData = async () => {
      const fetchBalance = await token?.balanceOf(
        "0xC50Ee7a95AEcEb509f305AAff326481001A5D5b6"
      );
      const tokenOneSupply =
        (await editionDrop?.totalSupply(0)) || ethers.BigNumber.from(0);
      const tokenTwoSupply =
        (await editionDrop?.totalSupply(1)) || ethers.BigNumber.from(0);
      const tokenThreeSupply =
        (await editionDrop?.totalSupply(2)) || ethers.BigNumber.from(0);
      const tokenFourSupply =
        (await editionDrop?.totalSupply(3)) || ethers.BigNumber.from(0);

      return {
        participants: tokenOneSupply.add(
          tokenTwoSupply.add(tokenThreeSupply.add(tokenFourSupply))
        ),
        balance: fetchBalance,
      };
    };
    getData().then((result) => {
      const currencyFormatter = new Intl.NumberFormat("us-en", {
        style: "currency",
        currency: "USD",
      });
      setParticipants(parseInt(result.participants?.toString() || "0", 10));
      setPrizePool(
        currencyFormatter.format(
          parseFloat(result.balance?.displayValue || "0")
        )
      );
    });
  }, [editionDrop, token]);

  if (!editionDrop) {
    return null;
  }

  return (
    <Box w="100%">
      <Text fontWeight="bold" fontSize="md">
        Prize Pool : {!prizePool ? <Spinner /> : prizePool}
      </Text>
      <Text fontWeight="bold" fontSize="md">
        Total Participants:{" "}
        {typeof participants === "number" ? participants : <Spinner />}
      </Text>
    </Box>
  );
};
