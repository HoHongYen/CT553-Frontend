import Logo from "@/components/header/Logo";
import { useShopInfo } from "@/hooks/shopInfo/useShopInfo";
import { Skeleton } from "antd";

function FooterAbout() {
  const { shopInfo } = useShopInfo();
  if (!shopInfo) return <Skeleton active />;

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-6 font-bold flex gap-3 justify-center uppercase md:justify-start items-center">
        Về chúng tôi
      </h2>
      <div className="flex gap-4">
        <Logo />
        <div className="flex flex-col gap-3">
          <p>Tên cửa hàng: {shopInfo.name}</p>
          <p>Giấy phép kinh doanh: {shopInfo.businessCode}</p>
          <p>Giờ làm việc: {shopInfo.workingTime}</p>
          <div className="w-[180px]">
            <img
              src="https://dangkywebvoibocongthuong.com/wp-content/uploads/2021/11/logo-da-thong-bao-bo-cong-thuong.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterAbout;
