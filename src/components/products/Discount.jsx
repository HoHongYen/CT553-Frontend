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

  const { discountType, discountValue, startDate, endDate } =
    productDiscount[0];

  let finalPrice = selectedVariant?.price;
  if (discountType === "percentage") {
    finalPrice =
      selectedVariant?.price - (selectedVariant?.price * discountValue) / 100;
  } else finalPrice = selectedVariant?.price - discountValue;

  return (
    <div className="flex gap-5">
      <p className="text-4xl font-bold text-[var(--color-brand-700)]">
        {formatCurrency(finalPrice)}{" "}
      </p>
      <div className="flex items-center gap-2 text-[var(--color-red-700)]">
        <p className="line-through">{formatCurrency(selectedVariant?.price)}</p>
        <p>
          {discountType === "percentage"
            ? `-${discountValue}%`
            : `-${formatCurrency(discountValue)}`}
        </p>
      </div>
    </div>
  );
}

export default Discount;
