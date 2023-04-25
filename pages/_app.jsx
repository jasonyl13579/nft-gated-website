import { ThirdwebProvider, metamaskWallet, paperWallet } from "@thirdweb-dev/react";
import Head from "next/head";
import "../styles/globals.css";
import App from "next/app";

// This is the chain your dApp will work on.
const activeChain = "mumbai";

function MyApp({ Component, pageProps, domainName, paperWalletClientId}) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      authConfig={{
        domain: domainName,
        authUrl: "/api/auth",
      }}
      supportedWallets={[
        paperWallet({
            clientId:paperWalletClientId
        }),
        metamaskWallet()
    ]}
    >
      <Head>
        <title>NFT Gated Website</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Learn how to use the thirdweb Auth SDK to create an NFT Gated Website"
        />
      </Head>
      <Component {...pageProps} />
      {/* <ThirdwebGuideFooter /> */}
    </ThirdwebProvider>
  );
}
MyApp.getInitialProps = async (context) => {
  const ctx = await App.getInitialProps(context);
  const DOMINE_NAME = process.env.DOMINE_NAME;
  if (!DOMINE_NAME) {
    throw new Error("You need to add an DOMINE_NAME environment variable.");
  }
  const PAPER_WALLET_CLIENT_ID = process.env.PAPER_WALLET_CLIENT_ID;
  if (!PAPER_WALLET_CLIENT_ID) {
    throw new Error("You need to add an PAPER_WALLET_CLIENT_ID environment variable.");
  }
  

  return { ...ctx, domainName: DOMINE_NAME, paperWalletClientId: PAPER_WALLET_CLIENT_ID };
};

export default MyApp;


