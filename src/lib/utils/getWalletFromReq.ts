import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest } from "next";

export async function getAddressFromCookies(
  cookies: NextApiRequest["cookies"]
) {
  const PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    throw new Error("Admin private key not set");
  }

  // Get access token off cookies
  const token = cookies.access_token;
  if (!token) {
    throw new Error("Missing token");
  }

  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.ADMIN_PRIVATE_KEY as string,
    "polygon"
  );

  // Authenticate token with the SDK
  const domain = "curdinc.com";
  return sdk.auth.authenticate(domain, token);
}
