import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { useGame } from "lib/components/flappyBird/useGame";
import { getAssetUrl, getNftHoldings } from "lib/utils/getNftHoldings";
import { getAddressFromCookies } from "lib/utils/getWalletFromReq";
import { GAME, isNewUser } from "lib/utils/redis";

const FlapSpacePage = ({
  imageLink,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useGame();
  return <div id="game-container" datatype={imageLink} />;
};

export default FlapSpacePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params?.game !== GAME) {
    return { notFound: true };
  }
  const pathToComeBackTo = encodeURIComponent(`/play/${context.params?.game}`);

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
    if (nfts.length === 0) {
      return {
        redirect: {
          destination: `/games/n%26w-buildspace?message=${encodeURIComponent(
            "Purchase a character first!"
          )}`,
          permanent: false,
        },
      };
    }
    const assetUrl = getAssetUrl(nfts);
    console.log(assetUrl);
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
