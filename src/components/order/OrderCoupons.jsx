import { useCart } from "@/context/CartContext";
import { useOrder } from "@/context/OrderContext";
import CouponItem from "../hotdeals/CouponItem";

function OrderCoupons() {
  const { totalPrice } = useCart();
  const { sortedUnusedCoupons, appliedCoupon } = useOrder();

  return (
    <>
      {sortedUnusedCoupons.map((item) => (
        <CouponItem
          isInOrder={true}
          isApplied={appliedCoupon?.couponId === item.coupon.id}
          couponOfUser={item}
          key={item.coupon.id}
          coupon={item.coupon}
          totalPrice={totalPrice}
        />
      ))}
    </>
  );
}

export default OrderCoupons;
