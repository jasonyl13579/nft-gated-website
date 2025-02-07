import { ConnectWallet, useAddress} from "@thirdweb-dev/react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Login() {
  const address = useAddress(); // Get the user's address
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Auth - NFT Gated Content</h1>
      <p className={styles.explain}>
        Serve exclusive content to users who own an NFT from your collection,
        using{" "}
        <b>
          <a
            href="https://portal.thirdweb.com/building-web3-apps/authenticating-users"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.purple}
          >
            Auth
          </a>
        </b>
        !
      </p>

      <p className={styles.explain}>
        You cannot access the{" "}
        <Link className={styles.purple} href="/">
          main page
        </Link>{" "}
        unless you own an NFT from our collection!
      </p>

      <hr className={styles.divider} />

      <>
        {address ? (
          <p>
            Welcome, {address?.slice(0, 6)}...{address?.slice(-4)} <br></br>    
          </p>
        ) : (
          <p>Please connect your wallet to continue.</p>
        )}
        <ConnectWallet accentColor="#F213A4" />

        {address && (
          <Link href="/">
            <button  
              className={styles.secondaryButton}         
            >
              Visit main page after signing
            </button>
          </Link>
        )}
      </>
    </div>
  );
}
