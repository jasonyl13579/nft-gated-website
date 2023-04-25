
import {
  PAPER_WALLET_CONTRACT_ID,
} from "../const/yourDetails";

const PAPER_WALLET_AUTH_KEY = process.env.PAPER_WALLET_AUTH_KEY;
if (!PAPER_WALLET_AUTH_KEY) {
  throw new Error("You need to add an PAPER_WALLET_AUTH_KEY environment variable.");
}

export async function getClientSecretFromPaper(address, email) {
  
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${PAPER_WALLET_AUTH_KEY}`
    },
    body: JSON.stringify({
      contractId: PAPER_WALLET_CONTRACT_ID,
      walletAddress: address,
      title: 'Speyside NFT checkout',
      email: email,
      quantity: 1,
      expiresInMinutes: 15,
      metadata: {},
      feeBearer: 'BUYER',
      sendEmailOnTransferSucceeded: true,
      capturePaymentLater: false
    })
  };
  return fetch('https://withpaper.com/api/2022-08-12/checkout-sdk-intent', options)
      .then((response)=>response.json())
      .then((responseJson)=>{return responseJson});
}

export async function getOneTimeCheckoutLink(address, email) {
  console.log(address);
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${PAPER_WALLET_AUTH_KEY}`
    },
    body: JSON.stringify({
      contractId: PAPER_WALLET_CONTRACT_ID,
      title: 'Doggy NFT example',
      email: email, 
      walletAddress: address,
      description: 'Describe your project *with Markdown!*',
      //imageUrl: 'https://unsplash.it/240/240',
      expiresInMinutes: 15,
      limitPerTransaction: 5,
      redirectAfterPayment: false,
      sendEmailOnCreation: false,
      requireVerifiedEmail: false,
      quantity: 1,
      metadata: {},
      feeBearer: 'BUYER',
      hideNativeMint: true,
      hidePaperWallet: false,
      hideExternalWallet: true,
      hidePayWithCard: false,
      hidePayWithCrypto: false,
      hidePayWithIdeal: true,
      sendEmailOnTransferSucceeded: true
    })
  };
  
  return fetch('https://withpaper.com/api/2022-08-12/checkout-link-intent', options)
  .then((response)=>response.json())
  .then((responseJson)=>{return responseJson})
  .catch((err)=>{return {err}});
      
}
