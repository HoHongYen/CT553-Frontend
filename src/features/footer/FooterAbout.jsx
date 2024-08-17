import Logo from "../../ui/Logo";

function FooterAbout() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-6 font-bold flex gap-3 justify-center uppercase md:justify-start items-center">
        Về chúng tôi
      </h2>
      <div className="flex gap-4">
        <Logo />
        <div className="flex flex-col gap-3">
          <p>Tên cửa hàng: DECORPIC</p>
          <p>Giấy phép kinh doanh: 01020201</p>
          <p>Giờ làm việc: 7:00 - 22:00 (Thứ Hai - Chủ Nhật)</p>
        </div>
      </div>
    </div>
  );
}

export default FooterAbout;
