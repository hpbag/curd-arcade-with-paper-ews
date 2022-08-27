/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Curd Arcade",
  titleTemplate: "%s | Curd Arcade",
  defaultTitle: "Curd Arcade",
  description: "Pay to Play, win real money",
  canonical: "https://curdinc.com",
  openGraph: {
    url: "https://curdinc.com",
    title: "Curd Arcade",
    description: "Pay to Play, win real money",
    images: [
      {
        url: "https://curdinc.com/android-chrome-192x192.png",
        alt: "curdinc.com og-image",
      },
    ],
    site_name: "curd-arcade",
  },
  twitter: {
    handle: "@curd_inc",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
