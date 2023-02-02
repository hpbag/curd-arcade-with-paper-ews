import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export async function getNftHoldings(
  contractAddress: string,
  walletAddress: string
) {
  const sdk = new ThirdwebSDK("polygon");
  const contract = await sdk.getContract(contractAddress);
  return contract.erc1155.getOwned(walletAddress);
}

export function getAssetName(nfts: { [key: string]: any }[]) {
  return `${nfts[0].metadata.attributes[0].value}`;
}
