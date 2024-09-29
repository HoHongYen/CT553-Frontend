import { formatCurrency } from "@/utils/helpers";
import { Statistic } from "antd";
const { Countdown } = Statistic;

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
        </p>,
        <div className="ml-1 flex items-center gap-3">
          <p>kết thúc sau:</p>
          <Countdown
            format="D ngày H giờ m phút s giây"
            contentFontSize={15}
            value={product.productDiscount[0].endDate}
            valueStyle={{ color: "#f50", fontSize: 17, fontWeight: "bold" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Discount;
