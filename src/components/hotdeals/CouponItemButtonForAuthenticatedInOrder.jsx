import { useQueryClient } from "@tanstack/react-query";
import { ORDER_ACTIONS, useOrder } from "@/context/OrderContext";
import Button from "../ui/Button";

function CouponItemButtonForAuthenticatedInOrder({
  couponOfUser,
  isAppliable,
  isApplied,
}) {
  const queryClient = useQueryClient();

  const { dispatch } = useOrder();

  const handleApplyCoupon = async () => {
    dispatch({
      type: ORDER_ACTIONS.SET_APPLIED_COUPON,
      payload: { appliedCoupon: couponOfUser },
    });
  };

  const handleRemoveApplyCoupon = async () => {
    dispatch({ type: ORDER_ACTIONS.REMOVE_APPLIED_COUPON });
  };

  return (
    <>
      {isAppliable && !isApplied ? (
        <Button onClick={handleApplyCoupon} variation="success">
          Áp dụng
        </Button>
      ) : isApplied ? (
        <Button variation="danger" onClick={handleRemoveApplyCoupon}>
          Hủy áp dụng
        </Button>
      ) : (
        <Button disabled variation="disabled">
          Không đủ điều kiện áp dụng
        </Button>
      )}
    </>
  );
}

export default CouponItemButtonForAuthenticatedInOrder;
