import { useLogout } from "@/hooks/auth/useLogout";

import { HiArrowRightOnRectangle } from "react-icons/hi2";

import ButtonIcon from "@/components/ui/ButtonIcon";
import SpinnerMini from "@/components/ui/SpinnerMini";
import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";

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
