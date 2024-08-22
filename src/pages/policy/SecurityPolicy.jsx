import Heading from "@/components/ui/Heading";
import { HiOutlinePhone } from "react-icons/hi2";
import styled from "styled-components";

const P = styled.p`
  line-height: 1.75;
`;

function ReturnPolicy() {
  return (
    <div className="flex flex-col gap-8">
      <Heading as="h1">Chính sách bảo mật</Heading>

      <div className="flex flex-col gap-8">
        <P>
          Thông tin cá nhân của người dùng trên website của Decorpic được cam
          kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của
          Decorpic. Việc thu thập và sử dụng thông tin của mỗi người dùng chỉ
          được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp
          pháp luật có quy định khác.
        </P>
        <P>
          Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3
          nào về thông tin cá nhân của người dùng khi không có sự cho phép đồng
          ý từ người dùng.
        </P>
        <P>
          Chúng tôi sẽ cung cấp 1 số thông tin như: tên, địa chỉ, số điện thoại
          cho bên dịch vụ vận chuyển khi sử dụng dịch vụ giao nhận vận chuyển.
        </P>
        <P>
          Chúng tôi sẽ luôn bảo đảm và bảo vệ quyền riêng tư và tính bảo mật đối
          với những thông tin cá nhân của bạn với tinh thần trách nhiệm cao
          nhất.
        </P>
        <P>
          Chúng tôi cam kết rằng những thông tin của bạn được bảo mật. Để bảo vệ
          dữ liệu cá nhân mà bạn đã cung cấp cho chúng tôi, chúng tôi đã thực
          hiện và sử dụng các hệ thống và quy trình quản lý phù hợp.
        </P>
        <P>
          Hơn thế nữa, chúng tôi cũng đã thực hiện và sử dụng các quy trình bảo
          mật và những hạn chế vật chất và kỹ thuật đối với việc truy cập và sử
          dụng những thông tin cá nhân. Chỉ những nhân viên được ủy nhiệm mới
          được phép truy cập những thông tin cá nhân để thực hiện nhiệm vụ của
          họ đối với các dịch vụ của chúng tôi.
        </P>
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
