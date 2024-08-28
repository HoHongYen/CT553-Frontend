import { Link } from "react-router-dom";
import { formatCurrency, formatDate } from "@/utils/helpers";

function ProductCard({ product }) {
  return (
    <Link
      to={`/san-pham/${product.id}`}
      key={product.id}
      className=" flex cursor-pointer flex-col gap-3"
    >
      <div className="overflow-hidden">
        <img
          src={product.image.path}
          alt={product.name}
          className="transition-all duration-700 hover:scale-105"
          // className="p-3 transition ease-out hover:-translate-y-1 hover:scale-105 duration-700"
        />
      </div>
      <p className="capitalize mt-3">{product.name}</p>
      <div>
        {product.isDiscount && (
          <p className="text-[var(--color-grey-400)] line-through">
            {formatCurrency(2000000)}{" "}
          </p>
        )}
        <p className="font-bold text-[var(--color-brand-700)]">
          {formatCurrency(product.price)}{" "}
        </p>
      </div>
      <p>{formatDate(product.created_at)}</p>
    </Link>
  );
}

export default ProductCard;
