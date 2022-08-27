import { ROUTE_NFT_IMAGE_PREVIEW } from "lib/constants/routes";

export type Nfts = Awaited<ReturnType<typeof getNfts>>;

export async function getNfts() {
  return [
    {
      contractAddress: "0xC50Ee7a95AEcEb509f305AAff326481001A5D5b6",
      imageUrl: ROUTE_NFT_IMAGE_PREVIEW(`buildspace.png`),
      title: "Buildspace",
      paperId: "8e968f93-7619-4a57-8ee9-2beab2f39207",
      contractArgs: { tokenId: 0 },
    },
    {
      contractAddress: "0xC50Ee7a95AEcEb509f305AAff326481001A5D5b6",
      imageUrl: ROUTE_NFT_IMAGE_PREVIEW(`farza.png`),
      title: "Farza",
      paperId: "fcf69353-4915-47dd-a76b-9659106b4ed6",
      contractArgs: { tokenId: 1 },
    },
    {
      contractAddress: "0xC50Ee7a95AEcEb509f305AAff326481001A5D5b6",
      imageUrl: ROUTE_NFT_IMAGE_PREVIEW(`hans.png`),
      title: "Hans@Curd",
      paperId: "8081f09b-f034-4731-803d-9368e6629a65",
      contractArgs: { tokenId: 3 },
    },
    {
      contractAddress: "0xC50Ee7a95AEcEb509f305AAff326481001A5D5b6",
      imageUrl: ROUTE_NFT_IMAGE_PREVIEW(`winston.png`),
      title: "Winston@Curd",
      paperId: "59c0c1e6-65ea-46a8-9c8b-bc4894266568",
      contractArgs: { tokenId: 2 },
    },
    {
      contractAddress: "0x96559A1c39Ba491cb2b94A40CCee7Bb8DAdd574F",
      imageUrl: ROUTE_NFT_IMAGE_PREVIEW(`farza.png`),
      title: "Team BuildSpace",
      paperId: "e6656ac7-194c-4577-a649-0e1794cfc1c9",
      contractArgs: { tokenId: 4 },
    },
    {
      contractAddress: "0x96559A1c39Ba491cb2b94A40CCee7Bb8DAdd574F",
      imageUrl: ROUTE_NFT_IMAGE_PREVIEW(`jake.webp`),
      title: "Team Thirdweb",
      paperId: "877d71cc-ee54-4ed5-91cf-1a5b851e369a",
      contractArgs: { tokenId: 1 },
    },
    {
      contractAddress: "0x96559A1c39Ba491cb2b94A40CCee7Bb8DAdd574F",
      imageUrl: ROUTE_NFT_IMAGE_PREVIEW(`james.webp`),
      title: "Team Paper",
      paperId: "4a48b337-7e11-4c2b-87c6-8c8807bcbec7",
      contractArgs: { tokenId: 2 },
    },
    {
      contractAddress: "0x96559A1c39Ba491cb2b94A40CCee7Bb8DAdd574F",
      imageUrl: ROUTE_NFT_IMAGE_PREVIEW(`shaan.png`),
      title: "Team MilkRoad",
      paperId: "d87ce02a-4f9c-45cd-a090-238ec747404b",
      contractArgs: { tokenId: 3 },
    },
  ];
}

export async function getNftByAddress(contractAddress: string) {
  const nfts = await getNfts();
  return nfts.filter((nft) => {
    return nft.contractAddress === contractAddress;
  });
}
