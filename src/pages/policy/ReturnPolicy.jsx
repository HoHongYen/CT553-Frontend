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
      <Heading as="h1">Chính sách đổi trả</Heading>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <Heading as="h2">1. Điều kiện đổi trả </Heading>
          <P>
            Quý khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/
            trả lại hàng ngay tại thời điểm giao / nhận hàng trong những trường
            hợp sau:
          </P>
          <Ul>
            <li>
              Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như
              trên website tại thời điểm đặt hàng.
            </li>
            <li>Không đủ số lượng, không đủ bộ như trong đơn hàng.</li>
            <li>
              Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể
              vỡ…
            </li>
          </Ul>
          <P>
            Khách hàng có trách nhiệm trình giấy tờ liên quan chứng minh sự
            thiếu sót trên để hoàn thành việc hoàn trả/đổi trả hàng hóa.{" "}
          </P>
        </div>

        <div className="flex flex-col gap-5">
          <Heading as="h2">
            2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả{" "}
          </Heading>
          <Ul>
            <li>
              Thời gian thông báo đổi trả: trong vòng 48h kể từ khi nhận sản
              phẩm đối với trường hợp sản phẩm thiếu phụ kiện, quà tặng hoặc bể
              vỡ.
            </li>
            <li>
              Thời gian gửi chuyển trả sản phẩm: trong vòng 14 ngày kể từ khi
              nhận sản phẩm.
            </li>
            <li>
              Địa điểm đổi trả sản phẩm: Khách hàng có thể mang hàng trực tiếp
              đến văn phòng/ cửa hàng của chúng tôi hoặc chuyển qua đường bưu
              điện.
            </li>
          </Ul>
        </div>

        <div className="flex flex-col gap-5">
          <Heading as="h2">3. Hình thức đổi trả</Heading>
          <P>
            Chúng tôi thực hiện đổi hàng hóa đúng loại sản phẩm mà khách hàng
            đặt đối với sản phẩm giao sai hàng/ sai số lượng hoặc khi phát sinh
            sản phẩm không đạt cam kết.
          </P>
          <P>
            Đổi sản phẩm khác có giá trị tương đương cho khách hàng trong trường
            hợp sản phẩm khách hàng đã đặt hết hàng nếu khách hàng đồng ý.
            Trường hợp khách hàng không còn nhu cầu nữa do lỗi hàng hóa hoặc
            không đồng ý với hàng hóa được đổi lại công ty sẽ hoàn phí cho khách
            hàng bằng hình thức chuyển khoản hoặc theo phương thức thỏa thuận
            với khách hàng trong vòng 07 ngày làm việc kể từ ngày nhận được yêu
            cầu. Rate this page
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
