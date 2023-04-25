
import { renderPaperCheckoutLink } from "@paperxyz/js-client-sdk"
import { useRouter } from "next/router";
export default function CheckoutButton({url}) {
  const router = useRouter();
  const openCheckout = () => renderPaperCheckoutLink({
    checkoutLinkUrl: url,
    onModalClosed: () => {
      router.push("/");
    }
  });

  return (
    <button onClick={openCheckout}>Buy with Paper</button>
  );
}
