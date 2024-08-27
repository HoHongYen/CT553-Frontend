import ProductCard from "@/components/products/ProductCard";
import { useSearchParams } from "react-router-dom";

import { products } from "@/utils/constants";
import Heading from "../ui/Heading";

function ProductsList() {
  const [searchParams] = useSearchParams();

  // 1. Filter
  const filterValue = searchParams.get("discount") || "all";
  let filteredProducts;
  if (filterValue === "all") filteredProducts = products;
  if (filterValue === "no-discount")
    filteredProducts = products.filter((product) => !product.isDiscount);
  if (filterValue === "with-discount")
    filteredProducts = products.filter((product) => product.isDiscount);

  if (searchParams.get("minPrice")) {
    const minPrice = parseInt(searchParams.get("minPrice"));
    const maxPrice = parseInt(searchParams.get("maxPrice"));
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }

  // 2. Sort
  const sortBy = searchParams.get("sortBy") || "created_at-decs";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (field === "name") {
      return a[field].localeCompare(b[field]) * modifier;
    }
    if (field === "created_at") {
      return (new Date(a[field]) - new Date(b[field])) * modifier;
    }
    return (a[field] - b[field]) * modifier;
  });

  if (sortedProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-96 ">
        <Heading as="h2">Không tìm thấy sản phẩm nào!</Heading>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-10 h-full">
      {sortedProducts?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsList;
