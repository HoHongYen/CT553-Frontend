import BreadCrumb from "@/components/ui/BreadCrumb";
import Carousel from "@/components/home/Carousel";
import HomeProducts from "@/components/home/HomeProducts";
import Heading from "@/components/ui/Heading";
import CouponMenu from "@/components/hotdeals/CouponMenu";

const breadcrumb = [{ name: "Khuyến mại" }];

function HotDeals() {
  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <div className="flex justify-between">
        <Heading as="h1">Các chương trình khuyến mại</Heading>
      </div>
      <Carousel />

      <div className="flex flex-col gap-10 mt-10">
        <Heading
          as="h2"
          className="uppercase flex justify-center font-extrabold "
        >
          Coupons hiện có
        </Heading>
        <CouponMenu />
      </div>
      <div className="flex flex-col gap-10 mt-10">
        <Heading
          as="h2"
          className="uppercase flex justify-center font-extrabold"
        >
          Sản phẩm mới
        </Heading>
        <HomeProducts />
      </div>
    </>
  );
}

export default HotDeals;
