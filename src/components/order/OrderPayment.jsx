import { HiOutlineCurrencyDollar, HiOutlineTruck } from "react-icons/hi2";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import { ORDER_ACTIONS, useOrder } from "@/context/OrderContext";
import SpinnerMini from "../ui/SpinnerMini";
import { getRedirectUrlVNPAY } from "@/services/apiPayments";

function OrderPayment() {
  const { dispatch, paymentMethods, paymentMethod } = useOrder();

  const handlePayWithVNPAY = async () => {
    dispatch({
      type: ORDER_ACTIONS.SET_PAYMENT_METHOD,
      payload: { paymentMethod: paymentMethods[1] },
    });
    const redirectUrl = await getRedirectUrlVNPAY({
      orderId: "Decorpick-" + Date.now(),
      amount: "181103",
    });
    window.open(redirectUrl.metadata.redirectUrl, "_blank");
  };

  return (
    <div className="bg-[var(--color-grey-0)] rounded-md px-6 py-6 h-max shadow-[0_2px_12px_-3px_var(--color-blue-700)]">
      <div className="flex justify-center mb-8">
        <Heading
          className="flex items-center gap-3 text-[var(--color-brand-700)]"
          as="h2"
        >
          <HiOutlineCurrencyDollar />
          <span className="font-bold">Phương thức thanh toán</span>
        </Heading>
      </div>
      <div className="mt-8 space-y-2">
        <Button
          variation={
            paymentMethod?.id === paymentMethods[0].id ? "normal" : "secondary"
          }
          size="large"
          className="flex gap-5 items-center w-full"
          onClick={() =>
            dispatch({
              type: ORDER_ACTIONS.SET_PAYMENT_METHOD,
              payload: { paymentMethod: paymentMethods[0] },
            })
          }
        >
          <HiOutlineTruck className="text-[var(--color-grey-800)] w-10 h-10" />
          Thanh toán khi nhận hàng (COD)
        </Button>
        <Button
          variation={
            paymentMethod?.id === paymentMethods[1].id ? "normal" : "secondary"
          }
          size="large"
          className="flex gap-5 items-center w-full"
          onClick={handlePayWithVNPAY}
        >
          <img src="VNPAY.png" width="60" height="60" />
          Thanh toán trực tuyến (VNPAY)
        </Button>
      </div>
    </div>
  );
}

export default OrderPayment;
