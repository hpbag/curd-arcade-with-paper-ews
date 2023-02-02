import { Box, Button, Heading, Stack, useToast } from "@chakra-ui/react";
import {
  useAddress,
  useCoinbaseWallet,
  useLogin,
  useMetamask,
  useUser,
  useWalletConnect,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { BASE_URL } from "lib/constants/routes";

export default function Login() {
  const router = useRouter();
  const toast = useToast();

  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const conenctWithCoinbase = useCoinbaseWallet();
  const [isLoading, setIsLoading] = useState(false);
  const address = useAddress();
  const { login } = useLogin();
  const { isLoggedIn } = useUser();

  useEffect(() => {
    if (isLoggedIn) {
      if (router.query.redirect) {
        router.push(new URL(router.query.redirect as string, BASE_URL));
      }
      toast({
        title: "Logged In.",
        description: "Successfully logged in!",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

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
            onClick={async () => {
              try {
                setIsLoading(true);
                await login();

                setIsLoading(false);
              } catch (e) {
                setIsLoading(false);
              }
            }}
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
