import ProductCard from "@/components/products/ProductCard";
import { products } from "@/utils/constants";

function HomeProducts() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-10 h-full">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default HomeProducts;
