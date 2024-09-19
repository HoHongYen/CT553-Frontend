import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/helpers";
import { HiOutlineNewspaper } from "react-icons/hi2";
import Heading from "../ui/Heading";

function OrderSummary() {
  const { totalItems, totalPrices } = useCart();

  return (
    <div className="bg-[var(--color-grey-0)] rounded-md px-6 py-6 h-max shadow-[0_2px_12px_-3px_var(--color-blue-700)]">
      <div className="flex justify-center mb-8">
        <Heading
          className="flex items-center gap-3 text-[var(--color-brand-700)]"
          as="h2"
        >
          <HiOutlineNewspaper />
          <span className="font-bold">Tóm tắt đơn hàng</span>
        </Heading>
      </div>
      <ul className="space-y-4">
        <li className="flex flex-wrap gap-4 ">
          Số sản phẩm{" "}
          <span className="ml-auto font-bold">{totalItems} sản phẩm</span>
        </li>
        <li className="flex flex-wrap gap-4">
          Tổng tiền hàng{" "}
          <span className="ml-auto font-bold">
            {formatCurrency(totalPrices)}
          </span>
        </li>
        <li className="flex flex-wrap gap-4 ">
          Phí giao hàng <span className="ml-auto font-bold">Chưa tính</span>
        </li>
        <hr className="border-[var(--color-grey-300)]" />
        <li className="flex flex-wrap gap-4 font-bold">
          Tổng tiền cần thanh toán{" "}
          <span className="text-[var(--color-brand-700)] font-bold ml-auto">
            {formatCurrency(totalPrices)}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default OrderSummary;
