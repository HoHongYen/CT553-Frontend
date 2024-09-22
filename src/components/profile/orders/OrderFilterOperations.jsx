import { formatSlugify } from "@/utils/helpers";
import { ORDER_STATUS, ORDER_STATUS_TEXT } from "@/utils/constants";
import TableOperations from "@/components/ui/TableOperations";
import Filter from "@/components/ui/Filter";
import SortBy from "@/components/ui/SortBy";

function OrderFilterOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="trang-thai"
        options={[
          { value: "tat-ca", label: "Tất cả" },
          // { value: "cho-xac-nhan", label: "Chờ xác nhận" },
          {
            value: formatSlugify(
              ORDER_STATUS_TEXT[ORDER_STATUS.AWAITING_CONFIRM]
            ),
            label: ORDER_STATUS_TEXT[ORDER_STATUS.AWAITING_CONFIRM],
          },
          {
            value: formatSlugify(
              ORDER_STATUS_TEXT[ORDER_STATUS.AWAITING_FULFILLMENT]
            ),
            label: ORDER_STATUS_TEXT[ORDER_STATUS.AWAITING_FULFILLMENT],
          },
          {
            value: formatSlugify(ORDER_STATUS_TEXT[ORDER_STATUS.DELIVERING]),
            label: ORDER_STATUS_TEXT[ORDER_STATUS.DELIVERING],
          },
          {
            value: formatSlugify(ORDER_STATUS_TEXT[ORDER_STATUS.DELIVERED]),
            label: ORDER_STATUS_TEXT[ORDER_STATUS.DELIVERED],
          },
          {
            value: formatSlugify(ORDER_STATUS_TEXT[ORDER_STATUS.CANCELED]),
            label: ORDER_STATUS_TEXT[ORDER_STATUS.CANCELED],
          },
          {
            value: formatSlugify(ORDER_STATUS_TEXT[ORDER_STATUS.RETURNED]),
            label: ORDER_STATUS_TEXT[ORDER_STATUS.RETURNED],
          },
        ]}
      />
      <SortBy
        options={[
          { value: "don-moi-nhat", label: "Đơn mới nhất" },
          { value: "don-cu-nhat", label: "Đơn cũ nhất" },
          {
            value: "gia-tang-dan",
            label: "Tổng thanh toán tăng dần",
          },
          {
            value: "gia-giam-dan",
            label: "Tổng thanh toán giảm dần",
          },
        ]}
      />
    </TableOperations>
  );
}

export default OrderFilterOperations;
