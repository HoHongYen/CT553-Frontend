import { v4 as uuidv4 } from "uuid";

import Spinner from "@/components/ui/Spinner";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import AddressRow from "./AddressRow";

function AddressTable() {
  // const { isLoading, categories } = useCategories();

  // if (isLoading) return <Spinner />;
  // if (!categories.length) return <Empty resourceName="categories" />;

  // 1. Filter
  // const filterValue = searchParams.get("discount") || "all";
  // let filteredCabins;
  // if (filterValue === "all") filteredCabins = cabins;
  // if (filterValue === "no-discount")
  //   filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  // if (filterValue === "with-discount")
  //   filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2. Sort
  // const sortBy = searchParams.get("sortBy") || "create_at-asc";
  // const [field, direction] = sortBy.split("-");
  // const modifier = direction === "asc" ? 1 : -1;
  // const sortedCabins = filteredCabins.sort(
  //   (a, b) => (a[field] - b[field]) * modifier
  // );

  const addresses = [
    {
      id: uuidv4(),
      provinceId: "1",
      provinceName: "Hà Nội",
      districtId: "2",
      districtName: "Ba Đình",
      wardId: "3",
      wardName: "Cống Vị",
      detailAddress: "Số 1, ngõ 1, phố 1",
      contactName: "Nguyễn Văn A",
      contactPhone: "0987654321",
      isDefault: true,
      isDeleted: false,
    },
    {
      id: uuidv4(),
      provinceId: "1",
      provinceName: "Cà Mau",
      districtId: "2",
      districtName: "Phú Tân",
      wardId: "3",
      wardName: "Việt Thắng",
      detailAddress: "Số 1",
      contactName: "Nguyễn Văn B",
      contactPhone: "0987654321",
      isDefault: false,
      isDeleted: false,
    },
    {
      id: uuidv4(),
      provinceId: "1",
      provinceName: "Cần Thơ",
      districtId: "2",
      districtName: "Phú Tân",
      wardId: "3",
      wardName: "Việt Thắng",
      detailAddress: "Số 1",
      contactName: "Nguyễn Văn C",
      contactPhone: "0987654321",
      isDefault: false,
      isDeleted: true,
    },
  ];

  return (
    <Menus>
      <Table columns="2fr 1.5fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Tên</div>
          <div>Số điện thoại</div>
          <div>Tỉnh/thành phố</div>
          <div>Quận/huyện</div>
          <div>Xã/phường</div>
          <div>Chi tiết</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={sortedCabins}
          data={addresses}
          render={(address) => (
            <AddressRow key={address.id} address={address} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default AddressTable;
