import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { isCheckingout, checkout } = useCheckout();

  return (
    <Button
      size="small"
      variation="primary"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
