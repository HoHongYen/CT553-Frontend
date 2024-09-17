import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchProductByText } from "@/hooks/products/useSearchProductByText";
import { useSearchProductByImage } from "@/hooks/products/useSearchProductByImage";

import { Skeleton } from "antd";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import BreadCrumb from "@/components/ui/BreadCrumb";
import ProductCard from "@/components/products/ProductCard";

function ProductSearch() {
  const [breadcrumb, setBreadcrumb] = useState([{ name: "" }]);
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  const [isImageSearch, setIsImageSearch] = useState(false);

  const { fullTextSearchResult, semanticSearchResult } =
    useSearchProductByText();

  const { products: imageSearchResult } = useSearchProductByImage();

  useEffect(() => {
    setBreadcrumb([{ name: "Tìm kiếm" }]);
  }, []);

  useEffect(() => {
    const isImageSearching = searchParams.get("imageUrl") !== null;

    if (isImageSearching) {
      setProducts(imageSearchResult);
      console.log("products as imageSearchResult", products);
    } else {
      setProducts([...fullTextSearchResult, ...semanticSearchResult]);
    }

    setIsImageSearch(isImageSearching);
  }, [imageSearchResult]);

  if (!products) {
    return <Skeleton active />;
  }

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />

      {!isImageSearch ? (
        <div className="flex justify-between items-center">
          <Heading as="h1">
            <div>Hiển thị tất cả kết quả tìm kiếm cho </div>
            <span className="italic">"{searchParams.get("s")}"</span>
          </Heading>
          <p>{products.length} kết quả được tìm thấy</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <Heading as="h1">
              <div>Hiển thị tất cả kết quả tìm kiếm cho hình ảnh:</div>
            </Heading>
            <p>{products.length} kết quả được tìm thấy</p>
          </div>
          <div className="flex gap-8 h-[25vh] min-w-[30vw] w-[30vw] max-w-[40vw]">
            <div className="overflow-hidden border-2 border-dashed border-[var(--color-grey-300)] ">
              <img
                src={searchParams.get("imageUrl")}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </>
      )}
      <Row>
        {products.length === 0 && (
          <div className="flex justify-center items-center h-96 ">
            <Heading as="h2">Không tìm thấy sản phẩm nào!</Heading>
          </div>
        )}
        <div className="flex flex-col gap-7">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-10 h-full">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Row>
    </>
  );
}

export default ProductSearch;
