import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, theme } from "antd";

import styled from "styled-components";
import Heading from "../ui/Heading";

const P = styled.p`
  line-height: 1.75;
`;

const Ul = styled.ul`
  margin-left: 3rem;
  list-style-type: disc;
  line-height: 1.75;
`;

function ProductDescription({ product }) {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 12,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const getItems = (panelStyle) => [
    {
      key: "1",
      label: (
        <Heading as="h2" className="text-xl font-bold mb-2">
          Chất liệu tranh
        </Heading>
      ),
      children: (
        <Ul>
          <li>
            <P>
              Vải Canvas: Nhập khẩu Nhật Bản, in trên công nghệ UV chuẩn Châu
              Âu. Chất liệu này kết hợp với mực nhập khẩu chất lượng giúp nổi rõ
              đường vân trên tranh, nên màu sắc, đường nét vô cùng tinh tế, tạo
              hiệu ứng 3D cho bức tranh. Vì thế, tranh Canvas Aloha giống tranh
              sơn dầu đến 90%.
            </P>
          </li>
          <li>
            <P>
              Gương pha lê: Được in bằng công nghệ UV trên bề mặt MiCa trong
              suốt và tráng gương pha lê ngoài cùng, tạo độ bóng sáng, lấp lánh
              cho mọi bức tranh. Mặt sau tranh được ép 1 lớp fomex giúp tranh
              cứng cáp và hút ẩm tốt nhất. Đây là loại tranh sang trọng bậc nhất
              thị trường hiện nay. Cả hai chất liệu canvas và gương pha lê đều
              có khả năng chống thấm nước, chống phai màu. Vì thế, tranh Aloha
              đảm bảo bền đẹp theo thời gian.
            </P>
          </li>
        </Ul>
      ),
      style: panelStyle,
    },
    {
      key: "2",
      label: (
        <Heading as="h2" className="text-xl font-bold mb-2">
          Quy cách chất liệu tráng gương cao cấp
        </Heading>
      ),
      children: <P>{product.specification}</P>,
      style: panelStyle,
    },
    {
      key: "3",
      label: (
        <Heading as="h2" className="text-xl font-bold mb-2">
          Phụ kiện đính kèm
        </Heading>
      ),
      children: (
        <Ul>
          <li>
            <P>
              Móc treo tranh: Đính kèm sau mỗi khung tranh để có thể treo lên
              một cách dễ dàng.
            </P>
          </li>
          <li>
            <P>
              Đinh treo chuyên dụng: Loại đinh 3 chân dễ dàng đóng lên tường và
              có độ bám cao, khách hàng không cần khoan đục tường tốn công sức
              và gây mất thẩm mỹ.
            </P>
          </li>
        </Ul>
      ),
      style: panelStyle,
    },
    {
      key: "4",
      label: (
        <Heading as="h2" className="text-xl font-bold mb-2">
          Đóng gói và vận chuyển
        </Heading>
      ),
      children: (
        <Ul>
          <li>
            <P>
              Đóng gói: Sau khi được in và hoàn thiện về khung tranh, mỗi bộ
              tranh sẽ được bọc 5 lớp nilon chống sốc rồi đóng trong hộp carton
              chắc chắn, chống va đập làm hỏng hóc tranh trong quá trình giao
              vận.
            </P>
          </li>
          <li>
            <P>
              Vận chuyển: Giao hàng toàn quốc. Các đơn hàng có giá trị trên 1
              triệu đồng sẽ nhận được chính sách Freeship.
            </P>
          </li>
        </Ul>
      ),
      style: panelStyle,
    },
    {
      key: "5",
      label: (
        <Heading as="h2" className="text-xl font-bold mb-2">
          Hướng dẫn vệ sinh tranh
        </Heading>
      ),
      children: (
        <P>
          Chỉ cần dùng khăn ẩm lau trên bề mặt tranh là loại bỏ được bụi bẩn bám
          trên tranh. Đối với tranh Aloha Decor, khách hàng không cần sử dụng
          chất tẩy rửa để làm sạch tranh.
        </P>
      ),
      style: panelStyle,
    },
  ];

  return (
    <div className="flex flex-col">
      <Heading as="h1" className="text-2xl font-bold">
        Mô tả sản phẩm
      </Heading>
      <div>
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{
            background: token.colorBgContainer,
          }}
          items={getItems(panelStyle)}
        />
      </div>
    </div>
  );
}

export default ProductDescription;
