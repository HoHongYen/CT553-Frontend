import { useAddresses } from "@/hooks/profile/addresses/useAddresses";

import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import AddressRow from "./AddressRow";

function AddressTable({ isAddressInOrderPage = false }) {
  const { addresses } = useAddresses();

  const columns = isAddressInOrderPage
    ? "0.5fr 2fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr"
    : "2fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr";

  return (
    <Menus>
      <Table columns={columns}>
        <Table.Header>
          {isAddressInOrderPage && <div></div>}
          <div>Tên người nhận</div>
          <div>Số điện thoại</div>
          <div>Tỉnh / thành phố</div>
          <div>Quận / huyện</div>
          <div>Xã / phường</div>
          <div>Chi tiết</div>
          <div></div>
        </Table.Header>
          <Table.Body
            data={addresses}
            render={(address) => (
              <AddressRow
                isAddressInOrderPage={isAddressInOrderPage}
                key={address.id}
                address={address}
              />
            )}
          />
      </Table>
    </Menus>
  );
}

export default AddressTable;
