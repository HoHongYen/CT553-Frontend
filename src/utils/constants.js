import { HiOutlineCash, HiOutlineTruck } from "react-icons/hi";
import { HiMiniArrowPathRoundedSquare, HiOutlineEye, HiOutlineGift, HiOutlineLockClosed, HiOutlineMapPin, HiOutlineShoppingBag, HiOutlineUser, HiOutlineWrench } from "react-icons/hi2";
import { v4 as uuidv4 } from "uuid";

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

export const products = [
    {
        id: uuidv4(),
        name: "Lovely cành hồng nghệ thuật TG3338",
        image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
        },
        price: 1100200,
        isDiscount: true,
        created_at: "2024-08-20T11:21:56.337Z",
        // images
    },
    {
        id: uuidv4(),
        name: "Vanegas gương cành hồng nghệ thuật TG3338",
        image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
        },
        price: 1230224,
        isDiscount: false,
        created_at: "2024-08-25T11:21:56.337Z",
        // images
    },
    {
        id: uuidv4(),
        name: "Hoa TG3338",
        image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
        },
        price: 5000000,
        isDiscount: true,
        created_at: "2024-08-12T11:21:56.337Z",
        // images
    },
    {
        id: uuidv4(),
        name: "Yenesa - Tranh tráng gương cành hồng nghệ thuật TG3338",
        image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
        },
        price: 1000000,
        isDiscount: true,
        created_at: "2024-07-20T11:21:56.337Z",
        // images
    },
    {
        id: uuidv4(),
        name: "TG3338",
        image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
        },
        price: 700000,
        isDiscount: false,
        created_at: "2024-05-16T11:21:56.337Z",
        // images
    },
    {
        id: uuidv4(),
        name: "Thuật TG3338",
        image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
        },
        price: 3500000,
        isDiscount: true,
        created_at: "2024-03-16T11:21:56.337Z",
        // images
    },
    {
        id: uuidv4(),
        name: "Nghệ thuật TG3338",
        image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
        },
        price: 600000,
        isDiscount: false,
        created_at: "2024-08-21T11:21:56.337Z",
        // images
    },
    {
        id: uuidv4(),
        name: "Gương cành hồng nghệ thuật TG3338",
        image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
        },
        price: 540000,
        isDiscount: true,
        created_at: "2024-07-20T11:21:56.337Z",
        // images
    },
    {
        id: uuidv4(),
        name: "Tráng gương cành hồng nghệ thuật TG3338",
        image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
        },
        price: 1100000,
        isDiscount: false,
        created_at: "2024-08-11T11:21:56.337Z",
        // images
    },
    {
        id: uuidv4(),
        name: "Hồng nghệ thuật TG3338",
        image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
        },
        price: 3400000,
        isDiscount: true,
        created_at: "2024-09-20T11:21:56.337Z",
        // images
    },
    {
        id: uuidv4(),
        name: "Cành hồng nghệ thuật TG3338",
        image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/z5122716454948_6df55452e093e488987ba4213857f458.jpg",
        },
        price: 4300000,
        isDiscount: false,
        created_at: "2024-02-10T11:21:56.337Z",
        // images
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