import type { NextApiRequest, NextApiResponse } from "next";

import { getAddressFromCookies } from "lib/utils/getWalletFromReq";
import { setNotifyMe, setUserTwitterHandle } from "lib/utils/redis";

const onBoard = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      error: "Invalid method. Only POST supported.",
    });
  }
  const address = await getAddressFromCookies(req.cookies);
  const { handle, notifyMe } = req.body;

  if (!handle || typeof notifyMe !== "boolean") {
    return res.status(400).json({ error: "Missing Params" });
  }

  const result = await Promise.allSettled([
    setNotifyMe(address, notifyMe),
    setUserTwitterHandle(address, handle),
  ]);

  return res.status(200).json({ result });
};

export default onBoard;
