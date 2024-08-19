import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useUser } from "../features/authentication/useUser";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  return (
    
  );
}

export default HeaderMenu;
