import { HiOutlineCamera } from "react-icons/hi2";
import ButtonIcon from "../ui/ButtonIcon";
import Modal from "../ui/Modal";

import ProductSearchImageModal from "./ProductSearchImageModal";

function ProductSearchImage({ setIsSearchOpen }) {
  return (
    <Modal>
      <Modal.Open opens="customImage">
        <ButtonIcon onClick={() => setIsSearchOpen(true)}>
          <HiOutlineCamera />
        </ButtonIcon>
      </Modal.Open>
      <Modal.Window name="customImage">
        <ProductSearchImageModal
          setIsSearchOpen={setIsSearchOpen}
        />
      </Modal.Window>
    </Modal>
  );
}

export default ProductSearchImage;
