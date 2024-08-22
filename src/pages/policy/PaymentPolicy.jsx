import Heading from "@/components/ui/Heading";
import { HiOutlinePhone } from "react-icons/hi2";
import styled from "styled-components";

const P = styled.p`
  line-height: 1.75;
`;

function PaymentPolicy() {
  return (
    <div className="flex flex-col gap-8">
      <Heading as="h1">Chính sách thanh toán</Heading>
      <div>Chúng tôi có các hình thức thanh toán sau:</div>
      <div className="flex flex-col gap-5">
        <p>
          <span className="font-bold underline">Cách 1:</span> Thanh toán trực
          tiếp (quý khách nhận hàng tại địa chỉ cửa hàng).
        </p>
        <P>
          Khi đến mua hàng trực tiếp tại cửa hàng, quý khách có thể thanh toán
          trực tiếp bằng tiền mặt hoặc chuyển khoản theo hướng dẫn của nhân viên
          bán hàng.
        </P>
      </div>
      <div className="flex flex-col gap-5">
        <p>
          <span className="font-bold underline">Cách 2:</span> Thanh toán khi
          nhận hàng (COD – giao hàng và thu tiền tận nơi).
        </p>
        <P>
          Quý khách có thể đặt hàng và cung cấp đầy đủ thông tin cho chúng tôi.
          Sau khi xác nhận đơn hàng chúng tôi sẽ chuyển hàng đến tận nơi của quý
          khách. Quý khách sẽ thanh toán trực tiếp cho nhân viên giao hàng, ký
          xác nhận đã thanh toán.
        </P>
      </div>

      <div className="flex flex-col gap-5">
        <P>
          <span className="font-bold underline">Cách 3:</span> Thanh toán online
          qua VNPAY: Tích chọn tại trang thanh toán, hệ thống sẽ chuyển hướng
          quý khách qua các trang thanh toán theo hình thức quý khách đã chọn.
        </P>
      </div>

      <P>
        Nếu quý khách có nhu cầu mua số lượng lớn để kinh doanh hoặc buôn sỉ vui
        lòng liên hệ trực tiếp với chúng tôi để có chính sách giá cả hợp lý. Và
        việc thanh toán sẽ được thực hiện theo hợp đồng.
      </P>

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

export default PaymentPolicy;
