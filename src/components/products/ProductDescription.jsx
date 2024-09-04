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
        <div
          dangerouslySetInnerHTML={{
            __html: product.material,
          }}
        ></div>
      ),
      style: panelStyle,
    },
    {
      key: "2",
      label: (
        <Heading as="h2" className="text-xl font-bold mb-2">
          Chi tiết sản phẩm
        </Heading>
      ),
      children: (
        <div
          dangerouslySetInnerHTML={{
            __html: product.specification,
          }}
        ></div>
      ),
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
        <div
          dangerouslySetInnerHTML={{
            __html: product.instruction,
          }}
        ></div>
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
