import { useEffect, useRef, useState } from "react";
import { formatCurrency } from "@/utils/helpers";

import { getBreadcrumbFromCategory } from "@/services/apiCategories";
import { useProduct } from "@/hooks/products/useProduct";

import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Carousel as AntdCarousel } from "antd";

import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Spinner from "@/components/ui/Spinner";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ProductDescription from "@/components/products/ProductDescription";
import ViewScaleImage from "@/components/products/ViewScaleImage";
import ImageMagnifier from "@/components/ui/ImageMagnifier";
import ViewCustomImage from "@/components/products/ViewCustomImage";
import Select from "@/components/ui/Select";

function ProductDetail() {
  const { product, isLoading } = useProduct();

  const [breadcrumb, setBreadcrumb] = useState([]);
  const [selectedVariantId, setSelectedVariantId] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState();
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState();
  const [viewImage, setViewImage] = useState();
  const [firstTime, setIsFirstime] = useState(true);

  const mediaRef = useRef(null);

  useEffect(() => {
    console.log(product);

    if (product) {
      setSelectedVariant(product.variants[0]);
      setCurrentImage(product.images[0].image);
      setViewImage(product.images[0].image);
    }

    async function getBreadcrumb() {
      const breadcrumb = await getBreadcrumbFromCategory(product.categoryId);
      setBreadcrumb([...breadcrumb.metadata, { name: product.name }]);
    }
    getBreadcrumb();
  }, [product]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <Row className="-mt-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex">
            <div className="flex flex-col gap-3 w-40">
              {product.images.map((image, index) => {
                if (index === 1) {
                  return null;
                }
                return (
                  <img
                    key={image.image.path}
                    src={image.image.path}
                    className={`border cursor-pointer hover:border-[var(--color-brand-600)] ${
                      image.image.path === currentImage?.path &&
                      "border-[var(--color-brand-600)] border-2"
                    }`}
                  />
                );
              })}
            </div>
            <div className="relative w-[90%] p-10 pt-3">
              <div
                onClick={() => {
                  if (firstTime) {
                    setViewImage(currentImage);
                    setIsFirstime(false);
                  }
                }}
                className="absolute cursor-pointer top-5 right-10 z-10"
              >
                <ViewScaleImage image={viewImage} />
              </div>
              <AntdCarousel
                afterChange={(current) => {
                  setCurrentImage(product.images[current].image);
                }}
                arrows
                autoplay
                ref={mediaRef}
              >
                {product.images.map((image, index) => {
                  if (index === 1) {
                    return null;
                  }
                  return (
                    <ImageMagnifier
                      className={"w-full h-full"}
                      key={image.image.path}
                      src={image.image.path}
                      magnifierHeight={200}
                      magnifierWidth={200}
                      zoomLevel={2}
                    />
                  );
                })}
              </AntdCarousel>
              <div className="flex justify-end mt-2">
                <ViewCustomImage
                  image={product.images[1].image}
                  setIsFirstime={setIsFirstime}
                />
              </div>
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

            <p
              className="py-5 text-[var(--color-grey-500)]"
              dangerouslySetInnerHTML={{
                __html: product.overview,
              }}
            ></p>

            <div className="flex gap-5">
              <p className="text-4xl font-bold text-[var(--color-brand-700)]">
                {formatCurrency(selectedVariant?.price)}{" "}
              </p>
              {/* {product.isDiscount && (
                <p className="text-[var(--color-grey-400)] line-through">
                  {formatCurrency(2000000)}{" "}
                </p>
              )} */}
            </div>

            <div className="mt-3">
              <p>
                <span className="font-bold mr-3">Kích thước:</span>{" "}
                {selectedVariant?.size}
              </p>
              <div className="flex gap-4 mt-3">
                <Select
                  options={product.variants.map((variant, index) => {
                    return {
                      label: variant.size,
                      value: index,
                    };
                  })}
                  value={selectedVariantId}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setSelectedVariantId(e.target.value);
                    setSelectedVariant(product.variants[e.target.value]);
                  }}
                />
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
                <Button variation="success">
                  <div className="flex justify-center items-center gap-4">
                    <HiOutlineShoppingCart />
                    Thêm vào giỏ hàng
                  </div>
                </Button>
              </div>
            </div>
            <Button>
              <div className="flex justify-center items-center gap-4">
                MUA NGAY
              </div>
            </Button>
          </div>
        </div>
        <ProductDescription product={product} />
      </Row>
    </>
  );
}

export default ProductDetail;
