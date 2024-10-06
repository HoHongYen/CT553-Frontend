import { Carousel as AntdCarousel } from "antd";

const images = [
  {
    id: 1,
    url: "https://miahome.vn/wp-content/uploads/2024/10/tranh-son-mai-giam-gia-giai-phogn-thu-do-22-768x280.webp",
  },
  {
    id: 2,
    url: "https://miahome.vn/wp-content/uploads/2024/10/banner-20-10-1024x373.webp",
  },
];

function Carousel() {
  return (
    <AntdCarousel arrows autoplay>
      {images.map((image) => (
        <img key={image.id} src={image.url} className="w-full" />
      ))}
    </AntdCarousel>
  );
}

export default Carousel;
