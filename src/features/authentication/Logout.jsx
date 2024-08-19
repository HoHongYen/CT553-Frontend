import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
import Modal from "../../ui/Modal";
import ConfirmCertain from "../../ui/ConfirmCertain";

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <Modal>
      <Modal.Open opens="delete">
        <ButtonIcon disabled={isLoading} onClick={logout}>
          {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
        </ButtonIcon>
      </Modal.Open>
      <Modal.Window name="delete">
        <ConfirmCertain
          resourceName="Bạn có chắc chắn muốn đăng xuất?"
          disabled={isLoading}
          onConfirm={logout}
        />
      </Modal.Window>
    </Modal>
  );
}

export default Logout;
