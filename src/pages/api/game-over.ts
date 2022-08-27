import type { NextApiRequest, NextApiResponse } from "next";

import { getAddressFromCookies } from "lib/utils/getWalletFromReq";
import { getUserTwitterHandle, setLeaderScore } from "services/redis";

const gameOver = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      error: "Invalid method. Only POST supported.",
    });
  }

  const address = await getAddressFromCookies(req.cookies);

  // Get signed login payload from the frontend
  const payload = req.body as {
    score: string;
    game: string;
    tournament: string;
  };
  if (!payload) {
    return res.status(400).json({
      error: "Must provide a login payload to generate a token",
    });
  }
  const score = Buffer.from(payload.score, "base64").toString("utf-8");
  const { tournament } = payload;
  const { game } = payload;

  console.log("score", score);
  try {
    const handle = await getUserTwitterHandle(address);
    if (!handle) {
      throw new Error("Missing handle");
    }
    const resp = await setLeaderScore(
      game,
      tournament,
      handle,
      parseInt(score, 10)
    );

    return res.status(200).json({ resp });
  } catch (e) {
    return res.status(400).json({ error: (e as Error).message });
  }
};

export default gameOver;
