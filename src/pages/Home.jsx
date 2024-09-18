import styled from "styled-components";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Carousel from "@/components/home/Carousel";
import Introduce from "@/components//home/Introduce";
import HomeProducts from "@/components/home/HomeProducts";
import CategoryMenu from "@/components/home/CategoryMenu";
import Heading from "@/components/ui/Heading";
import Slider from "@/components/home/Slider";
const breadcrumb = [];

const Slogan = styled.div`
  font-family: "Edu AU VIC WA NT Hand", cursive;
  font-optical-sizing: auto;
  font-weight: 469;
  font-style: normal;
`;

function Home() {
  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <Slogan className="text-3xl flex justify-center gap-5 capitalize -mt-12 -mb-6">
        Tranh trang trí Decorpic - "Hơn cả thế giới tranh đẹp, chúng tôi biết
        bạn cần gì"
      </Slogan>
      <Carousel />
      <Introduce />

      {/* <Slider /> */}

      <div className="flex flex-col gap-10 mt-10">
        <Heading
          as="h2"
          className="uppercase flex justify-center font-extrabold"
        >
          Danh mục tranh
        </Heading>
        <CategoryMenu />
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
      <div className="flex flex-col gap-10 mt-10">
        <Heading
          as="h2"
          className="uppercase flex justify-center font-extrabold"
        >
          Sản phẩm nổi bật
        </Heading>
        <HomeProducts />
      </div>
      <div className="flex flex-col gap-10 mt-10">
        <Heading
          as="h2"
          className="uppercase flex justify-center font-extrabold"
        >
          Dành cho bạn
        </Heading>
        <HomeProducts />
      </div>
    </>
  );
}

export default Home;
