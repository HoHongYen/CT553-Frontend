import Heading from "@/components/ui/Heading";
import { HiOutlinePhone } from "react-icons/hi2";
import styled from "styled-components";

const P = styled.p`
  line-height: 1.75;
`;

const Ul = styled.ul`
  margin-left: 3rem;
  list-style-type: disc;
  line-height: 1.75;
`;

function ReturnPolicy() {
  return (
    <div className="flex flex-col gap-8">
      <Heading as="h1">Chính sách bảo hành</Heading>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <Heading as="h2">1. Điều kiện bảo hành </Heading>
          <P>
            Sản phẩm được bảo hành miễn phí nếu đảm bảo tất cả các điều kiện
            sau:
          </P>
          <Ul>
            <li>Sản phẩm bị lỗi kỹ thuật do Nhà sản xuất.</li>
            <li>Thời hạn bảo hành trên phiếu bảo hành vẫn còn hiệu lực.</li>
            <li>
              Phiếu bảo hành còn nguyên vẹn, không chắp vá, không bị gạch xóa
              hay sửa chữa, bôi bẩn.
            </li>
            <li>
              Phiếu bảo hành đầy đủ thông tin: mã sản phẩm, số seri, ngày sản
              xuất, tên khách hàng sử dụng, địa chỉ, ngày mua.
            </li>
          </Ul>
          <P>
            Sản phẩm không được bảo hành hoặc sẽ phát sinh phí bảo hành nếu rơi
            vào một trong các trường hợp sau:
          </P>
          <Ul>
            <li>
              Sản phẩm không thỏa mãn một trong những điều kiện bảo hành ở mục
              1.
            </li>
            <li>Số series, model sản phẩm không khớp với Phiếu bảo hành.</li>
            <li>
              Khách hàng tự ý can thiệp sửa chữa sản phẩm hoặc sửa chữa tại
              những trung tâm bảo hành không được sự ủy nhiệm của Nhà sản xuất.
            </li>
          </Ul>
        </div>

        <div className="flex flex-col gap-5">
          <Heading as="h2">2. Thời hạn bảo hành</Heading>
          <P>Bảo hành 06 tháng độ bền màu của sản phẩm.</P>
        </div>

        <div className="flex flex-col gap-5">
          <Heading as="h2">3. ĐỊA ĐIỂM BẢO HÀNH</Heading>
          <P>
            Tại cửa hàng tranh trang trí DECORPIC: 3/2, Xuân Khánh, Ninh Kiều,
            Cần Thơ
          </P>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <HiOutlinePhone /> Liên hệ để được hỗ trợ: 0292 3832 663
      </div>
      <div className="font-bold">
        Chúng tôi cam kết kinh doanh minh bạch, hợp pháp, bán hàng chất lượng,
        có nguồn gốc.
      </div>
    </div>
  );
}

export default ReturnPolicy;
