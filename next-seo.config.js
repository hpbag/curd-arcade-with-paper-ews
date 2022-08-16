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
        url: "https://og-image.sznm.dev/**nextarter-chakra**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
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
