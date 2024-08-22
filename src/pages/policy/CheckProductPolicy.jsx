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

function CheckProductPolicy() {
  return (
    <div className="flex flex-col gap-8">
      <Heading as="h1">Chính sách kiểm hàng</Heading>

      <P>
        Kiểm hàng là thực hiện các công việc kiểm tra và so sánh các sản phẩm
        nhận được trong kiện hàng Decorpic gửi với các sản phẩm trong đơn hàng
        khách yêu cầu.
      </P>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <Heading as="h2">1. Thời điểm kiểm hàng </Heading>
          <P>
            Chúng tôi chấp nhận cho khách hàng đồng kiểm với nhân viên giao hàng
            tại thời điểm nhận hàng.
          </P>
          <P>
            Sau khi nhận hàng, khách hàng kiểm lại phát hiện sai, có thể liên
            lạc với bộ phận chăm sóc khách hàng để được hỗ trợ đổi trả. Lưu ý,
            quý khách quay video lúc mở thùng hàng để đối chiếu khi cần thiết.
          </P>
        </div>

        <div className="flex flex-col gap-5">
          <Heading as="h2">2. Phạm vi kiểm tra </Heading>
          <P>
            Khách hàng được kiểm đếm số lượng sản phẩm thực nhận, đối chiếu, so
            sánh các sản phẩm nhận được với sản phẩm đã đặt trên đơn sau khi
            nhân viên chúng tôi xác nhận đơn hàng theo các tiêu chí:
          </P>
          <Ul>
            <li>
              Theo các thuộc tính cơ bản hàng hóa: tên hàng, đơn vị tính, số
              lượng, quy cách đóng gói, xuất xứ hàng hóa.
            </li>
            <li>
              Theo mẫu mã được hiển thị bởi ảnh đại diện của sản phẩm được lưu
              khi đặt hàng và sau khi được nhân viên chúng tôi xác nhận đơn
              hàng.
            </li>
            <li>
              Tuyệt đối không bóc, mở các hộp sản phẩm có tem niêm phong, tem
              đảm bảo. Không được cào lấy mã các sản phẩm có tích điểm, đổi quà.
            </li>
          </Ul>
        </div>

        <div className="flex flex-col gap-5">
          <Heading as="h2">
            3. Các bước xử lí khi hàng hóa không như mẫu{" "}
          </Heading>
          <P>
            Khi quý khách đồng kiểm, sản phẩm nhận được không như sản phẩm khách
            đặt trên đơn hàng. Xin hãy liên hệ với Hotline : 0292 3832 663 để
            được gặp bộ phận chăm sóc khách hàng xác nhận lại đơn hàng.
            <Ul>
              <li>
                Trường hợp chúng tôi đóng sai đơn hàng theo yêu cầu của khách,
                khách có thể không nhận hàng, không thanh toán. Trong trường hợp
                đơn hàng đã thanh toán, khách hàng có thể yêu cầu gửi lại đơn
                mới hay không, sẽ hoàn lại tiền cho quý khách trong thời gian
                sớm nhất.
              </li>
              <li>
                Trường hợp chúng tôi đóng hàng đúng theo đơn hàng, nhưng khách
                hàng thay đổi nhu cầu, khách hàng có thể yêu cầu đổi trả và áp
                dụng chính sách đổi trả hàng hóa.
              </li>
            </Ul>
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

export default CheckProductPolicy;
