/* eslint-disable */
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message } from "antd";

import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineGift,
  HiOutlineEnvelope,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import RoundImage from "./RoundImage";

const NavList = styled.ul`
  display: flex;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-blue-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-blue-800);
    background-color: var(--color-blue-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-blue-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const StyledMenuNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* color: var(--color-blue-400); */
    transition: all 0.3s;
  }
`;

function MainNav() {
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const categories = [
    {
      id: "group1",
      image: {
        path: "https://lala.com.vn/_next/image?url=https%3A%2F%2Fstc.subi.vn%2Fimage%2F1%2F200525%2Ftranh-treo-tuong-la-xanh-nhiet-doi-moi-1.jpg&w=256&q=90",
      },
      name: "Tranh theo vị trí",
      children: [
        {
          id: "1-2",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2023/10/O1CN01PYSxh223iPmhC5FNj_2208106727289.jpg",
          },
          name: "Tranh phòng khách",
        },
        {
          id: "1-3",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2023/10/O1CN01kCibrX2CqxZMWtOJz_2211371618526.jpg",
          },
          name: "Tranh phòng ăn",
        },
        {
          id: "1-4",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2023/11/O1CN018wZiW2255bQN51PBJ_0-item_pic-1.jpg_Q75-1.jpg",
          },
          name: "Tranh phòng ngủ",
        },
        {
          id: "1-51",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2021/05/CT-10-min.jpg",
          },
          name: "Tranh cầu thang",
        },
        {
          id: "1-52",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2019/07/Tranh-Scandinavia-phong-c%C3%A1ch-B%E1%BA%AFc-%C3%82u-SCA1022.jpg",
          },
          name: "Tranh quán cà phê",
        },
        {
          id: "1-53",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2021/05/SPA58-min.jpg",
          },
          name: "Tranh spa",
        },
        {
          id: "2-6",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2022/06/4-min.jpg",
          },
          name: "Tranh văn phòng",
        },
      ],
    },
    {
      id: "group2",
      image: {
        path: "https://lala.com.vn/_next/image?url=https%3A%2F%2Fstc.subi.vn%2Fimage%2F1%2F210524%2Fbo-tranh-treo-tuong-la-nghe-thuat-4-1.jpg&w=256&q=90",
      },
      name: "Tranh theo chủ đề",
      children: [
        {
          id: "2-4",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/tranh-phat-giao-12.jpg",
          },
          name: "Tranh Phật giáo",
        },
        {
          id: "2-41",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2023/10/TCG77_21002.jpg",
          },
          name: "Tranh Công giáo",
        },
        {
          id: "1-6",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2021/04/tranh-treo-tuong-trang-guong-129.jpg",
          },
          name: "Tranh trẻ em",
        },
      ],
    },
    {
      id: "group22",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2021/06/1-22-min.jpg",
      },
      name: "Tranh theo hình dạng",
      children: [
        {
          id: "2-4",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2021/06/1-100-min.jpg",
          },
          name: "Tranh vuông",
        },
        {
          id: "2-41",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2024/01/B.jpg",
          },
          name: "Tranh tròn",
        },
        {
          id: "2-42",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2021/02/z2344754240411_d939ea64bb994c7e8b62429e0a7c3424-min.jpg",
          },
          name: "Tranh dọc",
        },
        {
          id: "2-43",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2023/09/tranh-phong-ngu-ngang-32.jpg",
          },
          name: "Tranh ngang dài",
        },
      ],
    },
    {
      id: "group3",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2021/05/dlv-170_53828-min.jpg",
      },
      name: "Tranh phong cảnh",
      children: [
        {
          id: "2-21",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2021/04/FT66099-min.jpg",
          },
          name: "Tranh lá cây",
        },
        {
          id: "2-22",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2018/06/33873852_175694253268943_8974033272468144128_n-2.jpg",
          },
          name: "Tranh hoa",
        },
        {
          id: "2-23",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2024/02/tranh-treo-tuong-phat-giao-5.jpg",
          },
          name: "Tranh hoa sen",
        },
        {
          id: "2-22",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2024/06/10.jpg",
          },
          name: "Tranh tứ quý",
        },
        {
          id: "2-10",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2024/07/tranh-phong-canh-2-1.jpg",
          },
          name: "Tranh đồng quê",
        },
      ],
    },
    {
      id: "group4",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2023/10/tranh-phong-ngu-2-tam-20.jpg",
      },
      name: "Tranh nghệ thuật",
      children: [
        {
          id: "2-3",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2020/07/1-1.jpg",
          },
          name: "Tranh sơn dầu",
        },
        {
          id: "2-7",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2021/05/Tranh-treo-tuong-phong-khach-dep-e1720057078610.jpg",
          },
          name: "Tranh trừu tượng",
        },
        {
          id: "1-1",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2023/10/Dong-ho-treo-tuong-led-long-vu.jpg",
          },
          name: "Tranh đèn LED",
        },
        {
          id: "1-7",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2019/10/z4134074936342_ad64c9f56c3fe957a4d27bb8a83b3e80.jpg",
          },
          name: "Tranh sắt nghệ thuật",
        },
        {
          id: "1-8",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2024/03/tranh-trang-guong-2.jpg",
          },
          name: "Tranh tráng gương",
        },
        {
          id: "2-1",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2023/10/100x180-min-1.jpg",
          },
          name: "Tranh dát vàng",
        },
      ],
    },
    {
      id: "group5",
      image: {
        path: "https://tuongxinh.com.vn/wp-content/uploads/2023/10/17-6.jpg",
      },
      name: "Tranh phong thủy",
      children: [
        {
          id: "2-81",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2022/10/O1CN014dHa1W2EYIazDp5aO_665298756.jpg",
          },
          name: "Tranh mã đáo thành công",
        },
        {
          id: "2-82",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2023/10/O1CN013W3Wba1JsyZZbquDw_0-item_pic.jpg_Q75.jpg",
          },
          name: "Tranh thuận buồm xuôi gió",
        },
        {
          id: "2-83",
          image: {
            path: "https://tuongxinh.com.vn/wp-content/uploads/2021/05/dlv-121_36175-min.jpg",
          },
          name: "Tranh sơn thủy hữu tình",
        },
      ],
    },
  ];

  const items = categories.map((category) => {
    return {
      key: category.id,
      type: category.id,
      label: (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center">
            <RoundImage path={category.image.path} />
            <span className="capitalize">{category.name}</span>
          </div>
          <HiOutlineChevronRight />
        </div>
      ),
      children: category.children.map((child) => {
        return {
          key: child.id,
          icon: <RoundImage path={child.image.path} />,
          label: <span className="capitalize">{child.name}</span>,
        };
      }),
    };
  });

  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Trang chủ</span>
          </StyledNavLink>
        </li>
        <li>
          <Dropdown
            menu={{
              mode: "vertical",
              items,
              onClick,
              expandIcon: null,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <StyledMenuNavLink>
                <HiOutlineCalendarDays />
                <span>Danh mục</span>
                <DownOutlined className="w-6 h-6" />
              </StyledMenuNavLink>
            </a>
          </Dropdown>
        </li>
        <li>
          <StyledNavLink to="/cabins">
            <HiOutlineGift />
            <span>Khuyến mại</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiOutlineEnvelope />
            <span>Liên hệ</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
