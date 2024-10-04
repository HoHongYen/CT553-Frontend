import styled from "styled-components";
import { useDarkMode } from "@/context/DarkModeContext";
import { useNavigate } from "react-router-dom";

const StyledLogo = styled.div`
  text-align: center;
  /* padding-right: ${(props) =>
    props.size === "medium" ? "10px" : "auto"}; */
`;

const Img = styled.img`
  height: 7rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <StyledLogo onClick={() => navigate("/")}>
      <Img src={isDarkMode ? "/logo.png" : "/logo.png"} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
