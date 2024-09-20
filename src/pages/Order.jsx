import { useEffect, useState } from "react";
import { OrderProvider } from "@/context/OrderContext";

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

function Cart() {
  const [breadcrumb, setBreadcrumb] = useState([{ name: "" }]);

  useEffect(() => {
    setBreadcrumb([{ name: "Đặt hàng" }]);
  }, []);

  return (
    <OrderProvider>
      <BreadCrumb breadcrumb={breadcrumb} />
      <div className="flex justify-between">
        <Heading as="h1">Đặt hàng</Heading>
      </div>
      <Row>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-16">
            {/* address begin */}
            <div className="flex flex-col gap-8 bg-[var(--color-grey-0)] rounded-md px-6 py-6 h-max shadow-[0_2px_12px_-3px_var(--color-blue-700)]">
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
              <div className="flex justify-end">
                <AddAddress />
              </div>
            </div>
            {/* address end */}

            {/* voucher begin */}
            <div className="flex flex-col gap-8 bg-[var(--color-grey-0)] rounded-md px-6 py-6 h-max shadow-[0_2px_12px_-3px_var(--color-blue-700)]">
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
            </div>
            {/* voucher end */}

            {/* voucher begin */}
            <div className="flex flex-col gap-8 bg-[var(--color-grey-0)] rounded-md px-6 py-6 h-max shadow-[0_2px_12px_-3px_var(--color-blue-700)]">
              <div className="flex justify-center">
                <Heading
                  className="flex items-center gap-3 text-[var(--color-brand-700)]"
                  as="h2"
                >
                  <HiOutlineGift />
                  <span className="font-bold">Áp dụng voucher (nếu có)</span>
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
    </OrderProvider>
  );
}

export default Cart;
