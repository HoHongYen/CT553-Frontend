import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getBreadcrumbFromCategory } from "@/services/apiCategories";
import { useProduct } from "@/hooks/products/useProduct";
import { useMoveBack } from "@/hooks/common/useMoveBack";
import { CART_ACTIONS, useCart } from "@/context/CartContext";
import { useShowCartDrawer } from "@/context/ShowCartDrawerContext";

import { HiOutlineShoppingCart, HiStar } from "react-icons/hi2";
import { Carousel as AntdCarousel, Badge, Popover, Tag } from "antd";
import { calculateRating, formatCurrency } from "@/utils/helpers";
import { Helmet } from "react-helmet";

import { Statistic } from "antd";
const { Countdown } = Statistic;
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
import RelatedProducts from "@/components/products/RelatedProducts";
import ButtonText from "@/components/ui/ButtonText";
import ReviewList from "@/components/products/reviews/ReviewList";
import RatingBreakdown from "@/components/products/reviews/RatingBreakdown";

const tagColors = ["magenta", "red", "volcano", "orange", "gold"];

function ProductDetail() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { product, isLoading } = useProduct();

  const [breadcrumb, setBreadcrumb] = useState([]);
  const [selectedVariantId, setSelectedVariantId] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState();
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState();
  const [viewImageIndex, setViewImageIndex] = useState(0);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [allImages, setAllImages] = useState([]);

  const [rating, setRating] = useState(0);

  const { dispatch } = useCart();
  const { openCartDrawer } = useShowCartDrawer();

  const mediaRef = useRef(null);

  const thumbnailClicked = (id) => {
    mediaRef.current.goTo(id, false);
  };

  useEffect(() => {
    if (product) {
      console.log("product", product);
      setSelectedVariant(product.variants[0]);
      if (product.viewImage) {
        setAllImages([
          product.thumbnailImage,
          product.viewImage,
          ...product.images.map((image) => image.image),
        ]);
      } else {
        setAllImages([
          product.thumbnailImage,
          ...product.images.map((image) => image.image),
        ]);
      }
      setCurrentImage(product.thumbnailImage);
      setViewImageIndex(0);

      setRating(calculateRating(product.reviews));
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
      type: CART_ACTIONS.ADD_TO_CART,
      payload: {
        variant: selectedVariant,
        quantity: quantity,
        isChecked: true,
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

  const handleBuyNow = () => {
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

    // only add this item to cart, other items set to be unchecked
    dispatch({
      type: CART_ACTIONS.UNCHECK_ALL,
    });

    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: {
        variant: selectedVariant,
        quantity: quantity,
        isChecked: true,
        product: product,
        finalPricePerOne: selectedVariant.price - discountPrice,
      },
    });
    // go to order page
    navigate("/dat-hang");
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <div className="flex justify-between items-center">
        <BreadCrumb breadcrumb={breadcrumb} />
        <ButtonText onClick={moveBack}>&larr; Quay lại</ButtonText>
      </div>
      <Row className="-mt-5">
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
                    setViewImageIndex(
                      allImages.findIndex(
                        (image) => image.path === currentImage.path
                      )
                    );
                    setIsFirstTime(false);
                  }
                }}
                className="absolute cursor-pointer top-5 right-10 z-10"
              >
                <ViewScaleImage
                  images={allImages}
                  index={viewImageIndex}
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
                      magnifierHeight={300}
                      magnifierWidth={300}
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
                  Mã sản phẩm: <span className="font-bold">#{product.id}</span>
                </p>
                <p className="pl-5">
                  Đã bán:{" "}
                  <span className="font-bold">{product.soldNumber}</span>
                </p>
                <Popover
                  placement="bottom"
                  content={
                    <RatingBreakdown
                      allReviews={product.reviews}
                      isPopUp={true}
                    />
                  }
                >
                  <p className="flex gap-2 items-center pl-5">
                    Đánh giá: <span className="font-bold">{rating}</span>
                    <span className="text-[var(--color-yellow-700)] text-3xl">
                      <HiStar />
                    </span>
                    / {product.reviews.length} lượt đánh giá
                  </p>
                </Popover>
              </div>
            </div>

            <p
              className="pt-5 text-[var(--color-grey-500)]"
              dangerouslySetInnerHTML={{
                __html: product.overview,
              }}
            ></p>

            <Discount product={product} selectedVariant={selectedVariant} />
            {product.productDiscount.length > 0 && (
              <div className="ml-1 flex items-center gap-3">
                <p>Kết thúc sau:</p>
                <Countdown
                  format="D ngày H giờ m phút s giây"
                  contentFontSize={15}
                  value={product.productDiscount[0].endDate}
                  valueStyle={{
                    color: "#f50",
                    fontSize: 17,
                    fontWeight: "bold",
                  }}
                />
              </div>
            )}
            <div className="mt-3 flex items-center gap-3">
              <p>
                <span className="font-bold mr-2">Kích thước:</span>{" "}
                {/* {selectedVariant?.size} */}
              </p>
              <div className="flex gap-4">
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
              <p>
                <span className="font-bold mr-2"> Có sẵn trong kho:</span>{" "}
                {selectedVariant?.quantity}
              </p>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <p className="font-bold">Số lượng:</p>
              <div className="flex gap-4">
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
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <Button onClick={handleAddToCart} variation="success">
                <div className="flex justify-center items-center gap-4">
                  <HiOutlineShoppingCart />
                  Thêm vào giỏ hàng
                </div>
              </Button>
              <Button onClick={handleBuyNow}>
                <div className="flex justify-center items-center gap-4">
                  MUA NGAY
                </div>
              </Button>
            </div>

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
        <RelatedProducts />
        <ReviewList allReviews={product.reviews} />
      </Row>
    </>
  );
}

export default ProductDetail;
