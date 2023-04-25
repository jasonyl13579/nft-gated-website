import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
const DOMINE_NAME = process.env.NEXT_PUBLIC_URL;
if (!DOMINE_NAME) {
  throw new Error("You need to add an NEXT_PUBLIC_URL environment variable.");
}

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: DOMINE_NAME,
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
});
