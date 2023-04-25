//import { CheckoutWithCard, PaperSDKProvider } from "@paperxyz/react-client-sdk";
export default function PaperCheckout({sdkClientSecret}) {
  return (
    <>
      {/* <PaperSDKProvider appName='My Web3 App' chainName="Mumbai">
        <CheckoutWithCard
          sdkClientSecret= {sdkClientSecret}
          onPaymentSuccess={(result) => {
            console.log("Payment successful.");
          }}
          onError={(error) => {
            console.error("Payment error:", error);
          }}
          options={{
            colorBackground: '#121212',
            colorPrimary: '#19A8D6',
            colorText: '#f0f0f0',
            borderRadius: 24,
          }}
        />
      </PaperSDKProvider> */}
      <>
        <p>{sdkClientSecret}</p>
      </>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}