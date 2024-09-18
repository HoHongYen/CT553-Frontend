import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getBreadcrumbFromCategory } from "@/services/apiCategories";
import { useProduct } from "@/hooks/products/useProduct";
import { ACTIONS, useCart } from "@/context/CartContext";

import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Carousel as AntdCarousel, Badge, Tag } from "antd";

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
import Discount from "@/components/products/Discount";
import { useShowCartDrawer } from "@/context/ShowCartDrawerContext";
import { formatCurrency } from "@/utils/helpers";

const tagColors = ["magenta", "red", "volcano", "orange", "gold"];

function ProductDetail() {
  const { product, isLoading } = useProduct();

  const [breadcrumb, setBreadcrumb] = useState([]);
  const [selectedVariantId, setSelectedVariantId] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState();
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState();
  const [viewImage, setViewImage] = useState();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [allImages, setAllImages] = useState([]);

  const { dispatch } = useCart();
  const { openCartDrawer } = useShowCartDrawer();

  const mediaRef = useRef(null);

  const thumbnailClicked = (id) => {
    mediaRef.current.goTo(id, false);
  };

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
      setAllImages([
        product.thumbnailImage,
        product.viewImage,
        ...product.images.map((image) => image.image),
      ]);
      setCurrentImage(product.thumbnailImage);
      setViewImage(product.thumbnailImage);
    }

    async function getBreadcrumb() {
      if (product) {
        const breadcrumb = await getBreadcrumbFromCategory(
          product.categories[0].category.id
        );
        setBreadcrumb([...breadcrumb.metadata, { name: product.name }]);
      }
    }
    getBreadcrumb();
  }, [product]);

  const handleAddToCart = () => {
    let discountPrice;
    if (!product.productDiscount || product.productDiscount.length === 0) {
      discountPrice = 0;
    } else {
      const { discountType, discountValue } = product.productDiscount[0];
      if (discountType === "percentage") {
        discountPrice = (selectedVariant.price * discountValue) / 100;
      } else {
        discountPrice = discountValue;
      }
    }

    dispatch({
      type: ACTIONS.ADD_TO_CART,
      payload: {
        variant: selectedVariant,
        quantity: quantity,
        product: product,
        finalPricePerOne: selectedVariant.price - discountPrice,
      },
    });

    toast.success("Đã thêm sản phẩm vào giỏ hàng!", {
      duration: 900,
    });
    setTimeout(() => {
      openCartDrawer();
    }, 1000);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <Row className="-mt-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex">
            <div className="flex flex-col gap-3 w-40">
              {allImages.map((image, index) => {
                return (
                  <img
                    onClick={() => thumbnailClicked(index)}
                    key={image.path}
                    src={image.path}
                    className={`border cursor-pointer hover:border-[var(--color-brand-600)] ${
                      image.path === currentImage?.path &&
                      "border-[var(--color-brand-600)] border-2"
                    }`}
                  />
                );
              })}
            </div>
            <div className="relative w-[90%] p-10 pt-0">
              <div
                onClick={() => {
                  if (isFirstTime) {
                    setViewImage(currentImage);
                    setIsFirstTime(false);
                  }
                }}
                className="absolute cursor-pointer top-5 right-10 z-10"
              >
                <ViewScaleImage
                  image={viewImage}
                  setIsFirstTime={setIsFirstTime}
                />
              </div>
              <AntdCarousel
                afterChange={(current) => {
                  setCurrentImage(allImages[current]);
                }}
                arrows
                autoplay
                ref={mediaRef}
              >
                {allImages.map((image) => {
                  return (
                    <ImageMagnifier
                      src={image.path}
                      key={image.path}
                      magnifierHeight={200}
                      magnifierWidth={200}
                      zoomLevel={2}
                    />
                  );
                })}
              </AntdCarousel>
              <div className="flex justify-end mt-2">
                <ViewCustomImage
                  image={product.viewImage}
                  setIsFirstTime={setIsFirstTime}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 ">
            <div className="pb-5 border-b border-[var(---color-grey-900)] flex flex-col gap-5">
              <div className="relative">
                {/* discount badge begin */}
                {product.productDiscount.length > 0 && (
                  <div className="absolute -right-5 -top-8">
                    {product.productDiscount.at(0)?.discountType ===
                    "percentage" ? (
                      <Badge.Ribbon
                        text={`-${
                          product.productDiscount?.at(0).discountValue
                        }%`}
                        color="red"
                      />
                    ) : (
                      <Badge.Ribbon
                        text={`-${formatCurrency(
                          product.productDiscount?.at(0).discountValue
                        )}`}
                        color="red"
                      />
                    )}
                  </div>
                )}
                {/* discount badge end */}

                <Heading as="h1" className="capitalize mt-3">
                  {product.name}
                </Heading>
              </div>

              <div className="flex gap-5 divide-gray-400 divide-x-[1px]">
                <p>
                  Mã sản phẩm: <span className="font-bold">{product.id}</span>
                </p>
                <p className="pl-5">
                  Còn lại:{" "}
                  <span className="font-bold">{selectedVariant?.quantity}</span>
                </p>
                <p className="pl-5">
                  Đã bán:{" "}
                  <span className="font-bold">{product.soldNumber}</span>
                </p>
              </div>
            </div>

            <p
              className="pt-5 text-[var(--color-grey-500)]"
              dangerouslySetInnerHTML={{
                __html: product.overview,
              }}
            ></p>

            <Discount product={product} selectedVariant={selectedVariant} />

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
                <div className="flex gap-[0.5px]">
                  <Button
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity((q) => q - 1);
                      }
                    }}
                    variation="secondary"
                    size="small"
                    radius="radius-none"
                  >
                    -
                  </Button>
                  <Input
                    className="w-[70px]"
                    radius="radius-none"
                    type="number"
                    min={1}
                    max={selectedVariant?.quantity}
                    value={quantity}
                    onChange={(e) => {
                      if (e.target.value < 1) {
                        setQuantity(1);
                      } else if (e.target.value > selectedVariant?.quantity) {
                        setQuantity(selectedVariant?.quantity);
                      } else {
                        setQuantity(e.target.value);
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      if (quantity < selectedVariant?.quantity) {
                        setQuantity((q) => q + 1);
                      }
                    }}
                    variation="secondary"
                    size="small"
                    radius="radius-none"
                  >
                    +
                  </Button>
                </div>
                <Button onClick={handleAddToCart} variation="success">
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

            <div className="items-center mt-2">
              <span className="font-bold mr-2">Danh mục:</span>{" "}
              <span className="leading-[40px]">
                {product.categories.map((category, index) => (
                  <Link
                    to={`/${category.category.parent.slug}/${category.category.slug}`}
                    key={category.category.id}
                  >
                    <Tag
                      style={{
                        fontSize: "1.4rem",
                        padding: 4,
                        fontStyle: "italic",
                      }}
                      color={tagColors[index]}
                    >
                      {category.category.name}
                    </Tag>
                  </Link>
                ))}
              </span>
            </div>
          </div>
        </div>
        <ProductDescription product={product} />
      </Row>
    </>
  );
}

export default ProductDetail;
