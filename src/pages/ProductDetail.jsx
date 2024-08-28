import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/helpers";

import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Spinner from "@/components/ui/Spinner";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ProductDescription from "@/components/products/ProductDescription";

function ProductDetail() {
  const product = {
    id: 1,
    name: "Lovely cành hồng nghệ thuật TG3338",
    image: {
      path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
    },
    images: [
      {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
      },
      {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2023/12/3-2.jpg",
      },
      {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2023/12/6.jpg",
      },
      {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2023/12/4.jpg",
      },
      {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2023/12/maket-3-2.jpg",
      },
    ],
    price: [1100000, 1400000],
    isDiscount: true,
    created_at: "2024-08-20T11:21:56.337Z",
    soldNumber: 100,
    size: ["30x40cm", "40x60cm", "50x70cm"],
    overview:
      "Bức tranh “Lá cây phủ màu trầm – Tranh lá cây treo tường LC004-29” là một kiệt tác nghệ thuật, kết hợp giữa vẻ đẹp tự nhiên và sự tinh tế trong thiết kế. Tác phẩm này thổi hồn vào không gian sống của bạn bằng hình ảnh tuyệt vời của lá cây, tạo ra một không gian gần gũi với thiên nhiên ngay trong lòng căn phòng.",
    variants: [
      {
        size: "40x60cm",
        price: 1100000,
      },
      {
        size: "50x70cm",
        price: 1400000,
      },
    ],
    specification:
      "Quy cách chất liệu tráng gương cao cấp: Công nghệ in Uv in trực tiếp lên mica, mực Uv Mỹ.",
  };

  const [breadcrumb, setBreadcrumb] = useState([
    { name: "Tranh theo vị trí" },
    { name: "Tranh phòng ngủ" },
    { name: "Lovely cành hồng nghệ thuật TG3338" },
  ]);

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  // useEffect(() => {
  //   setBreadcrumb([{ name: category?.name }]);
  // }, [categories, slug]);

  // if (isLoading) return <Spinner />;

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <Row>
        <div className="grid grid-cols-2 gap-3">
          <div className="">
            <div className="p-10 pt-3">
              <img
                src={product.image.path}
                alt={product.name}
                className="transition-all duration-700 hover:scale-105"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 ">
            <div className="pb-5 border-b border-black flex flex-col gap-5">
              <Heading as="h1" className="capitalize mt-3">
                {product.name}
              </Heading>

              <div className="flex gap-5 divide-gray-400 divide-x-[1px]">
                <p>
                  Mã sản phẩm: <span className="font-bold">{product.id}</span>
                </p>
                <p className="pl-5">
                  Đã bán:{" "}
                  <span className="font-bold">{product.soldNumber}</span>
                </p>
              </div>
            </div>

            <p className="py-5 text-[var(--color-grey-500)]">
              {product.overview}
            </p>

            <div className="flex gap-5">
              <p className="text-4xl font-bold text-[var(--color-brand-700)]">
                {formatCurrency(selectedVariant.price)}{" "}
              </p>
              {product.isDiscount && (
                <p className="text-[var(--color-grey-400)] line-through">
                  {formatCurrency(2000000)}{" "}
                </p>
              )}
            </div>

            <div className="mt-3">
              <p>
                <span className="font-bold mr-3">Kích thước:</span>{" "}
                {selectedVariant.size}
              </p>
              <div className="flex gap-4 mt-3">
                {product.variants.map((variant) => (
                  <div
                    onClick={() => setSelectedVariant(variant)}
                    className={`cursor-pointer border p-3 rounded-md border-[var(--color-grey-400)] ${
                      variant.size === selectedVariant.size &&
                      "border-[var(--color-brand-600)] border-2 -outline-offset-1"
                    }`}
                    key={variant.size}
                  >
                    {variant.size}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <p className="font-bold">Số lượng:</p>
              <div className="flex gap-4 mt-3">
                <Input
                  className="w-[80px]"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Button>Thêm vào giỏ hàng</Button>
              </div>
            </div>
          </div>
        </div>
        <ProductDescription product={product} />
      </Row>
    </>
  );
}

export default ProductDetail;
