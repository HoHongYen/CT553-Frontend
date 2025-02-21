import TableOperations from "@/components/ui/TableOperations";
import Filter from "@/components/ui/Filter";
import SortBy from "@/components/ui/SortBy";

function ProductFilterOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="giam-gia"
        options={[
          { value: "tat-ca", label: "Tất cả" },
          { value: "dang-giam-gia", label: "Đang giảm giá" },
          { value: "khong-giam-gia", label: "Không giảm giá" },
        ]}
      />
      <SortBy
        options={[
          { value: "moi-nhat", label: "Hàng mới nhất" },
          { value: "cu-nhat", label: "Hàng cũ nhất" },
          { value: "ten-tang-dan", label: "Xếp theo tên (A-Z)" },
          { value: "ten-giam-dan", label: "Xếp theo tên (Z-A)" },
          {
            value: "rating-tang-dan",
            label: "Xếp theo rating tăng dần",
          },
          {
            value: "rating-giam-dan",
            label: "Xếp theo rating giảm dần",
          },
          {
            value: "gia-tang-dan",
            label: "Xếp theo giá tăng dần",
          },
          {
            value: "gia-giam-dan",
            label: "Xếp theo giá giảm dần",
          },
        ]}
      />
    </TableOperations>
  );
}

export default ProductFilterOperations;
