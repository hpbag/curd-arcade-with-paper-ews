import { useColorMode, Button } from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { GetUser, PaperEmbeddedWalletSdk, UserStatus} from "@paperxyz/embedded-wallet-service-sdk";
import { useEffect, useState, useCallback } from "react";

export const ThirdWebConnectWalletButton = () => {
  const { colorMode } = useColorMode();
  const [paper, setPaper] = useState<PaperEmbeddedWalletSdk>();
  const [userDetails, setUserDetails] = useState<GetUser>();

  useEffect(() => {
    const sdk = new PaperEmbeddedWalletSdk({
      clientId: "fcd86c45-cc43-4e10-812e-eb0d3c09a776",
      chain: "Mumbai",
    });
    setPaper(sdk);
  }, []);

  const fetchUserStatus = useCallback(async () => {
    if (!paper) {
      return;
    }

    const paperUser = await paper.getUser();
    console.log("paperUser", paperUser);
    setUserDetails(paperUser);
  }, [paper]);

  useEffect(() => {
    if (paper && fetchUserStatus) {
      fetchUserStatus();
    }
  }, [paper, fetchUserStatus]);

  const logout = async () => {
    const response = await paper?.auth.logout();
    console.log("logout response", response);
    await fetchUserStatus();
  };

  const loginWithPaperModal = async () => {
    try {
      const result = await paper?.auth.loginWithPaperModal();
      console.log(`loginWithPaper result: ${JSON.stringify(result, null, 2)}`);
    } catch (e) {
      // some
    }
  };

  const isLoggedIn = () => {
    return userDetails.status == UserStatus.LOGGED_IN_WALLET_INITIALIZED;
  };

  return (
    <div>
      {!!userDetails &&
      userDetails.status == UserStatus.LOGGED_IN_WALLET_INITIALIZED ? (
        <Button onClick={logout}> Logout </Button>
      ) : (
        <Button onClick={loginWithPaperModal}> Login With Paper </Button>
      )}
    </div>
  );
};
