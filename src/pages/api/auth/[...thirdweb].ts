import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import { ThirdwebAuth } from "@thirdweb-dev/auth/next";

import { BASE_URL } from "lib/constants/routes";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: BASE_URL,
  wallet: new PrivateKeyWallet(process.env.ADMIN_PRIVATE_KEY || ""),
});

export default ThirdwebAuthHandler();
