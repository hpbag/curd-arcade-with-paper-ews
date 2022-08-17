import type { NextApiRequest, NextApiResponse } from "next";

import { getAddressFromCookies } from "lib/utils/getWalletFromReq";

const authenticate = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      error: "Invalid method. Only POST supported.",
    });
  }

  try {
    const address = await getAddressFromCookies(req.cookies);
    return res.status(200).json(address);
  } catch (e) {
    return res.status(400).json({});
  }
};

export default authenticate;
