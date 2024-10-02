import { formatCurrency } from "@/utils/helpers";

function Discount({ product, selectedVariant }) {
  const { productDiscount } = product;

  if (!productDiscount || productDiscount.length === 0) {
    return (
      <div className="flex gap-5">
        <p className="text-4xl font-bold text-[var(--color-brand-700)]">
          {formatCurrency(selectedVariant?.price)}{" "}
        </p>
      </div>
    );
  }

  const { discountType, discountValue } =
    productDiscount[0];

  let finalPrice = selectedVariant?.price;
  if (discountType === "percentage") {
    finalPrice =
      selectedVariant?.price - (selectedVariant?.price * discountValue) / 100;
  } else finalPrice = selectedVariant?.price - discountValue;

  return (
    <div className="flex gap-5 -mt-5">
      <p className="text-4xl font-bold text-[var(--color-red-600)]">
        {formatCurrency(finalPrice)}{" "}
      </p>
      <div className="flex items-center gap-2">
        <p className="line-through text-[var(--color-grey-400)]">
          {formatCurrency(selectedVariant?.price)}
        </p>
        <p className="text-[var(--color-red-600)]">
          {discountType === "percentage"
            ? `-${discountValue}%`
            : `-${formatCurrency(discountValue)}`}
        </p>
      </div>
    </div>
  );
}

export default Discount;
