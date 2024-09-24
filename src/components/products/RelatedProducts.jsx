import { useRelatedProducts } from "@/hooks/products/useRelatedProducts";
import ProductCard from "./ProductCard";
import Heading from "../ui/Heading";

function RelatedProducts() {
  const { relatedProducts } = useRelatedProducts();
  return (
    <div>
      <Heading as="h2" className="uppercase flex justify-center font-extrabold mb-10">
        Sản phẩm tương tự
      </Heading>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-10 h-full">
        {relatedProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
