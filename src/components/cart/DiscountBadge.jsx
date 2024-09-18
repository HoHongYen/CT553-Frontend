import { formatCurrency } from "@/utils/helpers";
import { Badge } from "antd";

function DiscountBadge({ cartItem }) {
  return (
    <>
      {cartItem.product.productDiscount.length > 0 && (
        <div className="absolute -right-1 -top-8">
          {cartItem.product.productDiscount.at(0)?.discountType ===
          "percentage" ? (
            <Badge.Ribbon
              text={`-${
                cartItem.product.productDiscount?.at(0).discountValue
              }%`}
              color="red"
            />
          ) : (
            <Badge.Ribbon
              text={`-${formatCurrency(
                cartItem.product.productDiscount?.at(0).discountValue
              )}`}
              color="red"
            />
          )}
        </div>
      )}
    </>
  );
}

export default DiscountBadge;
