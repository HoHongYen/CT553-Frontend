import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CART_ACTIONS, useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/helpers";

import toast from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi2";

import BreadCrumb from "@/components/ui/BreadCrumb";
import Button from "@/components/ui/Button";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import CartSummary from "@/components/cart/CartSummary";
import CartItemQuantity from "@/components/cart/CartItemQuantity";
import DiscountBadge from "@/components/cart/DiscountBadge";
import DiscountPrice from "@/components/cart/DiscountPrice";
import SelectSize from "@/components/cart/SelectSize";
import EmptyRoundBoxIcon from "@/components/icons/EmptyRoundBoxIcon";
import TickRoundIcon from "@/components/icons/TickRoundIcon";
import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import Empty from "@/components/ui/Empty";

function Cart() {
  const navigate = useNavigate();
  const [breadcrumb, setBreadcrumb] = useState([{ name: "" }]);

  const { cartItems, dispatch } = useCart();

  const handleRemoveVariant = (variantId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: { variantId },
    });
    toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  useEffect(() => {
    setBreadcrumb([{ name: "Giỏ hàng" }]);
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col gap-5 items-center justify-center h-[calc(100vh-200px)]">
        <Heading as="h2">
          <Empty description="Bạn chưa thêm sản phẩm nào vào giỏ hàng!" />
        </Heading>
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
        <div className="-ml-12 grid md:grid-cols-3 gap-10">
          {/* cart items begin */}
          <div className="md:col-span-2 space-y-8">
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
                <div className="relative w-[95%] flex flex-col gap-4 bg-[var(--color-grey-0)] px-6 py-6 rounded-md shadow-[0_2px_12px_-3px_var(--color-blue-700)]">
                  <div className="flex gap-7">
                    {/* image begin */}
                    <div className="overflow-hidden w-[220px] h-[220px] max-sm:w-[220px] max-sm:h-[220px] shrink-0">
                      <img
                        src={cartItem.product.thumbnailImage.path}
                        className="w-full h-full object-contain transition-all duration-700 hover:scale-105"
                      />
                    </div>
                    {/* image end */}

                    {/* discount badge begin */}
                    <DiscountBadge cartItem={cartItem} />
                    {/* discount badge end */}

                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex justify-between items-center">
                        <Link to={`/san-pham/${cartItem.product.slug}`}>
                          <Heading
                            as="h2"
                            className="capitalize font-bold hover:text-[var(--color-brand-700)]"
                          >
                            {cartItem.product.name}
                          </Heading>
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

                      <div className="flex items-center gap-2 mt-3">
                        <span className="font-semibold mr-2">Mã sản phẩm:</span>{" "}
                        #{cartItem.product.id}
                      </div>
                      <div className="flex gap-4 items-center">
                        <span className="font-semibold mr-2">Kích thước:</span>{" "}
                        <SelectSize cartItem={cartItem} />
                      </div>

                      <div className="mt-3">
                        <p className="font-semibold">Số lượng:</p>
                        <CartItemQuantity cartItem={cartItem} />
                      </div>

                      {/* dicount price begin */}
                      <div className="mt-3">
                        <DiscountPrice cartItem={cartItem} />
                      </div>
                      {/* dicount price end */}

                      <div className="flex items-center">
                        <div className="mt-3 flex">
                          {cartItem.product.productDiscount.length > 0 ? (
                            <>
                              <span className="font-semibold mr-2">
                                Giảm còn:
                              </span>
                              <h3 className="text-[var(--color-red-600)] font-bold mt-auto">
                                {formatCurrency(cartItem.finalPricePerOne)}
                              </h3>
                            </>
                          ) : (
                            <>
                              <span className="font-semibold mr-2">Giá:</span>
                              <h3 className="text-[var(--color-brand-700)] font-bold mt-auto">
                                {formatCurrency(cartItem.finalPricePerOne)}
                              </h3>
                            </>
                          )}
                        </div>

                        <div className="flex ml-auto">
                          <span className="font-bold mr-2">Thành tiền:</span>
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
              </div>
            ))}
          </div>
          {/* cart items end */}

          {/* cart summary begin */}
          <CartSummary />
          {/* cart summary end */}
        </div>
      </Row>
    </>
  );
}

export default Cart;
