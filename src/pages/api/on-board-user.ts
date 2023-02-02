import type { NextApiRequest, NextApiResponse } from "next";

import { setNotifyMe, setUserTwitterHandle } from "services/redis";

import { getUser } from "./auth/[...thirdweb]";

const onBoard = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      error: "Invalid method. Only POST supported.",
    });
  }
  const user = await getUser(req);
  if (!user) {
    throw new Error("Not logged in");
  }
  const { address } = user;
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
