import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { useEffect, useRef, useState } from "react";
import GoTop from "../ui/GoTop";

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
  const [scrollPosition, setSrollPosition] = useState(0);
  const [showGoTop, setshowGoTop] = useState(false);

  const handleVisibleButton = () => {
    const position = window.pageYOffset;
    setSrollPosition(position);

    if (scrollPosition > 50) {
      return setshowGoTop(true);
    } else if (scrollPosition < 50) {
      return setshowGoTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  });

  const refScrollUp = useRef();

  const handleScrollUp = () => {
    refScrollUp.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <StyledAppLayout>
      <div ref={refScrollUp}> </div>
      <div className="fixed bottom-24 right-10">
        <GoTop showGoTop={showGoTop} scrollUp={handleScrollUp} />
      </div>

      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      <Footer />
    </StyledAppLayout>
  );
}

export default AppLayout;
