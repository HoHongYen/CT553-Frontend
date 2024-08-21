import { formatCurrency } from "../../utils/helpers";

function ProductCard({ product }) {
  return (
    <div key={product.id} className="flex cursor-pointer flex-col gap-3">
      <img
        src={product.image.path}
        alt={product.name}
        className="transition duration-150 ease-out hover:ease-in"
      />
      <p className="capitalize mt-3">{product.name}</p>
      <div>
        {product.isDiscount && (
          <p className="text-gray-400 line-through">
            {formatCurrency(2000000)}{" "}
          </p>
        )}
        <p className="font-bold text-[var(--color-brand-700)]">
          {formatCurrency(product.price)}{" "}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
