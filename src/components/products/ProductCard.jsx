import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { calculateRating, formatCurrency } from "@/utils/helpers";
import { Badge, Rate } from "antd";
import ButtonIcon from "../ui/ButtonIcon";
import {
  HiHeart,
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiShoppingCart,
} from "react-icons/hi2";

function ProductCard({ product }) {
  const getFinalPrice = (currentPrice) => {
    return product.productDiscount.length > 0
      ? product.productDiscount.at(0).discountType === "percentage"
        ? currentPrice -
          (currentPrice * product.productDiscount.at(0).discountValue) / 100
        : currentPrice - product.productDiscount.at(0).discountValue
      : currentPrice;
  };

  const { isProductInCart } = useCart();

  const isInCart = isProductInCart(product.id);

  const rating = calculateRating(product.reviews);

  return (
    <div
      key={product.id}
      className="relative flex flex-col justify-between gap-3"
    >
      {/* discount badge begin */}
      {product.productDiscount.length > 0 && (
        <div className="z-[999] absolute right-0 -top-8">
          {product.productDiscount.at(0)?.discountType === "percentage" ? (
            <Badge.Ribbon
              text={`-${product.productDiscount?.at(0).discountValue}%`}
              color="red"
            />
          ) : (
            <Badge.Ribbon
              text={`-${formatCurrency(
                product.productDiscount?.at(0).discountValue
              )}`}
              color="red"
            />
          )}
        </div>
      )}
      {/* discount badge end */}

      <Link to={`/san-pham/${product.slug}`} className="flex flex-col gap-3">
        <div className="overflow-hidden rounded-md">
          <img
            src={product.thumbnailImage.path}
            alt={product.name}
            className="transition-all duration-700 hover:scale-105"
            // className="p-3 transition ease-out hover:-translate-y-1 hover:scale-105 duration-700"
          />
        </div>
        <p className="capitalize font-semibold mt-3 hover:text-[var(--color-brand-700)]">
          {product.name}
        </p>
      </Link>

      <div>
        {product.productDiscount.length > 0 && (
          <p className="text-[var(--color-grey-400)] line-through">
            {product.variants[0].price !==
            product.variants[product.variants.length - 1].price
              ? formatCurrency(getFinalPrice(product.variants[0].price)) +
                " - " +
                formatCurrency(
                  getFinalPrice(
                    product.variants[product.variants.length - 1].price
                  )
                )
              : formatCurrency(getFinalPrice(product.variants[0].price))}
          </p>
        )}
        <p
          className={`font-bold text-[18px] ${
            product.productDiscount.length > 0
              ? "text-[var(--color-red-600)]"
              : "text-[var(--color-brand-700)]"
          }  `}
        >
          {product.variants[0].price !==
          product.variants[product.variants.length - 1].price
            ? formatCurrency(product.variants[0].price) +
              " - " +
              formatCurrency(
                product.variants[product.variants.length - 1].price
              )
            : formatCurrency(product.variants[0].price)}
        </p>
      </div>

      <div>
        <div>
          <Rate disabled value={rating} />
        </div>

        <div className="flex items-center">
          <p>Đã bán: {product.soldNumber}</p>
          <div className="ml-auto">
            <ButtonIcon variation="success">
              {isInCart ? <HiShoppingCart /> : <HiOutlineShoppingCart />}
            </ButtonIcon>
            <ButtonIcon variation="danger">
              {isInCart ? <HiHeart /> : <HiOutlineHeart />}
            </ButtonIcon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
