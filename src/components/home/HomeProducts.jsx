import { useEffect, useState } from "react";

import { getHomeProducts, getProducts } from "@/services/apiProducts";
import { PRODUCT_NEWEST } from "@/utils/constants";

import ProductCard from "@/components/products/ProductCard";
import { Skeleton } from "antd";

function HomeProducts() {
  const [newestProducts, setNewestProducts] = useState([]);

  useEffect(() => {
    async function fetchNewestProducts() {
      const products = await getProducts({
        type: PRODUCT_NEWEST,
        limit: 10,
      });
      setNewestProducts(products.metadata.products);
    }

    fetchNewestProducts();
  });

  if (!newestProducts) {
    return <Skeleton active />;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-10 h-full">
        {newestProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-10"></div>
    </>
  );
}

export default HomeProducts;
