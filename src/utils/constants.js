import { HiOutlineCash, HiOutlineTruck } from "react-icons/hi";
import { HiMiniArrowPathRoundedSquare, HiOutlineEye, HiOutlineLockClosed, HiOutlineWrench } from "react-icons/hi2";

export const PAGE_SIZE = 10;

export const policies = [
    { name: "Chính sách thanh toán", icon: HiOutlineCash },
    { name: "Chính sách giao hàng", icon: HiOutlineTruck },
    { name: "Chính sách kiểm hàng", icon: HiOutlineEye },
    { name: "Chính sách đổi trả", icon: HiMiniArrowPathRoundedSquare },
    { name: "Chính sách bảo hành", icon: HiOutlineWrench },
    { name: "Chính sách bảo mật", icon: HiOutlineLockClosed },
];