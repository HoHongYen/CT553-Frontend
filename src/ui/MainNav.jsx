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
} from "react-icons/hi2";

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
  const items = [
    {
      key: "1",
      type: "group1",
      label: "Tranh treo tường",
      children: [
        {
          key: "1-1",
          label: "Tranh đèn LED",
        },
        {
          key: "1-2",
          label: "Tranh phòng khách",
        },
        {
          key: "1-3",
          label: "Tranh phòng ăn",
        },
        {
          key: "1-4",
          label: "Tranh phòng ngủ",
        },
        {
          key: "1-5",
          label: "Tranh cầu thang",
        },
        {
          key: "1-6",
          label: "Tranh trẻ em",
        },
        {
          key: "1-7",
          label: "Tranh kim loại",
        },
        {
          key: "1-8",
          label: "Tranh tráng gương",
        },
      ],
    },
    {
      key: "2",
      type: "group2",
      label: "Tranh theo chủ đề",
      children: [
        {
          key: "2-1",
          label: "Tranh dát vàng",
        },
        {
          key: "2-2",
          label: "Tranh hoa sen",
        },
        {
          key: "2-3",
          label: "Tranh sơn dầu",
        },
        {
          key: "2-4",
          label: "Tranh Phật",
        },
        {
          key: "2-5",
          label: "Tranh phong cảnh",
        },
        {
          key: "2-6",
          label: "Tranh động lực",
        },
        {
          key: "2-7",
          label: "Tranh trừu tượng",
        },
        {
          key: "2-8",
          label: "Tranh mã đáo thành công",
        },
        {
          key: "2-9",
          label: "Tranh cà phê",
        },
        {
          key: "2-10",
          label: "Tranh đồng quê",
        },
      ],
    },
  ];

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
              items,
              onClick,
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
