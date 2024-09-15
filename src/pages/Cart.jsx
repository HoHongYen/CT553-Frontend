import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "@/utils/helpers";
import Swal from "sweetalert2";

import { ACTIONS, useCart } from "@/context/CartContext";

import { HiOutlineTrash } from "react-icons/hi2";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Button from "@/components/ui/Button";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import Select from "@/components/ui/Select";

function Cart() {
  const navigate = useNavigate();
  const [breadcrumb, setBreadcrumb] = useState([{ name: "" }]);

  const { cartItems, totalPrices, dispatch } = useCart();

  const handleRemoveVariant = (variantId) => () => {
    console.log("variantId", variantId);
    Swal.fire({
      width: 400,
      size: "lg",
      title: `Bạn có chắc chắc muốn xóa ${variantId} khỏi giỏ hàng?`,
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: "Chắc chắn",
      cancelButtonText: "Hủy",
      customClass: {
        actions: "my-actions",
        denyButton: "order-1",
        cancelButton: "order-2",
      },
    }).then((result) => {
      if (result.isDenied) {
        dispatch({ type: "REMOVE_FROM_CART", payload: { variantId } });
        Swal.fire("Đã xóa sản phẩm khỏi giỏ hàng", "", "success");
      }
    });
  };

  const decreaseQuantity = (variantId) => {
    const item = cartItems.find((item) => item.variant.id === variantId);
    if (item.quantity === 1) {
      return;
    }
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { variantId, quantity: item.quantity - 1 },
    });
  };

  const increaseQuantity = (variantId) => {
    const item = cartItems.find((item) => item.variant.id === variantId);
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { variantId, quantity: item.quantity + 1 },
    });
  };

  useEffect(() => {
    setBreadcrumb([{ name: "Giỏ hàng" }]);
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col gap-5 items-center justify-center h-[calc(100vh-200px)]">
        <Heading as="h2">Bạn chưa thêm sản phẩm nào vào giỏ hàng!</Heading>
        <Button
          onClick={() => navigate("/trang-chu")}
          variation="primary"
          size="large"
          className="ml-4"
        >
          &larr; Quay lại trang chủ
        </Button>
      </div>
    );
  }

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <div className="flex justify-between">
        <Heading as="h1">Giỏ hàng của bạn </Heading>
      </div>
      <Row>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((cartItem, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 bg-[var(--color-grey-0)] px-6 py-6 rounded-md shadow-[0_2px_12px_-3px_var(--color-blue-700)]"
              >
                <div className="flex gap-7">
                  {/* image begin */}
                  <div className="overflow-hidden w-[220px] h-[220px] max-sm:w-[220px] max-sm:h-[220px] shrink-0">
                    <img
                      src={cartItem.product.thumbnailImage.path}
                      className="w-full h-full object-contain transition-all duration-700 hover:scale-105"
                    />
                  </div>
                  {/* image end */}

                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between items-center">
                      <Link to={`/san-pham/${cartItem.product.slug}`}>
                        <Heading as="h2" className="capitalize font-bold">
                          {cartItem.product.name}
                        </Heading>
                      </Link>
                      <ButtonIcon
                        onClick={handleRemoveVariant(cartItem.variant.id)}
                        variation="danger"
                        size="large"
                      >
                        <HiOutlineTrash />
                      </ButtonIcon>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <span className="font-semibold mr-3">Mã sản phẩm:</span>{" "}
                      {cartItem.product.id}
                    </div>
                    <div className="flex gap-4 items-center">
                      <span className="font-semibold mr-3">Kích thước:</span>{" "}
                      <div className="flex gap-4 mt-3">
                        <Select
                          options={cartItem.product.variants.map((variant) => {
                            return {
                              label: variant.size,
                              value: variant.id,
                            };
                          })}
                          value={cartItem.variant.id}
                        />
                      </div>
                    </div>

                    <div className="flex">
                      <span className="font-semibold mr-3">Số lượng:</span>
                      <div className="flex items-center gap-5 bottom-20 right-20">
                        <Button
                          onClick={() => decreaseQuantity(cartItem.variant.id)}
                          variation="secondary"
                          size="small"
                        >
                          -
                        </Button>
                        <span className="leading-[18px]">
                          {cartItem.quantity}
                        </span>
                        <Button
                          onClick={() => increaseQuantity(cartItem.variant.id)}
                          variation="secondary"
                          size="small"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="mt-3 flex">
                        <span className="font-semibold mr-3">Giá:</span>{" "}
                        <h3 className="font-bold mt-auto">
                          {formatCurrency(cartItem.variant.price)}
                        </h3>
                      </div>

                      <div className="flex ml-auto">
                        <span className="font-bold mr-3">Thành tiền:</span>
                        <div className="font-bold text-[var(--color-brand-700)]">
                          {formatCurrency(
                            cartItem.variant.price * cartItem.quantity
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* order summary begin */}
          <div className="bg-[var(--color-grey-0)] rounded-md px-6 py-6 h-max shadow-[0_2px_12px_-3px_var(--color-blue-700)]">
            <div className="flex justify-center mb-8">
              <Heading as="h2">Tóm tắt giỏ hàng</Heading>
            </div>
            <ul className="space-y-4">
              <li className="flex flex-wrap gap-4">
                Tổng tiền hàng{" "}
                <span className="ml-auto font-bold">
                  {formatCurrency(totalPrices)}
                </span>
              </li>
              <li className="flex flex-wrap gap-4 ">
                Phí giao hàng{" "}
                <span className="ml-auto font-bold">
                  {formatCurrency(10000)}
                </span>
              </li>
              <hr className="border-[var(--color-grey-300)]" />
              <li className="flex flex-wrap gap-4 font-bold">
                Tổng tiền{" "}
                <span className="text-[var(--color-brand-700)] font-bold ml-auto">
                  {formatCurrency(totalPrices + 10000)}
                </span>
              </li>
            </ul>

            <div className="mt-8 space-y-2">
              <Button variation="primary" size="large" className="w-full">
                Tiến hành đặt hàng
              </Button>
              <Button
                onClick={() => navigate(-2)}
                variation="secondary"
                size="large"
                className="w-full"
              >
                Tiếp tục xem sản phẩm{" "}
              </Button>
            </div>
          </div>
          {/* order summary end */}
        </div>
      </Row>
    </>
  );
}

export default Cart;
