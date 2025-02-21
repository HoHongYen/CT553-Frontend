import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CART_ACTIONS, useCart } from "@/context/CartContext";
import { ORDER_ACTIONS, useOrder } from "@/context/OrderContext";
import { useCreateOrder } from "@/hooks/orders/useCreateOrder";
import { useCreateRedirectUrlVNPAY } from "@/hooks/orders/useCreateRedirectUrlVNPAY";
import { formatCurrency } from "@/utils/helpers";

import BreadCrumb from "@/components/ui/BreadCrumb";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import OrderProducts from "@/components/order/OrderProducts";
import AddressTable from "@/components/profile/addresses/AddressTable";
import {
  HiOutlineTicket,
  HiOutlineMapPin,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import AddAddress from "@/components/profile/addresses/AddAddress";
import OrderPayment from "@/components/order/OrderPayment";
import OrderSummary from "@/components/order/OrderSummary";
import OrderCoupons from "@/components/order/OrderCoupons";
import Button from "@/components/ui/Button";
import Empty from "@/components/ui/Empty";

const breadcrumb = [{ name: "Đặt hàng" }];

function Order() {
  const navigate = useNavigate();
  const {
    totalItems,
    totalPrice,
    cartItems,
    choosedItems,
    dispatch: cartDispatch,
  } = useCart();
  const { dispatch: orderDispatch } = useOrder();

  const {
    addresses,
    address: addressToOrder,
    shippingFee,
    totalDiscount,
    finalPrice,
    appliedCoupon,
    paymentMethods,
    paymentMethod,
    sortedUnusedCoupons,
  } = useOrder();

  const { createOrder } = useCreateOrder();
  const { createRedirectUrlVNPAY } = useCreateRedirectUrlVNPAY();

  const [addressError, setAddressError] = useState("");

  useEffect(() => {
    if (addressToOrder) {
      setAddressError("");
    }
  }, [addressToOrder]);

  const handleCreateOrder = async () => {
    if (!addressToOrder) {
      setAddressError("Vui lòng chọn địa chỉ nhận hàng!");
      return;
    }

    const order = {
      totalPrice,
      totalDiscount,
      finalPrice,
      shippingFee,
      deliveryAddressId: addressToOrder.id,
      paymentMethodId: paymentMethod.id,
      usedCouponId: appliedCoupon ? appliedCoupon.couponId : null,
      items: choosedItems.map((item) => ({
        variantId: item.variant.id,
        productId: item.product.id,
        quantity: item.quantity,
        price: item.finalPricePerOne,
        productDiscount: item.variant.price - item.finalPricePerOne,
      })),
    };
    console.log(order);

    // call api to create order
    createOrder(order, {
      onSuccess: ({ metadata: order }) => {
        // open new tab to redirect to VNPAY
        if (order.paymentMethod.id === paymentMethods[1].id) {
          createRedirectUrlVNPAY({
            orderId: order.id,
            amount: order.finalPrice,
          });
        }

        // remove selected item in cart
        const unCheckedItems = cartItems.filter((item) => !item.isChecked);
        cartDispatch({
          type: CART_ACTIONS.SET_CART,
          payload: { cartItems: unCheckedItems },
        });
        // reset order
        const defaultAddress = addresses.find((address) => address.isDefault);
        const coupon = sortedUnusedCoupons[0];
        orderDispatch({
          type: ORDER_ACTIONS.RESET,
          payload: {
            paymentMethod: paymentMethods[0],
            address: defaultAddress,
            appliedCoupon: coupon,
          },
        });
      },
    });
  };

  if (totalItems === 0) {
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
      <Helmet>
        <title>Đặt hàng</title>
      </Helmet>
      <BreadCrumb breadcrumb={breadcrumb} />
      <div className="flex justify-between">
        <Heading as="h1">Đặt hàng</Heading>
      </div>
      <Row>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-16">
            {/* address begin */}
            <div className="flex flex-col gap-8 bg-[var(--color-grey-0)] rounded-md px-10 py-6 h-max shadow-[0_2px_12px_-3px_var(--color-blue-700)]">
              <div className="flex justify-center">
                <Heading
                  className="flex items-center gap-3 text-[var(--color-brand-700)]"
                  as="h2"
                >
                  <HiOutlineMapPin />
                  <span className="font-bold">Địa chỉ nhận hàng</span>
                </Heading>
              </div>
              <AddressTable isAddressInOrderPage={true} />
              <div className="flex w-full items-center justify-between">
                {addressToOrder && (
                  <div className="max-w-[75%]">
                    <span className="font-semibold italic">Giao tới:</span>
                    <span className="font-bold italic ml-3 text-[var(--color-green-700)]">
                      {addressToOrder.contactName},{" "}
                      {addressToOrder.contactPhone},{" "}
                      {addressToOrder.detailAddress}, {addressToOrder.wardName},{" "}
                      {addressToOrder.districtName},{" "}
                      {addressToOrder.provinceName}
                    </span>
                  </div>
                )}
                <AddAddress />
              </div>
              <span className="text-[1.4rem] text-[var(--color-red-700)]">
                {addressError}
              </span>
            </div>
            {/* address end */}

            {/* product items begin */}
            <div className="flex flex-col gap-8 bg-[var(--color-grey-0)] rounded-md px-10 py-6 h-max shadow-[0_2px_12px_-3px_var(--color-blue-700)]">
              <div className="flex justify-center">
                <Heading
                  className="flex items-center gap-3 text-[var(--color-brand-700)]"
                  as="h2"
                >
                  <HiOutlineShoppingBag />
                  <span className="font-bold">Chi tiết đơn hàng</span>
                </Heading>
              </div>
              <OrderProducts />
              <div className="flex flex-col gap-3 items-end">
                <div>
                  <span className="font-semibold italic">Số sản phẩm: </span>
                  <span className="font-bold italic ml-3 text-3xl text-[var(--color-green-700)]">
                    {totalItems}
                  </span>
                </div>
                <div>
                  <span className="font-semibold italic">Tổng tiền hàng: </span>
                  <span className="font-bold italic ml-3 text-3xl text-[var(--color-green-700)]">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>
            </div>
            {/* product items end */}

            {/* Coupon begin */}
            <div className="flex flex-col gap-8 bg-[var(--color-grey-0)] rounded-md px-10 py-6 h-max shadow-[0_2px_12px_-3px_var(--color-blue-700)]">
              <div className="flex justify-center">
                <Heading
                  className="flex items-center gap-3 text-[var(--color-brand-700)]"
                  as="h2"
                >
                  <HiOutlineTicket />
                  <span className="font-bold">Áp dụng mã giảm giá (nếu có)</span>
                  {appliedCoupon && (
                    <span className="text-[var(--color-green-700)]">
                      (Đã áp dụng mã giảm giá) {appliedCoupon.coupon.code}
                    </span>
                  )}
                </Heading>
              </div>
              <OrderCoupons />
            </div>
            {/* voucher end */}
          </div>

          {/* order summary begin */}
          <div className="flex flex-col gap-8">
            <OrderSummary />
            <OrderPayment />

            <Button
              onClick={handleCreateOrder}
              variation="success"
              className="uppercase font-bold w-full"
            >
              Đặt hàng
            </Button>
          </div>
          {/* order summary end */}
        </div>
      </Row>
    </>
  );
}

export default Order;
