import { useShopInfo } from "@/hooks/shopInfo/useShopInfo";
import { Skeleton } from "antd";
import {
  HiOutlineBuildingLibrary,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineShoppingBag,
} from "react-icons/hi2";

function FooterContact() {
  const { shopInfo } = useShopInfo();
  if (!shopInfo) return <Skeleton active />;

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold mb-6 flex justify-center uppercase md:justify-start items-center">
        Liên hệ
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <HiOutlineBuildingLibrary />
          <p>
            {shopInfo.detailAddress}, {shopInfo.wardName},{" "}
            {shopInfo.districtName}, {shopInfo.provinceName}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <HiOutlineShoppingBag />
          <p>{shopInfo.fullName}</p>
        </div>
        <div className="flex gap-3 items-center">
          <HiOutlineEnvelope />
          <p>{shopInfo.email}</p>
        </div>
        <div className="flex gap-3 items-center">
          <HiOutlinePhone />
          <p>{shopInfo.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default FooterContact;
