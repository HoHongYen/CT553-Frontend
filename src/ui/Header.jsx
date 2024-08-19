import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import Logo from "./Logo";
import NavBar from "./NavBar";
import ButtonIcon from "./ButtonIcon";
import { HiMagnifyingGlass, HiOutlineShoppingCart } from "react-icons/hi2";

const StyledHeader = styled.header`
  background-color: var(--color-blue-100);
  padding: 0.1rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
`;

function Header() {
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
        <UserAvatar />
        <ButtonIcon>
          <HiOutlineShoppingCart />
        </ButtonIcon>
        <HeaderMenu />
      </div>
    </StyledHeader>
  );
}

export default Header;
