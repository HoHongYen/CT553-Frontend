import { formatCurrency } from "@/utils/helpers";

function DiscountPrice({ cartItem }) {
  return (
    <>
      {cartItem.product.productDiscount.length > 0 && (
        <div>
          {cartItem.product.productDiscount.at(0)?.discountType ===
          "percentage" ? (
            <div className="flex items-center gap-2">
              <p className="font-semibold mr-3">Giá gốc:</p>
              <p className="line-through text-[var(--color-grey-400)]">
                {formatCurrency(cartItem.variant.price)}
              </p>
              <p className="text-[var(--color-red-600)]">
                {`-${cartItem.product.productDiscount.at(0).discountValue}%`}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="font-semibold mr-3">Giá gốc:</p>
              <p className="line-through text-[var(--color-grey-400)]">
                {formatCurrency(cartItem.variant.price)}
              </p>
              <p className="text-[var(--color-red-600)]">
                {`-${formatCurrency(
                  cartItem.product.productDiscount.at(0).discountValue
                )}`}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default DiscountPrice;
