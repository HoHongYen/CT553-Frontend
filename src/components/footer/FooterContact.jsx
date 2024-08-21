import {
  HiOutlineBuildingLibrary,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineShoppingBag,
} from "react-icons/hi2";

function FooterContact() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold mb-6 flex justify-center uppercase md:justify-start items-center">
        Liên hệ
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <HiOutlineBuildingLibrary />
          <p>3/2, Xuân Khánh, Ninh Kiều, Cần Thơ</p>
        </div>
        <div className="flex gap-3 items-center">
          <HiOutlineShoppingBag />
          <p>Cửa hàng tranh trang trí DECORPIC</p>
        </div>
        <div className="flex gap-3 items-center">
          <HiOutlineEnvelope />
          <p>decorpic@gmail.com</p>
        </div>
        <div className="flex gap-3 items-center">
          <HiOutlinePhone />
          <p>0292 3832 663</p>
        </div>
      </div>
    </div>
  );
}

export default FooterContact;
