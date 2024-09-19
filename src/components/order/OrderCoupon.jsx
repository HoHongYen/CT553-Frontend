import { useCart } from "@/context/CartContext";
import DiscountBadge from "../cart/DiscountBadge";
import Heading from "../ui/Heading";
import { Link } from "react-router-dom";
import DiscountPrice from "../cart/DiscountPrice";
import { formatCurrency } from "@/utils/helpers";

function OrderCoupon() {
  const { cartItems } = useCart();

  return (
    <>
      {cartItems.map((cartItem, index) => (
        <div
          key={index}
          className="relative flex flex-col gap-4 bg-[var(--color-grey-0)] px-6 py-6 rounded-md shadow-[0_2px_12px_-3px_var(--color-blue-700)]"
        >
          <div className="flex gap-7">
            {/* image begin */}
            <div className="overflow-hidden w-[220px] h-[220px] max-sm:w-[220px] max-sm:h-[220px] shrink-0">
              <img
                src={cartItem.product.thumbnailImage.path}
                className="w-full h-full object-contain transition-all duration-700 hover:scale-105"
              />
            </div>
            {/* image end */}

            {/* discount badge begin */}
            <DiscountBadge cartItem={cartItem} />
            {/* discount badge end */}

            <div className="flex flex-col justify-around gap-2 w-full">
              <Link to={`/san-pham/${cartItem.product.slug}`}>
                <Heading
                  as="h2"
                  className="capitalize font-bold hover:text-[var(--color-brand-700)]"
                >
                  {cartItem.product.name}
                </Heading>
              </Link>

              <div className="flex items-center gap-2 mt-3">
                <span className="font-semibold mr-2">Mã sản phẩm:</span>{" "}
                {cartItem.product.id}
              </div>

              <div className="flex items-center gap-2 mt-3">
                <span className="font-semibold mr-2">Kích thước:</span>{" "}
                {cartItem.variant.size}
              </div>

              <div className="flex items-center gap-2 mt-3">
                <span className="font-semibold mr-2">Số lượng:</span>{" "}
                {cartItem.quantity}
              </div>

              {/* dicount price begin */}
              {cartItem.product.productDiscount.length > 0 && (
                <div className="mt-3">
                  <DiscountPrice cartItem={cartItem} />
                </div>
              )}
              {/* dicount price end */}

              <div className="flex items-center">
                <div className="mt-3 flex">
                  {cartItem.product.productDiscount.length > 0 ? (
                    <>
                      <span className="font-semibold mr-2">Giảm còn:</span>
                      <h3 className="text-[var(--color-red-600)] font-bold mt-auto">
                        {formatCurrency(cartItem.finalPricePerOne)}
                      </h3>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold mr-2">Giá:</span>
                      <h3 className="text-[var(--color-brand-700)] font-bold mt-auto">
                        {formatCurrency(cartItem.finalPricePerOne)}
                      </h3>
                    </>
                  )}
                </div>

                <div className="flex ml-auto">
                  <span className="font-bold mr-2">Thành tiền:</span>
                  <div className="font-bold text-[var(--color-brand-700)]">
                    {formatCurrency(
                      cartItem.finalPricePerOne * cartItem.quantity
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default OrderCoupon;
