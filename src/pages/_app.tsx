/* eslint-disable react/jsx-props-no-spreading */
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

import { Chakra } from "lib/components/Chakra";
import { BASE_URL } from "lib/constants/routes";
import Layout from "lib/layout";
import "lib/styles/globals.css";
import defaultSEOConfig from "../../next-seo.config";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const desiredChainId = ChainId.Polygon;
  return (
    <ThirdwebProvider
      desiredChainId={desiredChainId}
      chainRpc={{ [desiredChainId]: "https://polygon-rpc.com" }}
      authConfig={{
        domain: BASE_URL,
        authUrl: "/api/auth",
      }}
    >
      <Chakra>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        <DefaultSeo {...defaultSEOConfig} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Chakra>
    </ThirdwebProvider>
  );
};

export default MyApp;
