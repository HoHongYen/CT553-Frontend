import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useShopInfo } from "@/hooks/shopInfo/useShopInfo";

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
  const navigate = useNavigate();
  const { shopInfo } = useShopInfo();
  if (!shopInfo) return null;

  return (
    <StyledLogo onClick={() => navigate("/")}>
      <Img src={shopInfo.logo.path} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
