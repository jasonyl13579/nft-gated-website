import { ThirdwebProvider, metamaskWallet, paperWallet } from "@thirdweb-dev/react";
import Head from "next/head";
import { domainName, PAPER_WALLET_CLIENT_ID } from "../const/yourDetails";
import "../styles/globals.css";

// This is the chain your dApp will work on.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }) {
  //console.log(process.env);
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      authConfig={{
        domain: domainName,
        authUrl: "/api/auth",
      }}
      supportedWallets={[
        paperWallet({
            clientId:PAPER_WALLET_CLIENT_ID
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

export default MyApp;
