import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(NavLink)`
  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-brand-600);
  }
`;

export default StyledLink;
