import Heading from "../ui/Heading";
import Button from "../ui/Button";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";

function OrderPayment() {
  return (
    <div className="bg-[var(--color-grey-0)] rounded-md px-6 py-6 h-max shadow-[0_2px_12px_-3px_var(--color-blue-700)]">
      <div className="flex justify-center mb-8">
        <Heading className="flex items-center gap-3 text-[var(--color-brand-700)]" as="h2">
          <HiOutlineCurrencyDollar />
          <span className="font-bold">Phương thức thanh toán</span>
        </Heading>
      </div>
      <div className="mt-8 space-y-2">
        <Button variation="primary" size="large" className="w-full">
          Thanh toán trực tuyến qua VNPAY
        </Button>
        <Button variation="secondary" size="large" className="w-full">
          Thanh toán khi nhận hàng (COD)
        </Button>
      </div>
    </div>
  );
}

export default OrderPayment;
