import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { CART_ACTIONS, useCart } from "@/context/CartContext";
import { useShowCartDrawer } from "@/context/ShowCartDrawerContext";
import { formatCurrency } from "@/utils/helpers";

import { Drawer } from "antd";
import { HiOutlineShoppingCart, HiOutlineTrash } from "react-icons/hi2";

import Heading from "../ui/Heading";
import ButtonIcon from "../ui/ButtonIcon";
import CartSummary from "./CartSummary";
import CartItemQuantity from "./CartItemQuantity";
import DiscountBadge from "./DiscountBadge";
import DiscountPrice from "./DiscountPrice";
import SelectSize from "./SelectSize";
import TickRoundIcon from "../icons/TickRoundIcon";
import EmptyRoundBoxIcon from "../icons/EmptyRoundBoxIcon";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import ConfirmCertain from "../ui/ConfirmCertain";
import Empty from "../ui/Empty";

function CartDrawer() {
  const navigate = useNavigate();
  const { open, closeCartDrawer } = useShowCartDrawer();
  const { cartItems, dispatch } = useCart();

  const handleRemoveVariant = (variantId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: { variantId },
    });
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  return (
    <Drawer
      width={cartItems.length > 0 ? 600 : 400}
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
      //       onClick={() => navigate("/gio-hang")}
      //     >
      //       Đến trang giỏ hàng &rarr;
      //     </Button>
      //   </div>
      // }
    >
      <div className="flex flex-col gap-3">
        {cartItems.length === 0 && (
          <div className="flex flex-col gap-5 items-center justify-center h-[calc(100vh-200px)]">
            <Empty description="Bạn chưa thêm sản phẩm nào vào giỏ hàng!" />
            <Button
              onClick={() => navigate("/trang-chu")}
              variation="primary"
              size="large"
              className="ml-4"
            >
              &larr; Quay lại trang chủ
            </Button>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="flex flex-col gap-5">
            {/* cart items begin */}
            <div className="flex flex-col gap-8">
              {cartItems.map((cartItem, index) => (
                <div key={index} className="flex gap-5">
                  <div
                    onClick={() =>
                      dispatch({
                        type: CART_ACTIONS.CHECK_ITEM,
                        payload: { variantId: cartItem.variant.id },
                      })
                    }
                    className="flex cursor-pointer items-center w-8"
                  >
                    {cartItem.isChecked ? (
                      <TickRoundIcon />
                    ) : (
                      <EmptyRoundBoxIcon />
                    )}
                  </div>
                  <div
                    key={index}
                    className="relative w-[95%] first-letter:flex flex-col bg-[var(--color-grey-0)] px-6 py-6 rounded-md shadow-[0_2px_12px_-3px_var(--color-blue-700)]"
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

                      <Modal>
                        <Modal.Open opens="removeItem">
                          <ButtonIcon variation="danger" size="large">
                            <HiOutlineTrash />
                          </ButtonIcon>
                        </Modal.Open>
                        <Modal.Window name="removeItem">
                          <ConfirmCertain
                            resourceName={`Bạn có chắc chắc muốn xóa sản phẩm "${cartItem.product.name}" khỏi giỏ hàng?`}
                            onConfirm={() =>
                              handleRemoveVariant(cartItem.variant.id)
                            }
                          />
                        </Modal.Window>
                      </Modal>
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
                              #{cartItem.product.id}
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
                                      {formatCurrency(
                                        cartItem.finalPricePerOne
                                      )}
                                    </h3>
                                  </>
                                ) : (
                                  <>
                                    <span className="font-semibold mr-3">
                                      Giá:
                                    </span>
                                    <h3 className="text-[var(--color-brand-700)] font-bold mt-auto">
                                      {formatCurrency(
                                        cartItem.finalPricePerOne
                                      )}
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
