import { HiOutlineCash, HiOutlineTruck } from "react-icons/hi";
import { HiMiniArrowPathRoundedSquare, HiOutlineEye, HiOutlineGift, HiOutlineLockClosed, HiOutlineMapPin, HiOutlineShoppingBag, HiOutlineUser, HiOutlineWrench } from "react-icons/hi2";

export const PAGE_SIZE = 10;

export const policies = [
    { title: "Chính sách thanh toán", icon: HiOutlineCash },
    { title: "Chính sách giao hàng", icon: HiOutlineTruck },
    { title: "Chính sách kiểm hàng", icon: HiOutlineEye },
    { title: "Chính sách đổi trả", icon: HiMiniArrowPathRoundedSquare },
    { title: "Chính sách bảo hành", icon: HiOutlineWrench },
    { title: "Chính sách bảo mật", icon: HiOutlineLockClosed },
];

export const profileLinks = [
    {
        icon: HiOutlineUser,
        title: "Thông tin cá nhân",
    },
    {
        icon: HiOutlineLockClosed,
        title: "Thay đổi mật khẩu",
    },
    {
        icon: HiOutlineShoppingBag,
        title: "Quản lý đơn hàng",
    },
    {
        icon: HiOutlineMapPin,
        title: "Sổ địa chỉ",
    },
    {
        icon: HiOutlineGift,
        title: "Kho voucher",
    },
];