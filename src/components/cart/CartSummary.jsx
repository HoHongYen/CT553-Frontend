import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/helpers";
import Heading from "../ui/Heading";
import Button from "../ui/Button";

function CartSummary({ isCartDrawer = false }) {
  const navigate = useNavigate();
  const { totalItems, totalPrices } = useCart();

  return (
    <div className="bg-[var(--color-grey-0)] rounded-md px-6 py-6 h-max shadow-[0_2px_12px_-3px_var(--color-blue-700)]">
      <div className="flex justify-center mb-8">
        <Heading as="h2">Tóm tắt giỏ hàng</Heading>
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
          Tạm tính{" "}
          <span className="text-[var(--color-brand-700)] font-bold ml-auto">
            {formatCurrency(totalPrices)}
          </span>
        </li>
      </ul>

      {isCartDrawer ? (
        <div className="mt-8 space-y-2">
          <Button variation="primary" size="large" className="w-full">
            Tiến hành đặt hàng
          </Button>
          <Button
            onClick={() => navigate("/gio-hang")}
            variation="secondary"
            size="large"
            className="w-full"
          >
            Xem chi tiết giỏ hàng &rarr;
          </Button>
        </div>
      ) : (
        <div className="mt-8 space-y-2">
          <Button
            onClick={() => navigate("/dat-hang")}
            variation="primary"
            size="large"
            className="w-full"
          >
            Tiến hành đặt hàng
          </Button>
          <Button
            onClick={() => navigate(-2)}
            variation="secondary"
            size="large"
            className="w-full"
          >
            Tiếp tục xem sản phẩm &rarr;
          </Button>
        </div>
      )}
    </div>
  );
}

export default CartSummary;
