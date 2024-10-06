import CouponItem from "./CouponItem";

function CouponMenu({ coupons }) {
  return (
    <div className="grid grid-cols-2 gap-y-10 gap-x-5 h-full">
      {coupons?.map((coupon) => (
        <CouponItem key={coupon.id} coupon={coupon} />
      ))}
    </div>
  );
}

export default CouponMenu;
