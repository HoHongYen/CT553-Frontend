import { Carousel as AntdCarousel } from "antd";

const images = [
  {
    id: 1,
    url: "https://bizweb.dktcdn.net/100/338/954/themes/734617/assets/slider_1.png?1719911520240",
  },
  {
    id: 2,
    url: "https://bizweb.dktcdn.net/100/338/954/themes/734617/assets/slider_2.png?1719911520240",
  },
  {
    id: 3,
    url: "https://bizweb.dktcdn.net/100/338/954/themes/734617/assets/slider_3.png?1719911520240",
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
