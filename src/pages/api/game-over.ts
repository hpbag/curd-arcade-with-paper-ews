import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

import { getAddressFromCookies } from "lib/utils/getWalletFromReq";
import {
  GAME,
  getUserTwitterHandle,
  setLeaderScore,
  TOURNAMENT,
} from "lib/utils/redis";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      error: "Invalid method. Only POST supported.",
    });
  }

  const address = await getAddressFromCookies(req.cookies);

  // Get signed login payload from the frontend
  const payload = req.body.payload as { signature: string; score: number };
  if (!payload) {
    return res.status(400).json({
      error: "Must provide a login payload to generate a token",
    });
  }

  try {
    const signedAddress = ethers.utils.verifyMessage(
      `score: ${payload.score}`,
      payload.signature
    );
    if (signedAddress !== address) {
      return res.status(400).json("Invalid Authorization");
    }
    const handle = await getUserTwitterHandle(address);
    if (!handle) {
      throw new Error("Missing handle");
    }
    const resp = await setLeaderScore(GAME, TOURNAMENT, handle, payload.score);

    return res.status(200).json({ resp });
  } catch (e) {
    return res.status(400).json({ error: (e as Error).message });
  }
};

export default login;
