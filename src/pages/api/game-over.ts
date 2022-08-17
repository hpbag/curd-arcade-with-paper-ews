import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

import { getAddressFromReq } from "lib/utils/getWalletFromReq";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      error: "Invalid method. Only POST supported.",
    });
  }

  const address = await getAddressFromReq(req.cookies);

  // Get signed login payload from the frontend
  const payload = req.body.payload as { signature: string; score: number };
  if (!payload) {
    return res.status(400).json({
      error: "Must provide a login payload to generate a token",
    });
  }

  try {
    const signedAddress = ethers.utils.verifyMessage(``, payload.signature);
    if (signedAddress !== address) {
      return res.status(400).json("Invalid Authorization");
    }
    return res.status(200).json({ message: "OK" });
  } catch (e) {
    return res.status(400).json({ error: "Invalid Signature" });
  }
};

export default login;
