import styled from "styled-components";
import UserAvatar from "../features/authentication/UserAvatar";
import Logo from "./Logo";
import NavBar from "./NavBar";
import ButtonIcon from "./ButtonIcon";
import {
  HiMagnifyingGlass,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi2";
import { useUser } from "../features/authentication/useUser";
import DarkModeToggle from "./DarkModeToggle";
import Logout from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";

const StyledHeader = styled.header`
  background-color: var(--color-blue-100);
  padding: 0.1rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
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
            <ButtonIcon onClick={() => navigate("login")}>Đăng nhập</ButtonIcon>
            <ButtonIcon onClick={() => navigate("register")}>
              Đăng ký
            </ButtonIcon>
          </>
        )}
        <ButtonIcon>
          <HiOutlineShoppingCart />
        </ButtonIcon>
        <StyledHeaderMenu>
          {isAuthenticated && (
            <ButtonIcon onClick={() => navigate("/account")}>
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
