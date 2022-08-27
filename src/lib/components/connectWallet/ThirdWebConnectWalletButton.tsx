import { useColorMode } from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";

export const ThirdWebConnectWalletButton = () => {
  const { colorMode } = useColorMode();
  return <ConnectWallet colorMode={colorMode} />;
};
