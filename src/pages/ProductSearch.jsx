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
  const [products, setProducts] = useState();

  const { fullTextSearchResult, semanticSearchResult } =
    useSearchProductByText();

  const { products: imageSearchResult } = useSearchProductByImage();

  useEffect(() => {
    setBreadcrumb([{ name: "Tìm kiếm" }]);
  }, []);

  // useEffect(() => {
  //   if (searchParams.get("s")) {
  //     console.log("fullTextSearchResult", fullTextSearchResult);
  //     console.log("semanticSearchResult", semanticSearchResult);
  //     setProducts([...fullTextSearchResult, ...semanticSearchResult]);
  //   }
  //   if (searchParams.get("imageUrl")) {
  //     console.log("imageSearchResult", imageSearchResult);
  //     setProducts(imageSearchResult);
  //   }
  // }, [fullTextSearchResult, semanticSearchResult, imageSearchResult]);

  useEffect(() => {
    if (searchParams.get("s") !== "") {
      console.log("fullTextSearchResult", fullTextSearchResult);
      console.log("semanticSearchResult", semanticSearchResult);
      setProducts([...fullTextSearchResult, ...semanticSearchResult]);
    }
  }, [fullTextSearchResult, semanticSearchResult]);

  if (!products) {
    return <Skeleton active />;
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-96 ">
        <Heading as="h2">Không tìm thấy sản phẩm nào!</Heading>
      </div>
    );
  }

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <div className="flex justify-between items-center">
        <Heading as="h1">
          Hiển thị tất cả kết quả tìm kiếm cho{" "}
          <span className="italic">"{searchParams.get("s")}"</span>
        </Heading>
        <p>{products.length} kết quả được tìm thấy</p>
      </div>
      <Row>
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
