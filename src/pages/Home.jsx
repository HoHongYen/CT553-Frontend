import {
  PRODUCT_NEWEST,
  PRODUCT_SALES,
  PRODUCT_TRENDING,
} from "@/utils/constants";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useUser } from "@/hooks/profile/useUser";
import { useTopReviews } from "@/hooks/reviews/useTopReviews";
import { useShopInfo } from "@/hooks/shopInfo/useShopInfo";
import TopReviews from "@/components/home/TopReviews";
import {
  getHomeProducts,
  getRecommendedProducts,
} from "@/services/apiProducts";
import styled from "styled-components";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Carousel from "@/components/home/Carousel";
import Introduce from "@/components//home/Introduce";
import HomeProducts from "@/components/home/HomeProducts";
import CategoryMenu from "@/components/home/CategoryMenu";
import Heading from "@/components/ui/Heading";
import Spinner from "@/components/ui/Spinner";
const breadcrumb = [];

export const Slogan = styled.div`
  font-family: "Edu AU VIC WA NT Hand", cursive;
  font-optical-sizing: auto;
  font-weight: 469;
  font-style: normal;ca
`;

function Home() {
  const { user, isLoading: isLoading1 } = useUser();
  const { shopInfo, isLoading: isLoading2 } = useShopInfo();

  const [newestProducts, setNewestProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [hasDiscountProducts, setHasDiscountProducts] = useState([]);
  const [forYouProducts, setForYouProducts] = useState([]);

  const { topReviews } = useTopReviews();

  useEffect(() => {
    async function fetchNewestProducts() {
      const products = await getHomeProducts({
        type: PRODUCT_NEWEST,
        limit: 10,
      });
      setNewestProducts(products.metadata.products);
    }

    async function fetchBestSellerProducts() {
      const products = await getHomeProducts({
        type: PRODUCT_TRENDING,
        limit: 10,
      });
      setBestSellerProducts(products.metadata.products);
    }

    async function fetchHasDiscountProducts() {
      const products = await getHomeProducts({
        type: PRODUCT_SALES,
        limit: 10,
      });
      setHasDiscountProducts(products.metadata.products);
    }

    async function fetchForYouProducts() {
      if (user) {
        const products = await getRecommendedProducts(
          localStorage.getItem("accesstoken")
        );
        setForYouProducts(products.metadata);
      }
      console.log("forYouProducts", forYouProducts);
    }

    fetchNewestProducts();
    fetchBestSellerProducts();
    fetchHasDiscountProducts();
    fetchForYouProducts();
  }, []);

  if (isLoading1 || isLoading2) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>Decorpic</title>
      </Helmet>
      <BreadCrumb breadcrumb={breadcrumb} />
      <Slogan className="text-3xl flex justify-center gap-5 capitalize -mt-12 -mb-6">
        {shopInfo.slogan}
      </Slogan>
      <Carousel />
      <Introduce />

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
        <HomeProducts products={newestProducts} />
      </div>
      <div className="flex flex-col gap-10 mt-10">
        <Heading
          as="h2"
          className="uppercase flex justify-center font-extrabold"
        >
          Sản phẩm nổi bật
        </Heading>
        <HomeProducts products={bestSellerProducts} />
      </div>
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
      {user && forYouProducts.length > 0 && (
        <div className="flex flex-col gap-10 mt-10">
          <Heading
            as="h2"
            className="uppercase flex justify-center font-extrabold"
          >
            Dành cho bạn
          </Heading>
          {}
          <HomeProducts products={forYouProducts} />
        </div>
      )}
      {topReviews.length > 0 && (
        <div className="flex flex-col gap-10 mt-10">
          <Heading
            as="h2"
            className="uppercase flex justify-center font-extrabold"
          >
            Đánh giá của khách hàng
          </Heading>
          <TopReviews topReviews={topReviews} />
        </div>
      )}
    </>
  );
}

export default Home;
