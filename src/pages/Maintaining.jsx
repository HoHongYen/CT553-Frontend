import styled from "styled-components";
import Heading from "@/components/ui/Heading";
import { useShopInfo } from "@/hooks/shopInfo/useShopInfo";
import { Skeleton } from "antd";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

function PageNotFound() {
  const { shopInfo } = useShopInfo();
  if (!shopInfo) return <Skeleton active />;

  return (
    <StyledPageNotFound>
      <Box>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <Heading as="h1">Đang bảo trì 😢</Heading>
            <div>{shopInfo.maintainingMessage}</div>
          </div>
          <div className="w-[50%]">
            <img src="/maintaining.png" alt="" />
          </div>
        </div>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
