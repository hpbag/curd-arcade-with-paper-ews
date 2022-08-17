import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export async function getNftHoldings(walletAddress: string) {
  const sdk = new ThirdwebSDK("polygon");
  const edition = sdk.getEditionDrop(
    "0xC50Ee7a95AEcEb509f305AAff326481001A5D5b6"
  );
  return edition.getOwned(walletAddress);
}

export function getAssetName(nfts: { [key: string]: any }[]) {
  return `${nfts[0].metadata.attributes[0].value}`;
}
