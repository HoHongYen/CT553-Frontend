import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useUser } from "@/hooks/profile/useUser";
import { OrderProvider } from "@/context/OrderContext";
import { useShowCartDrawer } from "@/context/ShowCartDrawerContext";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import GoTop from "../ui/GoTop";
import CartDrawer from "../cart/CartDrawer";

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
  useEffect(() => {
    // set timeout 1000
    setTimeout(() => {
      document
        .querySelector("df-messenger")
        .shadowRoot.querySelector("df-messenger-chat")
        .shadowRoot.querySelector("df-messenger-user-input")
        .shadowRoot.querySelector(".input-box-wrapper > input").placeholder =
        "Nhập tin nhắn...";
    }, 1000);
  }, []);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showGoTop, setShowGoTop] = useState(false);
  const { isAuthenticated } = useUser();

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
      <div className="fixed bottom-10 left-10">
        <GoTop showGoTop={showGoTop} scrollUp={handleScrollUp} />
      </div>
      <div className="z-[999] absolute right-0 bottom-0">
        <df-messenger
          chat-icon="https:&#x2F;&#x2F;asset.cloudinary.com&#x2F;dphzvfcmy&#x2F;fa104c1334f06b45aa6e752cffb99376"
          intent="WELCOME"
          chat-title="Decorpic"
          agent-id="e79af124-0960-4849-b7c7-35a816f46009"
          language-code="vi"
        ></df-messenger>
      </div>

      <Header />
      <Main>
        <Container>
          {!isAuthenticated ? (
            <Outlet />
          ) : (
            <OrderProvider>
              {" "}
              <Outlet />{" "}
            </OrderProvider>
          )}
        </Container>
      </Main>
      <Footer />
    </StyledAppLayout>
  );
}

export default AppLayout;
