import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <div className="overflow-scroll">
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
        <Footer />
      </div>
    </StyledAppLayout>
  );
}

export default AppLayout;
