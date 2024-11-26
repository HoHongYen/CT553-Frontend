import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import toast from "react-hot-toast";

function CouponItemButton() {
  const navigate = useNavigate();
  const handleCollectCoupon = () => {
    toast.error("Vui lòng đăng nhập để nhận mã giảm giá!");
    navigate("/dang-nhap");
  };

  return (
    <Button variation="success" onClick={handleCollectCoupon}>
      Nhận ngay
    </Button>
  );
}

export default CouponItemButton;
