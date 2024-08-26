/* eslint-disable */
import { Link, NavLink } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message } from "antd";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineGift,
  HiOutlineEnvelope,
  HiOutlineChevronRight,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";

import RoundImage from "@/components/ui/RoundImage";
import { useCategories } from "@/hooks/categories/useCategories";
import { policies } from "@/utils/constants";
import { formatSlugify } from "@/utils/helpers";

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
  const handleChooseCategory = ({ key }) => {
    message.info(`Danh muc ${key}`);
  };

  const { categories } = useCategories();

  const categoriesList = categories?.map((category) => {
    return {
      key: category.id,
      type: category.id,
      label: (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center">
            <RoundImage path={category.thumbnailImage.path} />
            <Link className="capitalize" to={`${formatSlugify(category.name)}`}>
              {category.name}
            </Link>
          </div>
          {category.children.length > 0 && <HiOutlineChevronRight />}
        </div>
      ),
      children: category.children?.map((child) => {
        return {
          key: child.id,
          icon: <RoundImage path={child.thumbnailImage.path} />,
          label: (
            <Link
              className="capitalize"
              to={`${formatSlugify(category.name)}/${formatSlugify(
                child.name
              )}`}
            >
              {child.name}
            </Link>
          ),
        };
      }),
    };
  });

  const policiesList = policies?.map((policy) => {
    return {
      key: uuidv4(),
      type: uuidv4(),
      label: (
        <div className="mb-4">
          <Link
            to={formatSlugify(policy.title)}
            className="capitalize flex items-center gap-4"
          >
            <policy.icon className="w-[2.4rem] h-[2.4rem]" />
            {policy.title}
          </Link>
        </div>
      ),
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
              items: categoriesList,
              onClick: handleChooseCategory,
              expandIcon: null,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <StyledMenuNavLink>
                <HiOutlineCalendarDays />
                <span>Sản phẩm</span>
                <DownOutlined className="w-6 h-6" />
              </StyledMenuNavLink>
            </a>
          </Dropdown>
        </li>
        <li>
          <StyledNavLink to="/khuyen-mai">
            <HiOutlineGift />
            <span>Khuyến mại</span>
          </StyledNavLink>
        </li>
        <li>
          <Dropdown
            menu={{
              mode: "vertical",
              items: policiesList,
              expandIcon: null,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <StyledMenuNavLink>
                <HiOutlineClipboardDocumentList />
                <span>Chính sách</span>
                <DownOutlined className="w-6 h-6" />
              </StyledMenuNavLink>
            </a>
          </Dropdown>
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
