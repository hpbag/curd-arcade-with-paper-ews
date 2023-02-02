import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

import { getAssetName } from "lib/utils/getNftHoldings";
import { getUserTwitterHandle, setLeaderScore } from "services/redis";

import { getUser } from "./auth/[...thirdweb]";

const gameOver = async (req: NextApiRequest, res: NextApiResponse) => {
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
  const thirdwebSdk = new ThirdwebSDK("polygon");
  const editionDrop = await thirdwebSdk.getEditionDrop(
    "0xC50Ee7a95AEcEb509f305AAff326481001A5D5b6"
  );
  const ownedNfts = await editionDrop.getOwned(address);

  const web3SfEditionDrop = await thirdwebSdk.getEditionDrop(
    "0x96559A1c39Ba491cb2b94A40CCee7Bb8DAdd574F"
  );
  const gameNfts = await web3SfEditionDrop.getOwned(address);
  const name = getAssetName(gameNfts);
  let team = "";
  switch (name) {
    case "james":
      team = "Team Paper";
      break;
    case "jake":
      team = "Team thirdweb";
      break;
    case "shaan":
      team = "Team Milk Road";
      break;
    case "farza":
      team = "Team BuildSpace";
      break;
    default:
      break;
  }

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
    const finalScore = !ownedNfts.length
      ? parseInt(score, 10)
      : parseInt(score, 10) * 1.1;
    const resp = await setLeaderScore({
      game,
      tournament,
      userId: handle,
      score: finalScore,
      walletAddress: address,
      team,
    });

    return res.status(200).json({ resp });
  } catch (e) {
    return res.status(400).json({ error: (e as Error).message });
  }
};

export default gameOver;
