import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import CreateAddressForm from "./CreateAddressForm";

function AddAddress() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="address-form">
          <Button>Thêm địa chỉ mới</Button>
        </Modal.Open>
        <Modal.Window name="address-form">
          <CreateAddressForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddAddress;
