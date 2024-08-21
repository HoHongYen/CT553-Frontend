import styled from "styled-components";
import BreadCrumb from "../ui/BreadCrumb";
import Carousel from "../features/home/Carousel";
import Introduce from "../features/home/Introduce";
import HomeProducts from "../features/home/HomeProducts";
import CategoryMenu from "../features/home/CategoryMenu";
import Heading from "../ui/Heading";
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
      <div className="flex flex-col gap-10 mt-10">
        <Heading as="h2" className="uppercase font-bold">
          Danh mục tranh
        </Heading>
        <CategoryMenu />
      </div>
      <div className="flex flex-col gap-10 mt-10">
        <Heading as="h2" className="uppercase font-bold">
          Sản phẩm mới
        </Heading>
        <HomeProducts />
      </div>
    </>
  );
}

export default Home;
