import { useUpdateAddress } from "@/hooks/profile/addresses/useUpdateAddress";
import { useDeleteAddress } from "@/hooks/profile/addresses/useDeleteAddress";
import { ORDER_ACTIONS, useOrder } from "@/context/OrderContext";

import styled from "styled-components";
import { HiKey, HiPencil, HiTrash } from "react-icons/hi2";

import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import Tag from "@/components/ui/Tag";
import CreateAddressForm from "./CreateAddressForm";
import TickRoundIcon from "@/components/icons/TickRoundIcon";
import EmptyRoundBoxIcon from "@/components/icons/EmptyRoundBoxIcon";

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

function AddressRow({ address, isAddressInOrderPage }) {
  const { isLoading: isUpdating, updateAddress } = useUpdateAddress();
  const { isLoading: isDeleting, deleteAddress } = useDeleteAddress();

  const { address: addressToOrder, dispatch } = useOrder();

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

  const handleSetDefault = () => {
    updateAddress({
      addressId,
      updatedAddress: { ...address, isDefault: true },
    });
  };

  const handleDelete = () => {
    console.log("handleDelete");
    deleteAddress(addressId);
  };

  return (
    <>
      <Table.Row>
        {isAddressInOrderPage && (
          <div
            onClick={() =>
              dispatch({
                type: ORDER_ACTIONS.SET_ADDRESS,
                payload: { address: address },
              })
            }
            className="flex cursor-pointer items-center w-8"
          >
            {addressToOrder?.id === addressId ? (
              <TickRoundIcon />
            ) : (
              <EmptyRoundBoxIcon />
            )}
          </div>
        )}
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
                  <Menus.Button icon={<HiPencil />}>Chỉnh sửa</Menus.Button>
                </Modal.Open>

                {!isDefault && (
                  <StyledButton
                    variation="secondary"
                    disabled={isUpdating}
                    onClick={handleSetDefault}
                  >
                    <HiKey />
                    Đặt làm mặc định
                  </StyledButton>
                )}

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Xóa địa chỉ</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit">
              <CreateAddressForm addressToEdit={address} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmCertain
                resourceName="Bạn có chắc chắn muốn xóa địa chỉ này?"
                disabled={isDeleting}
                onConfirm={() => handleDelete(addressId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default AddressRow;
