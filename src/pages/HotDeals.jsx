import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useCoupons } from "@/hooks/coupons/useCoupons";
import { PRODUCT_SALES } from "@/utils/constants";
import { getHomeProducts } from "@/services/apiProducts";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Carousel from "@/components/hotdeals/Carousel";
import HomeProducts from "@/components/home/HomeProducts";
import Heading from "@/components/ui/Heading";
import CouponMenu from "@/components/hotdeals/CouponMenu";

const breadcrumb = [{ name: "Khuyến mại" }];

function HotDeals() {
  const [hasDiscountProducts, setHasDiscountProducts] = useState([]);
  const { coupons } = useCoupons();

  useEffect(() => {
    async function fetchHasDiscountProducts() {
      const products = await getHomeProducts({
        type: PRODUCT_SALES,
        limit: 10,
      });
      setHasDiscountProducts(products.metadata.products);
    }
    fetchHasDiscountProducts();
  });

  return (
    <>
      <Helmet>
        <title>Khuyến mại</title>
      </Helmet>
      <BreadCrumb breadcrumb={breadcrumb} />
      <div className="flex justify-between">
        <Heading as="h1">Các chương trình khuyến mại</Heading>
      </div>
      <Carousel />

      {coupons.length > 0 && (
        <div className="flex flex-col gap-10 mt-10">
          <Heading
            as="h2"
            className="uppercase flex justify-center font-extrabold "
          >
            Coupons hiện có
          </Heading>
          <CouponMenu coupons={coupons} />
        </div>
      )}
      {hasDiscountProducts.length > 0 && (
        <div className="flex flex-col gap-10 mt-10">
          <Heading
            as="h2"
            className="uppercase flex justify-center font-extrabold"
          >
            Sản phẩm đang giảm giá
          </Heading>
          <HomeProducts products={hasDiscountProducts} />
        </div>
      )}
    </>
  );
}

export default HotDeals;
