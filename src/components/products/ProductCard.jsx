import { formatCurrency } from "@/utils/helpers";

function ProductCard({ product }) {
  return (
    <div key={product.id} className=" flex cursor-pointer flex-col gap-3">
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
