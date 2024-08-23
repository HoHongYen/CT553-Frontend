import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import CreateAddressForm from "./CreateAddressForm";

function AddAddress() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="category-form">
          <Button>Thêm địa chỉ mới</Button>
        </Modal.Open>
        <Modal.Window name="category-form">
          <CreateAddressForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddAddress;
