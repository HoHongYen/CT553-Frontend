import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useCollectedCoupons } from "@/hooks/coupons/useCollectedCoupons";
import { collectCoupon } from "@/services/apiCoupons";
import Button from "../ui/Button";

function CouponItemButtonForAuthenticated({ coupon }) {
  const { collectedCoupons } = useCollectedCoupons();

  const queryClient = useQueryClient();
  const isCollected = collectedCoupons.some(
    (item) => item.coupon.id === coupon.id
  );

  const isUsed = collectedCoupons.some(
    (item) => item.coupon.id === coupon.id && item.used
  );

  console.log("isUsed: ", isUsed);

  const handleCollectCoupon = async () => {
    await collectCoupon(coupon.code);
    queryClient.invalidateQueries("collectedCoupons");
    toast.success("Nhận coupon thành công!");
  };

  return (
    <>
      <Button
        variation={!isCollected ? "success" : isUsed ? "danger" : "secondary"}
        disabled={isCollected || isUsed}
        onClick={handleCollectCoupon}
        className="w-full"
      >
        {!isCollected ? "Nhận ngay" : isUsed ? "Đã sử dụng" : "Đã nhận"}
      </Button>
    </>
  );
}

export default CouponItemButtonForAuthenticated;
