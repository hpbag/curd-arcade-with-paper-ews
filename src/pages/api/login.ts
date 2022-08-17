import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { LoginPayload } from "@thirdweb-dev/sdk/dist/src/schema";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

import { isNewUser } from "lib/utils/redis";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      error: "Invalid method. Only POST supported.",
    });
  }

  const PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    return res.status(500).json({
      error: "missing key",
    });
  }

  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.ADMIN_PRIVATE_KEY as string,
    "polygon"
  );

  // Get signed login payload from the frontend
  const payload = req.body.payload as LoginPayload;

  if (!payload) {
    return res.status(400).json({
      error: "Must provide a login payload to generate a token",
    });
  }

  // Generate an access token with the SDK using the signed payload
  const domain = "curdinc.com";
  const token = await sdk.auth.generateAuthToken(domain, payload);

  // Securely set httpOnly cookie on request to prevent XSS on frontend
  // And set path to / to enable access_token usage on all endpoints
  res.setHeader(
    "Set-Cookie",
    serialize("access_token", token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
  );

  if (await isNewUser(payload.payload.address)) {
    return res.status(200).json({ newUser: true });
  }

  return res.status(200).json({ newUser: false });
};

export default login;
