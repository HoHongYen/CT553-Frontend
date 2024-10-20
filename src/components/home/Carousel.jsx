import { useHomeBanners } from "@/hooks/banners/useHomeBanners";
import { Carousel as AntdCarousel } from "antd";

function Carousel() {
  const { homeBanners } = useHomeBanners();
  console.log(homeBanners);

  return (
    <AntdCarousel arrows autoplay>
      {homeBanners.map((image) => (
        <img key={image.id} src={image.image.path} className="w-full" />
      ))}
    </AntdCarousel>
  );
}

export default Carousel;
