import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { getAssetUrl, getNftHoldings } from "lib/utils/getNftHoldings";
import { getWalletFromReq } from "lib/utils/getWalletFromReq";

const FlapSpacePage = ({
  imageLink,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <div id="game-container" datatype={imageLink} />;
};

export default FlapSpacePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params?.game !== "flap-space") {
    return { notFound: true };
  }

  try {
    const address = await getWalletFromReq(context.req.cookies);
    const nfts = await getNftHoldings(address);
    const assetUrl = getAssetUrl(nfts);
    return { props: { imageLink: assetUrl } };
  } catch (e) {
    const pathToComeBackTo = encodeURIComponent(context.req.url || "");
    return {
      redirect: {
        destination: `/login?redirect=${pathToComeBackTo}`,
        permanent: false,
      },
    };
  }
};
