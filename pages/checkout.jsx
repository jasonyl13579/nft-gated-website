import React, { useEffect } from "react";
import { ConnectWallet, UserWallet, useAddress, usePaperWalletUserEmail, useWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { getOneTimeCheckoutLink } from '../util/paperApi';
import CheckoutButton from "../components/CheckoutButton";
import { getUser } from "../auth.config";
import { useRouter } from "next/router";
export default function Checkout({url}) {
  const address = useAddress(); // Get the user's address
  const emailQuery = usePaperWalletUserEmail();
  const router = useRouter();
  const wallet = useWallet();
  console.log(wallet?.walletId);
  useEffect(() => {
    if (emailQuery.isSuccess && router.query.email != emailQuery.data) {
      console.log(router.query);
      router.push("/checkout?email=" + emailQuery.data);
    }
  }, [emailQuery.isSuccess, emailQuery.isLoading]);
  
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>NFT Checkout</h1>
      <p className={styles.explain}>
        We detected that you don't have any NFT <br></br>
        Buy our membership with simple flow!
        After buying you can access our{" "}
        <Link className={styles.purple} href="/">
          main page
        </Link>{" "}
      </p>
      <>
        {address ? (
          <p>
            Welcome, start your checkout process by Buy with Paper!
          </p>
        ) : (
          <p>Please connect your wallet to continue.</p>
        )}

        <ConnectWallet accentColor="#F213A4" />
      </>
      <hr className={styles.divider} />
      <>
        {(!emailQuery.isSuccess && wallet?.walletId == 'PaperWallet') ? (
          <div>
            Loading...
          </div>
        ) : (
            /*<PaperCheckout 
              sdkClientSecret={sdkClientSecret}
            ></PaperCheckout>*/
            <CheckoutButton  
              className={styles.secondaryButton}
              url = {url}
            >
              Start checkout 
            </CheckoutButton>
        )}
      </>
    </div>
  );
}

export async function getServerSideProps(context) {
  let email;
  const user = await getUser(context.req);
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  if (context.query?.email) {
    console.log(context.query?.email);
    email = context.query?.email; 
  } 
  //const response = await getClientSecretFromPaper(user.address, context.query?.email);
  const response = await getOneTimeCheckoutLink(user.address, context.query?.email);
  console.log(response);
  if (response.error) {
    throw new Error("Error with Paper.");
  }
  return {
    props: {
      url: response.checkoutLinkIntentUrl
    }
  }
}