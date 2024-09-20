import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useOrder } from "@/context/OrderContext";
import { formatCurrency } from "@/utils/helpers";

import BreadCrumb from "@/components/ui/BreadCrumb";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import OrderProducts from "@/components/order/OrderProducts";
import AddressTable from "@/components/profile/addresses/AddressTable";
import {
  HiOutlineGift,
  HiOutlineMapPin,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import AddAddress from "@/components/profile/addresses/AddAddress";
import OrderPayment from "@/components/order/OrderPayment";
import OrderSummary from "@/components/order/OrderSummary";
import OrderCoupon from "@/components/order/OrderCoupon";

const breadcrumb = [{ name: "Đặt hàng" }];

function Cart() {
  const { totalItems, totalPrices } = useCart();
  const { address: addressToOrder } = useOrder();

  return (
    <>
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
              {/* <div className="flex justify-end">
                <AddAddress />
              </div> */}
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
                    {formatCurrency(totalPrices)}
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
                  <HiOutlineGift />
                  <span className="font-bold">Áp dụng coupon (nếu có)</span>
                </Heading>
              </div>
              <OrderCoupon />
            </div>
            {/* voucher end */}
          </div>

          {/* cart summary begin */}
          <div className="flex flex-col gap-8">
            <OrderSummary />
            <OrderPayment />
          </div>
          {/* cart summary end */}
        </div>
      </Row>
    </>
  );
}

export default Cart;
