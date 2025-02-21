import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@/hooks/profile/useUser";
import { useCart } from "@/context/CartContext";
import { useShowCartDrawer } from "@/context/ShowCartDrawerContext";

import { Badge } from "antd";
import styled from "styled-components";
import Logout from "@/components/auth/Logout";
import UserAvatar from "@/components/profile/UserAvatar";
import Logo from "./Logo";
import NavBar from "./NavBar";
import ButtonIcon from "@/components/ui/ButtonIcon";
import DarkModeToggle from "@/components/ui/DarkModeToggle";

import {
  HiMagnifyingGlass,
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiXMark,
} from "react-icons/hi2";
// import SearchBar from "./SearchBar-v1";
import SearchBar from "./SearchBar";
import Dictaphone from "../home/Dictaphone";
import ProductSearchImage from "./ProductSearchImage";

const StyledHeader = styled.header`
  background-color: var(--color-blue-100);
  /* background-color: #fda4af; // bg-rose-300 */
  padding: 0.1rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  /* min-height: 8rem; */
  height: 8rem;
`;

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems } = useCart();
  const { openCartDrawer } = useShowCartDrawer();

  useEffect(() => {
    searchParams.has("s") && setIsSearchOpen(true);
  }, [searchParams]);

  return (
    <StyledHeader>
      <div className="flex items-center justify-between gap-3">
        <Logo />
        {!isSearchOpen && (
          <div className="flex items-center gap-5">
            <NavBar />
            <ButtonIcon onClick={() => setIsSearchOpen(true)}>
              <HiMagnifyingGlass />
            </ButtonIcon>
            <ProductSearchImage setIsSearchOpen={setIsSearchOpen} />
            <Dictaphone />
          </div>
        )}
      </div>
      <div className="flex items-center gap-5">
        {isSearchOpen && (
          <>
            <SearchBar
              placeholder="Nhập từ khóa tìm kiếm..."
              style={{
                width: 500,
                height: 40,
              }}
            />
            <div className="flex">
              <ButtonIcon onClick={() => setIsSearchOpen(true)}>
                <HiMagnifyingGlass />
              </ButtonIcon>
              <ProductSearchImage setIsSearchOpen={setIsSearchOpen} />
              <Dictaphone />
              <ButtonIcon onClick={() => setIsSearchOpen(false)}>
                <HiXMark />
              </ButtonIcon>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-between gap-3">
        {isAuthenticated && <UserAvatar />}
        {!isAuthenticated && (
          <>
            <ButtonIcon onClick={() => navigate("/dang-nhap")}>
              <span className="font-bold text-[1.7rem]">Đăng nhập</span>
            </ButtonIcon>
            <ButtonIcon onClick={() => navigate("/dang-ky")}>
              <span className="font-bold text-[1.7rem]">Đăng ký</span>
            </ButtonIcon>
          </>
        )}
        <ButtonIcon
          onClick={() => navigate("/gio-hang")}
          onMouseOver={openCartDrawer}
        >
          <Badge size="small" count={cartItems.length}>
            <HiOutlineShoppingCart />
          </Badge>
        </ButtonIcon>
        <StyledHeaderMenu>
          {isAuthenticated && (
            <ButtonIcon onClick={() => navigate("tai-khoan/thong-tin-ca-nhan")}>
              <HiOutlineUser />
            </ButtonIcon>
          )}
          <DarkModeToggle />
          {isAuthenticated && <Logout />}
        </StyledHeaderMenu>
      </div>
    </StyledHeader>
  );
}

export default Header;
