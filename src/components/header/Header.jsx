import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/profile/useUser";

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
} from "react-icons/hi2";

const StyledHeader = styled.header`
  background-color: var(--color-blue-100);
  /* background-color: #fda4af; // bg-rose-300 */
  padding: 0.1rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  max-height: 8rem;
`;

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  return (
    <StyledHeader>
      <div className="flex items-center justify-between gap-3">
        <Logo />
        <NavBar />
      </div>
      <form className="flex flex-1">
        <input
          type="text"
          className="w-full rounded-xl px-4 border py-2 outline-none"
          placeholder="Tìm kiếm..."
        />
        <ButtonIcon>
          <HiMagnifyingGlass />
        </ButtonIcon>
      </form>
      <div className="flex justify-between gap-3">
        {isAuthenticated && <UserAvatar />}
        {!isAuthenticated && (
          <>
            <ButtonIcon onClick={() => navigate("/dang-nhap")}>
              Đăng nhập
            </ButtonIcon>
            <ButtonIcon onClick={() => navigate("/dang-ky")}>
              Đăng ký
            </ButtonIcon>
          </>
        )}
        <ButtonIcon onClick={() => navigate("/gio-hang")}>
          <HiOutlineShoppingCart />
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
