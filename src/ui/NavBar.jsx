import styled from "styled-components";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

const StyledNavbar = styled.aside`
  background-color: var(--color-blue-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-blue-100);
  grid-row: 1 / -1;
  display: flex;
  gap: 3.2rem;
`;

function NavBar() {
  return (
    <StyledNavbar>
      <MainNav />
      {/* <Uploader /> */}
    </StyledNavbar>
  );
}

export default NavBar;
