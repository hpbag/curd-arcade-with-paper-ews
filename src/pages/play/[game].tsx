import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { getAssetUrl, getNftHoldings } from "lib/utils/getNftHoldings";
import { getAddressFromCookies } from "lib/utils/getWalletFromReq";
import { isNewUser } from "lib/utils/redis";

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
  const pathToComeBackTo = encodeURIComponent(context.req.url || "");

  try {
    const address = await getAddressFromCookies(context.req.cookies);
    if (await isNewUser(address)) {
      return {
        redirect: {
          destination: `/onboard?redirect=${pathToComeBackTo}`,
          permanent: false,
        },
      };
    }
    const nfts = await getNftHoldings(address);
    const assetUrl = getAssetUrl(nfts);
    return { props: { imageLink: assetUrl } };
  } catch (e) {
    return {
      redirect: {
        destination: `/login?redirect=${pathToComeBackTo}`,
        permanent: false,
      },
    };
  }
};
