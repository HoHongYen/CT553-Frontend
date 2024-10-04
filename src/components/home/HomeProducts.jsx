import { Skeleton } from "antd";
import ProductCard from "@/components/products/ProductCard";

function HomeProducts({ products }) {
  if (!products) {
    return <Skeleton active />;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-10 h-full">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default HomeProducts;
