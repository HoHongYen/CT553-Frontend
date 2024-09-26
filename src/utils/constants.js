import { HiOutlineCash, HiOutlineTruck } from "react-icons/hi";
import { HiMiniArrowPathRoundedSquare, HiOutlineEye, HiOutlineGift, HiOutlineLockClosed, HiOutlineMapPin, HiOutlineShoppingBag, HiOutlineUser, HiOutlineWrench } from "react-icons/hi2";

export const PAGE_SIZE = 8;
export const PAGE_SIZE_ORDER = 5;
export const PAGE_SIZE_REVIEW = 3;

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
        title: "Coupon",
    },
];

export const backgroundImages = [
    "https://bantranh.com/wp-content/uploads/2024/02/phongkhach2.png",
    "https://bantranh.com/wp-content/uploads/2024/02/phongkhach13.png",
    "https://bantranh.com/wp-content/uploads/2024/02/phongkhach14.png",
    "https://bantranh.com/wp-content/uploads/2024/02/phongkhach16.png",
    "https://bantranh.com/wp-content/uploads/2024/02/congso4.png",
    "https://bantranh.com/wp-content/uploads/2024/02/congso7.png",
    "https://bantranh.com/wp-content/uploads/2024/02/phongtam.png",
    "https://bantranh.com/wp-content/uploads/2024/02/phongan1.png",
    "https://bantranh.com/wp-content/uploads/2024/02/phongngu2.png",
    "https://bantranh.com/wp-content/uploads/2024/02/phongngu68.png",
    "https://bantranh.com/wp-content/uploads/2021/02/phong1.png",
    "https://bantranh.com/wp-content/uploads/2021/02/phong2.png",
    "https://bantranh.com/wp-content/uploads/2021/02/phong3.png",
    "https://bantranh.com/wp-content/uploads/2021/02/phong4.png",
    "https://bantranh.com/wp-content/uploads/2021/02/phong5.png",
];

export const colorImages = [
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/11.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/22.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/33.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/44.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/55.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/66.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/77.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/88.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/99.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/100.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/110.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/120.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/130.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/140.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/150.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/160.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/170.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/180.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/190.png",
    "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/200.png",
];

export const PRODUCT_NEWEST = "Newest";
export const PRODUCT_TRENDING = "Trending";
export const PRODUCT_FOR_YOU = "ForYou";
export const PRODUCT_ALL = "All";
export const PRODUCT_SALES = "Sales";

export const ORDER_STATUS = {
    AWAITING_CONFIRM: "AWAITING_CONFIRM",
    AWAITING_FULFILLMENT: "AWAITING_FULFILLMENT",
    DELIVERING: "DELIVERING",
    DELIVERED: "DELIVERED",
    CANCELED: "CANCELED",
    RETURNED: "RETURNED",
};

export const ORDER_STATUS_TEXT = {
    [ORDER_STATUS.AWAITING_CONFIRM]: "Chờ xác nhận",
    [ORDER_STATUS.AWAITING_FULFILLMENT]: "Đang xử lý",
    [ORDER_STATUS.DELIVERING]: "Đang giao",
    [ORDER_STATUS.DELIVERED]: "Đã giao",
    [ORDER_STATUS.CANCELED]: "Đã hủy",
    [ORDER_STATUS.RETURNED]: "Đổi trả",
};

export const ORDER_STATUS_COLOR = {
    [ORDER_STATUS.AWAITING_CONFIRM]: "blue",
    [ORDER_STATUS.AWAITING_FULFILLMENT]: "indigo",
    [ORDER_STATUS.DELIVERING]: "yellow",
    [ORDER_STATUS.DELIVERED]: "green",
    [ORDER_STATUS.CANCELED]: "red",
    [ORDER_STATUS.RETURNED]: "grey",
};

export const PAYMENT_STATUS = {
    PENDING: "PENDING",
    SUCCESS: "SUCCESS",
    FAILED: "FAILED",
};

export const PAYMENT_STATUS_TEXT = {
    [PAYMENT_STATUS.PENDING]: "Chờ thanh toán",
    [PAYMENT_STATUS.SUCCESS]: "Thành công",
    [PAYMENT_STATUS.FAILED]: "Thất bại",
};

export const PAYMENT_STATUS_COLOR = {
    [PAYMENT_STATUS.PENDING]: "blue",
    [PAYMENT_STATUS.SUCCESS]: "green",
    [PAYMENT_STATUS.FAILED]: "red",
};