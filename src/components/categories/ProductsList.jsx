import { useProducts } from "@/hooks/products/useProducts";

import ProductCard from "@/components/products/ProductCard";
import Heading from "../ui/Heading";
import Pagination from "../ui/Pagination";

function ProductsList() {
  const { products, totalProducts, totalPages } = useProducts();

  if (totalProducts === 0) {
    return (
      <div className="flex justify-center items-center h-96 ">
        <Heading as="h2">Không tìm thấy sản phẩm nào!</Heading>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10 h-full">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-10">
        <Pagination count={totalProducts} totalPages={totalPages} />
      </div>
    </>
  );
}

export default ProductsList;
