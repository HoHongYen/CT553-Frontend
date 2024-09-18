import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { useEffect, useRef, useState } from "react";
import GoTop from "../ui/GoTop";
import CartDrawer from "../cart/CartDrawer";
import { useShowCartDrawer } from "@/context/ShowCartDrawerContext";

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
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showGoTop, setShowGoTop] = useState(false);

  const { open, closeCartDrawer } = useShowCartDrawer();

  const location = useLocation();
  useEffect(() => {
    if (open) closeCartDrawer();
  }, [location]);

  const handleVisibleButton = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);

    if (scrollPosition > 50) {
      return setShowGoTop(true);
    } else if (scrollPosition < 50) {
      return setShowGoTop(false);
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
      <CartDrawer />
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
