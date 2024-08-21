import styled from "styled-components";
import MainNav from "./MainNav";

const StyledNavbar = styled.aside`
  padding: 3.2rem 2.4rem;
  grid-row: 1 / -1;
  display: flex;
  gap: 3.2rem;
`;

function NavBar() {
  return (
    <StyledNavbar>
      <MainNav />
    </StyledNavbar>
  );
}

export default NavBar;
