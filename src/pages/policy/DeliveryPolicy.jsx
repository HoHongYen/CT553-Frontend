import Heading from "@/components/ui/Heading";
import { HiOutlinePhone } from "react-icons/hi2";
import styled from "styled-components";

const P = styled.p`
  line-height: 1.75;
`;

function DeliveryPolicy() {
  return (
    <div className="flex flex-col gap-8">
      <Heading as="h1">Chính sách giao hàng</Heading>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <Heading as="h2">1. Đối tác giao hàng</Heading>
          <P>
            Sau khi đơn hàng đã chuẩn bị xong, chúng tôi sẽ bàn giao đơn hàng
            cho bên đối tác vận chuyển. Decorpic hợp tác với nhiều đơn vị vận
            chuyển như Bưu điện, Viettel Post, Ahamove, Giao hàng nhanh... nhằm
            đưa hàng đến tay quý khách nhanh chóng và thuận tiện nhất.
          </P>
        </div>

        <div className="flex flex-col gap-5">
          <Heading as="h2">2. Chi phí giao hàng</Heading>
          <P>
            Decorpic có chính sách miễn phí vận chuyển một số khu vực nội thành
            thành phố Cần Thơ. Với những đơn hàng ở các khu vực khác, chúng tôi
            có thể miễn phí vận chuyển đối với các đơn hàng có giá trị lớn. Để
            biết chính xác bạn có được miễn phí vận chuyển hay không, hãy liên
            hệ trực tiếp với chúng tôi để được tư vấn nhé. Chi phí vận chuyển sẽ
            được chúng tôi thông báo trực tiếp đến khách hàng.
          </P>
        </div>

        <div className="flex flex-col gap-5">
          <Heading as="h2">3. Thời gian giao hàng</Heading>
          <P>
            Sau khi xác nhận đơn hàng, chúng tôi sẽ tiến hành chuẩn bị và đóng
            gói hàng. Thời gian chuẩn bị hàng không vượt quá 2 ngày. Ngay sau
            khi chuẩn bị hàng xong, chúng tôi sẽ ngay lập tức bàn giao cho đơn
            vị vận chuyển. Thời gian đơn vị vận chuyển chuyển hàng đến tay khách
            hàng có thể mất từ 2 - 3 ngày.
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

export default DeliveryPolicy;
