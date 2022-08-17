import { Box, Button, Heading, Stack, useToast } from "@chakra-ui/react";
import {
  useAddress,
  useCoinbaseWallet,
  useMetamask,
  useWalletConnect,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useState } from "react";

import { BASE_URL } from "lib/constants/routes";
import useAuthenticate from "lib/hooks/useAuthentication";

export default function Login() {
  const router = useRouter();
  const toast = useToast();

  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const conenctWithCoinbase = useCoinbaseWallet();
  const { login } = useAuthenticate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signInWithEthereum = async () => {
    setIsLoading(true);
    await connectWithMetamask();
    const result = await login();
    if (result.newUser) {
      router.push(`/onboard?redirect=${router.query.redirect}`);
    } else if (router.query.redirect) {
      router.push(new URL(router.query.redirect as string, BASE_URL));
    } else {
      toast({
        title: "Logged In.",
        description: "Successfully logged in!",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
    }
    setIsLoggedIn(true);
    setIsLoading(false);
  };

  return (
    <Box py={8} px={4}>
      {address ? (
        <Stack>
          <Heading textAlign="center" pb={5}>
            Authenticate
          </Heading>
          <Button
            loadingText="Pending Sign Message"
            isLoading={isLoading}
            isDisabled={isLoggedIn}
            onClick={signInWithEthereum}
          >
            {isLoggedIn ? "Successfully Logged In" : "Sign In"}
          </Button>
        </Stack>
      ) : (
        <>
          <Heading pt={5} pb={8} textAlign="center">
            Connect Wallet
          </Heading>
          <Stack spacing={5}>
            <Button onClick={connectWithMetamask}>MetaMask</Button>
            <Button onClick={connectWithWalletConnect}>Wallet Connect</Button>
            <Button onClick={conenctWithCoinbase}>Coinbase Wallet</Button>
          </Stack>
        </>
      )}
    </Box>
  );
}
