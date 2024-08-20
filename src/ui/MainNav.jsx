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
import { useCategories } from "../features/category/useCategories";

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

  const { categories } = useCategories();

  const items = categories?.map((category) => {
    return {
      key: category.id,
      type: category.id,
      label: (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center">
            <RoundImage path={category.thumbnailImage.path} />
            <span className="capitalize">{category.name}</span>
          </div>
          <HiOutlineChevronRight />
        </div>
      ),
      children: category.children?.map((child) => {
        return {
          key: child.id,
          icon: <RoundImage path={child.thumbnailImage.path} />,
          label: <span className="capitalize">{child.name}</span>,
        };
      }),
    };
  });

  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/">
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
          <StyledNavLink to="/danh-muc">
            <HiOutlineGift />
            <span>Tạo danh mục</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/khuyen-mai">
            <HiOutlineGift />
            <span>Khuyến mại</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/lien-he">
            <HiOutlineEnvelope />
            <span>Liên hệ</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
