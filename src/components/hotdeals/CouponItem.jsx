import { useUser } from "@/hooks/profile/useUser";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { HiOutlineClock } from "react-icons/hi2";
import { Slogan } from "@/pages/Home";
import CouponItemButton from "./CouponItemButton";
import CouponItemButtonForAuthenticated from "./CouponItemButtonForAuthenticated";
import CouponItemButtonForAuthenticatedInOrder from "./CouponItemButtonForAuthenticatedInOrder";

function CouponItem({
  coupon,
  isInOrder = false,
  couponOfUser = null,
  isApplied = false,
  totalPrice,
}) {
  const { isAuthenticated } = useUser();

  const isAppliable = totalPrice >= coupon?.minimumPriceToUse;

  return (
    <div
      className={`${
        isInOrder && !isAppliable
          ? "bg-[var(--color-grey-200)]"
          : isInOrder && isApplied
          ? "bg-[var(--color-yellow-100)]"
          : "bg-[var(--color-green-100)]"
      } rounded-3xl flex m-5`}
    >
      <div className="relative overflow-hidden w-[33%] p-5 flex justify-center items-center">
        {/* round ribbon left begin */}
        <div className="absolute -top-[23px] -right-[20px] h-[33px] w-[33px] bg-[var(--color-grey-0)] rounded-full "></div>
        <div className="absolute -bottom-[23px] -right-[20px] h-[33px] w-[33px] bg-[var(--color-grey-0)] rounded-full "></div>
        <div className="absolute top-[25px] -left-[25px] h-[33px] w-[33px] bg-[var(--color-grey-0)] rounded-full "></div>
        <div className="absolute -left-[25px] h-[40px] w-[40px] bg-[var(--color-grey-0)] rounded-full "></div>
        <div className="absolute bottom-[25px] -left-[25px] h-[33px] w-[33px] bg-[var(--color-grey-0)] rounded-full "></div>
        {/* round ribbon left end */}
        <div className="flex flex-col items-center gap-6">
          <Slogan>Decorpic</Slogan>
          <div className="flex flex-col font-bold justify-center items-center h-[110px] w-[110px] bg-[var(--color-grey-0)] rounded-full">
            <span>GIẢM</span>
            <span className="text-[2.5rem]">
              {coupon.discountType === "percentage" ? (
                <span>{coupon.discountValue}%</span>
              ) : (
                <span>{formatCurrency(coupon.discountValue)}</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineClock />
            <span>HSD: </span>
            <span>{formatDate(coupon.endDate)}</span>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden w-[67%] pt-10 pb-10 flex items-center">
        <div className="pl-10 flex flex-col gap-2 w-full border-l border-dashed border-l-[var(--color-grey-400)]">
          <div className="flex gap-3 font-semibold">
            <span>Mã coupon:</span>
            <span className="text-3xl font-bold italic text-[var(--color-green-700)]">
              {coupon.code}
            </span>
          </div>

          <div className="flex gap-3 font-semibold">
            <span>Giá trị giảm:</span>
            <span>
              {coupon.discountType === "percentage" ? (
                <span>{coupon.discountValue}%</span>
              ) : (
                <span>{formatCurrency(coupon.discountValue)}</span>
              )}
            </span>
          </div>

          <div className="gap-3 italic text-wrap">
            <span className="mr-3">Áp dụng cho đơn hàng tối thiểu:</span>
            <span className="font-semibold">
              {formatCurrency(coupon.minimumPriceToUse)}
            </span>
          </div>

          <div className="flex gap-3 italic">
            <span>Số lượng có hạn, áp dụng cho mọi sản phẩm.</span>
          </div>
          <div className="mt-3 ml-auto pr-10">
            {isInOrder && (
              <CouponItemButtonForAuthenticatedInOrder
                couponOfUser={couponOfUser} // can coupon.coupon
                isAppliable={isAppliable}
                isApplied={isApplied}
              />
            )}
            {!isInOrder && !isAuthenticated && <CouponItemButton />}

            {!isInOrder && isAuthenticated && (
              <CouponItemButtonForAuthenticated coupon={coupon} />
            )}
          </div>
        </div>
        {/* round ribbon right begin */}
        <div className="absolute -bottom-[23px] -left-[20px] h-[33px] w-[33px] bg-[var(--color-grey-0)] rounded-full "></div>
        <div className="absolute -top-[23px] -left-[20px] h-[33px] w-[33px] bg-[var(--color-grey-0)] rounded-full "></div>
        <div className="absolute top-[25px] -right-[25px] h-[33px] w-[33px] bg-[var(--color-grey-0)] rounded-full "></div>
        <div className="absolute -right-[25px] h-[40px] w-[40px] bg-[var(--color-grey-0)] rounded-[50%]"></div>
        <div className="absolute bottom-[25px] -right-[25px] h-[33px] w-[33px] bg-[var(--color-grey-0)] rounded-full "></div>
        {/* round ribbon right end */}
      </div>
    </div>
  );
}

export default CouponItem;
