import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import Logo from "./Logo";
import NavBar from "./NavBar";

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
      <div className="flex justify-between gap-3">
        <UserAvatar />
        <HeaderMenu />
      </div>
    </StyledHeader>
  );
}

export default Header;
