import ProductCard from "@/components/products/ProductCard";
import { useProducts } from "@/hooks/products/useProducts";
import { Skeleton } from "antd";

function HomeProducts() {
  const { isLoading, products } = useProducts();

  if (isLoading) return <Skeleton active />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-10 h-full">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default HomeProducts;
