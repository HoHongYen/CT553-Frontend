import { useNavigate } from "react-router-dom";
import { useCancelOrder } from "@/hooks/orders/useCancelOrder";
import {
  ORDER_STATUS,
  PAYMENT_STATUS,
  PAYMENT_STATUS_COLOR,
  PAYMENT_STATUS_TEXT,
} from "@/utils/constants";
import { formatCurrency } from "@/utils/helpers";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import Tag from "@/components/ui/Tag";
import { useCreateRedirectUrlVNPAY } from "@/hooks/orders/useCreateRedirectUrlVNPAY";
import toast from "react-hot-toast";

function OrderFooter({ order }) {
  const navigate = useNavigate();
  const { isDeleting, cancelOrder } = useCancelOrder();
  const { dispatch } = useCart();
  const { createRedirectUrlVNPAY } = useCreateRedirectUrlVNPAY();

  const handleCancelOrder = () => {
    cancelOrder(order.id);
  };

  const handleReOrder = () => {
    console.log("Re-order");
    order.orderDetail.forEach((item) => {
      if (item.variant.quantity === 0) {
        toast.error(
          `${item.variant.product.name} với kích thước đã chọn đã hết hàng!`
        );
        return;
      }
      if (item.quantity > item.variant.quantity) {
        toast.error(
          `${item.variant.product.name} với kích thước đã chọn chỉ còn ${item.variant.quantity} sản phẩm!`
        );
      }
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          variant: item.variant,
          quantity:
            item.quantity <= item.variant.quantity
              ? item.quantity
              : item.variant.quantity,
          isChecked: true,
          product: item.variant.product,
          finalPricePerOne: item.price,
        },
      });
    });

    navigate("/gio-hang");
  };

  const handleVNPAYPayment = () => {
    console.log("VNPAY payment");
    createRedirectUrlVNPAY({ orderId: order.id, amount: order.finalPrice });
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <div className="italic">
          <span className="font-semibold mr-2">Phí vận chuyển:</span>{" "}
          {formatCurrency(order.shippingFee)}
        </div>
        {order.totalDiscount > 0 && (
          <div className="italic">
            <span className="font-semibold mr-2">Áp dụng coupon:</span> -
            {formatCurrency(order.totalDiscount)}
          </div>
        )}
        <div className="italic">
          <span className="font-semibold mr-2">Phương thức thanh toán:</span>{" "}
          {order.payment.paymentMethod.name === "COD"
            ? "Thanh toán khi nhận hàng"
            : "Thanh toán qua VNPAY"}
        </div>
        <div className="flex items-center italic">
          <span className="font-semibold mr-2">Tổng thanh toán:</span>
          <h3 className="text-4xl text-[var(--color-green-700)] font-bold mt-auto">
            {formatCurrency(order.finalPrice)}
          </h3>
        </div>
        <div className="flex items-center italic">
          <span className="font-semibold mr-2">Trạng thái thanh toán:</span>{" "}
          <Tag
            className="not-italic"
            type={`${PAYMENT_STATUS_COLOR[order.payment.paymentStatus.name]}`}
          >
            {PAYMENT_STATUS_TEXT[order.payment.paymentStatus.name]}
          </Tag>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {order.payment.paymentStatus.name === PAYMENT_STATUS.FAILED && (
          <Button onClick={handleVNPAYPayment} variation="success">
            Thanh toán lại
          </Button>
        )}
        {order.currentStatus.name === ORDER_STATUS.CANCELED && (
          <Button onClick={handleReOrder} variation="success">
            Mua lại
          </Button>
        )}
        {order.currentStatus.name === ORDER_STATUS.AWAITING_CONFIRM && (
          <Modal>
            <Modal.Open opens="cancelOrder">
              <Button variation="danger">Hủy đơn hàng</Button>
            </Modal.Open>
            <Modal.Window name="cancelOrder">
              <ConfirmCertain
                resourceName="Bạn có chắc chắn muốn hủy đơn hàng này?"
                disabled={isDeleting}
                onConfirm={handleCancelOrder}
              />
            </Modal.Window>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default OrderFooter;
