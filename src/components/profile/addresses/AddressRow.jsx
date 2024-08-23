import { HiLockClosed, HiPencil } from "react-icons/hi2";

import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import Tag from "@/components/ui/Tag";

function AddressRow({ address }) {
  // const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    id: addressId,
    provinceId,
    provinceName,
    districtId,
    districtName,
    wardId,
    wardName,
    detailAddress,
    contactName,
    contactPhone,
    isDefault,
    isDeleted,
  } = address;

  return (
    <>
      <Table.Row>
        <div className="flex flex-col gap-3">
          {contactName}{" "}
          {isDeleted && (
            <div>
              <Tag type="red">Đã xóa</Tag>
            </div>
          )}
          {isDefault && (
            <div>
              <Tag type="green">Mặc định</Tag>
            </div>
          )}
        </div>
        <div>{contactPhone}</div>
        <div>{provinceName}</div>
        <div>{districtName}</div>
        <div>{wardName}</div>
        <div>{detailAddress}</div>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={addressId} />
              <Menus.List id={addressId}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Xem chi tiết</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiLockClosed />}>
                    Xóa danh mục
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit">
              {/* <CreateCabinForm cabinToEdit={user} /> */}
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmCertain
                resourceName="addresses"
                // disabled={isDeleting}
                // onConfirm={() => deleteCabin(userId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default AddressRow;
