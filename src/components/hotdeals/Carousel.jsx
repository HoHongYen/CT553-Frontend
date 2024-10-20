import { useHotDealBanners } from "@/hooks/banners/useHotDealBanners";
import { Carousel as AntdCarousel } from "antd";

function Carousel() {
  const { hotDealBanners } = useHotDealBanners();
  console.log("hotDealBanners", hotDealBanners);

  return (
    <AntdCarousel arrows autoplay>
      {hotDealBanners.map((banner) => (
        <img key={banner.id} src={banner.image.path} className="w-full" />
      ))}
    </AntdCarousel>
  );
}

export default Carousel;
