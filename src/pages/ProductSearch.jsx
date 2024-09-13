import { useEffect, useState } from "react";

import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import BreadCrumb from "@/components/ui/BreadCrumb";
import CategoryFilterOperations from "@/components/categories/CategoryFilterOperations";
import ProductsList from "@/components/categories/ProductsList";
import PriceSlider from "@/components/categories/PriceSlider";
import { useSearchParams } from "react-router-dom";

function ProductSearch() {
  const [breadcrumb, setBreadcrumb] = useState([{ name: "" }]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setBreadcrumb([{ name: "Tìm kiếm" }]);
  }, []);

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <Heading as="h1">
        Hiển thị kết quả tìm kiếm cho <span className="italic">"{searchParams.get("s")}"</span>
      </Heading>
      <Row>
        <div className="flex flex-col gap-7">
          <div className="flex justify-between">
            <PriceSlider />
            <CategoryFilterOperations />
          </div>
          <ProductsList />
        </div>
      </Row>
    </>
  );
}

export default ProductSearch;
