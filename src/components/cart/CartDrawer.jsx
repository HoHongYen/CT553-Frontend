import { Link, useNavigate } from "react-router-dom";

import { useCart } from "@/context/CartContext";
import { useShowCartDrawer } from "@/context/ShowCartDrawerContext";
import { formatCurrency } from "@/utils/helpers";

import Swal from "sweetalert2";
import { HiOutlineShoppingCart, HiOutlineTrash } from "react-icons/hi2";
import { Drawer, Select } from "antd";

import Heading from "../ui/Heading";
import Button from "../ui/Button";
import ButtonIcon from "../ui/ButtonIcon";
import Input from "../ui/Input";

function CartDrawer() {
  const navigate = useNavigate();
  const { open, closeCartDrawer } = useShowCartDrawer();
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

  return (
    <Drawer
      width={500}
      closable
      destroyOnClose
      title={
        <Heading className="flex items-center gap-4" as="h2">
          <HiOutlineShoppingCart />
          Giỏ hàng của bạn
        </Heading>
      }
      placement="right"
      open={open}
      onClose={closeCartDrawer}
      style={{ fontFamily: "var(--font-primary)", fontSize: "1.6rem" }}
      // footer={
      //   <div className="flex gap-5">
      //     <Button variation="success" onClick={() => navigate("/")}>
      //       Tiến hành đặt hàng
      //     </Button>
      //     <Button
      //       onClick={() => navigate("/gio-hang");}
      //     >
      //       Đến trang giỏ hàng &rarr;
      //     </Button>
      //   </div>
      // }
    >
      <div className="flex flex-col gap-3">
        {cartItems.length === 0 && (
          <div className="flex flex-col gap-5 items-center justify-center h-[calc(100vh-200px)]">
            <p>Bạn chưa thêm sản phẩm nào vào giỏ hàng!</p>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="flex flex-col gap-5">
            {/* order items begin */}
            <div className="flex flex-col gap-5">
              {cartItems.map((cartItem, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-[var(--color-grey-0)] px-6 py-6 rounded-md shadow-[0_2px_12px_-3px_var(--color-blue-700)]"
                >
                  <div className="flex">
                    <Link to={`/san-pham/${cartItem.product.slug}`}>
                      <p className="text-[18px] capitalize font-bold hover:text-[var(--color-brand-700)]">
                        {cartItem.product.name}
                      </p>
                    </Link>
                    <ButtonIcon
                      onClick={handleRemoveVariant(cartItem.variant.id)}
                      variation="danger"
                      size="large"
                      className="ml-auto -mt-3"
                    >
                      <HiOutlineTrash />
                    </ButtonIcon>
                  </div>

                  <div className="flex gap-5">
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex gap-5">
                        {/* image begin */}
                        <div className="overflow-hidden w-[90px] h-[90px] max-sm:w-[90px] max-sm:h-[90px] shrink-0">
                          <img
                            src={cartItem.product.thumbnailImage.path}
                            className="w-full h-full object-contain transition-all duration-700 hover:scale-105"
                          />
                          {/* image end */}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold mr-3">
                              Mã sản phẩm:
                            </span>{" "}
                            {cartItem.product.id}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold mr-3">
                              Kích thước:
                            </span>{" "}
                            <div className="flex gap-4 mt-3">
                              <Select
                                options={cartItem.product.variants.map(
                                  (variant) => {
                                    return {
                                      label: variant.size,
                                      value: variant.id,
                                    };
                                  }
                                )}
                                value={cartItem.variant.id}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between gap-5">
                        <div className="flex items-center">
                          <div className="mt-3 flex">
                            <span className="font-semibold mr-3">Giá:</span>{" "}
                            <h3 className="font-bold mt-auto">
                              {formatCurrency(cartItem.variant.price)}
                            </h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* <p className="font-semibold">Số lượng:</p> */}
                          <div className="flex gap-7 mt-3">
                            <div className="flex gap-[0.5px]">
                              <Button
                                onClick={() =>
                                  dispatch({
                                    type: "DECREASE_QUANTITY",
                                    payload: { variantId: cartItem.variant.id },
                                  })
                                }
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
                                max={cartItem.variant.quantity}
                                value={cartItem.quantity}
                                onChange={(e) =>
                                  dispatch({
                                    type: "UPDATE_QUANTITY",
                                    payload: {
                                      variantId: cartItem.variant.id,
                                      quantity: e.target.value,
                                    },
                                  })
                                }
                              />
                              <Button
                                onClick={() =>
                                  dispatch({
                                    type: "INCREASE_QUANTITY",
                                    payload: { variantId: cartItem.variant.id },
                                  })
                                }
                                variation="secondary"
                                size="small"
                                radius="radius-none"
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex ml-auto mt-3">
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
              ))}
            </div>
            {/* order items end */}

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
                  onClick={() => navigate("/gio-hang")}
                  variation="secondary"
                  size="large"
                  className="w-full"
                >
                  Xem chi tiết giỏ hàng &rarr;
                </Button>
              </div>
            </div>
            {/* order summary end */}
          </div>
        )}
      </div>
    </Drawer>
  );
}

export default CartDrawer;
