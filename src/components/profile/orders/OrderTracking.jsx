import {
  ORDER_STATUS,
  ORDER_STATUS_COLOR,
  ORDER_STATUS_TEXT,
} from "@/utils/constants";
import { formatDateTime } from "@/utils/helpers";
import { Steps } from "antd";
import {
  HiOutlineArchiveBoxXMark,
  HiOutlineCheckCircle,
  HiOutlineClipboardDocumentList,
  HiOutlineCube,
  HiOutlineTruck,
  HiMiniArrowPath
} from "react-icons/hi2";
import OrderTrackingText from "./OrderTrackingText";

function OrderTracking({ order }) {
  const {
    currentStatus: { id: orderStatusId },
    orderTracking,
  } = order;

  let statuses = [
    {
      title: ORDER_STATUS_TEXT[ORDER_STATUS.AWAITING_CONFIRM],
      color: ORDER_STATUS_COLOR[ORDER_STATUS.AWAITING_CONFIRM],
      description: "Vui lòng chờ xác nhận đơn hàng.",
      icon: HiOutlineClipboardDocumentList,
    },
    {
      title: ORDER_STATUS_TEXT[ORDER_STATUS.AWAITING_FULFILLMENT],
      color: ORDER_STATUS_COLOR[ORDER_STATUS.AWAITING_FULFILLMENT],
      description: "Đang chuẩn bị đơn hàng để gửi.",
      icon: HiOutlineCube,
    },
    {
      title: ORDER_STATUS_TEXT[ORDER_STATUS.DELIVERING],
      color: ORDER_STATUS_COLOR[ORDER_STATUS.DELIVERING],
      description: "Đơn hàng đang trên đường vận chuyển.",
      icon: HiOutlineTruck,
    },
    {
      title: ORDER_STATUS_TEXT[ORDER_STATUS.DELIVERED],
      color: ORDER_STATUS_COLOR[ORDER_STATUS.DELIVERED],
      description: "Đơn hàng đã được giao thành công.",
      icon: HiOutlineCheckCircle,
    },
    {
      title: ORDER_STATUS_TEXT[ORDER_STATUS.RETURNED],
      color: ORDER_STATUS_COLOR[ORDER_STATUS.RETURNED],
      description: "Đơn hàng đã được đổi trả.",
      icon: HiMiniArrowPath,
    },
  ];

  // check if order is canceled
  if (orderStatusId === 5) {
    statuses = statuses.slice(0, 1);
    statuses.push({
      title: ORDER_STATUS_TEXT[ORDER_STATUS.CANCELED],
      color: ORDER_STATUS_COLOR[ORDER_STATUS.CANCELED],
      description: "Đơn hàng đã bị hủy.",
      icon: HiOutlineArchiveBoxXMark,
    });
  }

  const getBeginAt = (orderStatusId) => {
    const trackingItem = orderTracking.filter(
      (item) => item.orderStatusId === orderStatusId
    );

    if (trackingItem.length === 0) return null;
    return formatDateTime(trackingItem[0].beginAt);
  };

  const items = statuses.map((status, index) => {
    const isFinished = orderStatusId > index + 1;
    const isProcessing = orderStatusId === index + 1 || orderStatusId === 6;
    return {
      title: (
        <OrderTrackingText
          className="font-bold"
          type={isProcessing ? status.color : "grey"}
        >
          {status.title}
        </OrderTrackingText>
      ),
      status: isFinished ? "finish" : isProcessing ? "process" : "wait",
      description: (
        <OrderTrackingText type={isProcessing ? status.color : "grey"}>
          <p>{status.description}</p>
          <p>{getBeginAt(orderStatusId === 6 ? 6 : index + 1)}</p>
        </OrderTrackingText>
      ),
      icon: (
        <OrderTrackingText
          type={isProcessing ? status.color : isFinished ? "" : "grey"}
        >
          <status.icon />
        </OrderTrackingText>
      ),
    };
  });

  return <Steps items={items} />;
}

export default OrderTracking;
