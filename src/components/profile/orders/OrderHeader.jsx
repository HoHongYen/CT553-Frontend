import { formatDate } from "@/utils/helpers";
import Heading from "@/components/ui/Heading";
import Tag from "@/components/ui/Tag";
import { ORDER_STATUS_COLOR, ORDER_STATUS_TEXT } from "@/utils/constants";

function OrderHeader({ order }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <Heading as="h2" className="text-[var(--color-brand-700)] font-bold mb-2">
          Mã đơn hàng: #{order.id}
        </Heading>
        <div className="italic">
          <span className="font-semibold mr-2">Ngày đặt hàng:</span>{" "}
          {formatDate(order.createdAt)}
        </div>
        <div className="italic">
          <span className="font-semibold mr-2">Giao tới:</span>{" "}
          {order.deliveryAddress.contactName},{" "}
          {order.deliveryAddress.contactPhone},{" "}
          {order.deliveryAddress.detailAddress},{" "}
          {order.deliveryAddress.wardName}, {order.deliveryAddress.districtName}
          , {order.deliveryAddress.provinceName}
        </div>
      </div>
      <Tag type={`${ORDER_STATUS_COLOR[order.currentStatus.name]}`}>
        {ORDER_STATUS_TEXT[order.currentStatus.name]}
      </Tag>
    </div>
  );
}

export default OrderHeader;
