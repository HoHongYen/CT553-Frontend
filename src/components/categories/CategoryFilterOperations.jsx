import TableOperations from "@/components/ui/TableOperations";
import Filter from "@/components/ui/Filter";
import SortBy from "@/components/ui/SortBy";

function CategoryFilterOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "Tất cả" },
          { value: "no-discount", label: "Không giảm giá" },
          { value: "with-discount", label: "Đang giảm giá" },
        ]}
      />
      <SortBy
        options={[
          { value: "createdAt-desc", label: "Mới nhất" },
          { value: "createdAt-asc", label: "Cũ nhất" },
          { value: "name-asc", label: "Xếp theo tên (A-Z)" },
          { value: "name-desc", label: "Xếp theo tên (Z-A)" },
          {
            value: "price-asc",
            label: "Xếp theo giá tăng dần",
          },
          {
            value: "price-desc",
            label: "Xếp theo giá giảm dần",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CategoryFilterOperations;
