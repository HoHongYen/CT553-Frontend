import { Link, useNavigate } from "react-router-dom";

import { ACTIONS, useCart } from "@/context/CartContext";
import { useShowCartDrawer } from "@/context/ShowCartDrawerContext";
import { formatCurrency } from "@/utils/helpers";

import Swal from "sweetalert2";
import { HiOutlineShoppingCart, HiOutlineTrash } from "react-icons/hi2";
import { Drawer, Select } from "antd";

import Heading from "../ui/Heading";
import ButtonIcon from "../ui/ButtonIcon";
import CartSummary from "./CartSummary";
import CartItemQuantity from "./CartItemQuantity";
import DiscountBadge from "./DiscountBadge";
import DiscountPrice from "./DiscountPrice";
import SelectSize from "./SelectSize";

function CartDrawer() {
  const navigate = useNavigate();
  const { open, closeCartDrawer } = useShowCartDrawer();
  const { cartItems, dispatch } = useCart();

  const handleRemoveVariant = (variantId, productName) => () => {
    Swal.fire({
      width: 400,
      size: "lg",
      title: `Bạn có chắc chắc muốn xóa ${productName} khỏi giỏ hàng?`,
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
        dispatch({
          type: ACTIONS.REMOVE_FROM_CART,
          payload: { variantId },
        });
        Swal.fire("Đã xóa sản phẩm khỏi giỏ hàng", "", "success");
      }
    });
  };

  return (
    <Drawer
      width={550}
      closable
      destroyOnClose
      title={
        <Heading
          className="flex justify-center -ml-5 items-center gap-4"
          as="h2"
        >
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
            {/* cart items begin */}
            <div className="flex flex-col gap-8">
              {cartItems.map((cartItem, index) => (
                <div
                  key={index}
                  className="relative first-letter:flex flex-col bg-[var(--color-grey-0)] px-6 py-6 rounded-md shadow-[0_2px_12px_-3px_var(--color-blue-700)]"
                >
                  <div className="flex">
                    {/* discount badge begin */}
                    <DiscountBadge cartItem={cartItem} />
                    {/* discount badge end */}
                    <Link to={`/san-pham/${cartItem.product.slug}`}>
                      <p className="text-[18px] capitalize font-bold hover:text-[var(--color-brand-700)]">
                        {cartItem.product.name}
                      </p>
                    </Link>
                    <ButtonIcon
                      onClick={handleRemoveVariant(
                        cartItem.variant.id,
                        cartItem.product.name
                      )}
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
                            <SelectSize cartItem={cartItem} />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between gap-5">
                        <div className="flex items-center">
                          <div className="mt-3 flex flex-col">
                            {/* dicount price begin */}
                            <DiscountPrice cartItem={cartItem} />
                            {/* dicount price end */}
                            <div className="flex">
                              {cartItem.product.productDiscount.length > 0 ? (
                                <>
                                  <span className="font-semibold mr-3">
                                    Giảm còn:
                                  </span>
                                  <h3 className="text-[var(--color-red-600)] font-bold mt-auto">
                                    {formatCurrency(cartItem.finalPricePerOne)}
                                  </h3>
                                </>
                              ) : (
                                <>
                                  <span className="font-semibold mr-3">
                                    Giá:
                                  </span>
                                  <h3 className="text-[var(--color-brand-700)] font-bold mt-auto">
                                    {formatCurrency(cartItem.finalPricePerOne)}
                                  </h3>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* <p className="font-semibold">Số lượng:</p> */}
                          <CartItemQuantity cartItem={cartItem} />
                        </div>
                      </div>

                      <div className="flex ml-auto mt-3">
                        <span className="font-bold mr-3">Thành tiền:</span>
                        <div className="font-bold text-[var(--color-brand-700)]">
                          {formatCurrency(
                            cartItem.finalPricePerOne * cartItem.quantity
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* cart items end */}

            {/* cart summary begin */}
            <CartSummary isCartDrawer={true} />
            {/* cart summary end */}
          </div>
        )}
      </div>
    </Drawer>
  );
}

export default CartDrawer;
