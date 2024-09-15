import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeContext";
import { CartProvider } from "./context/CartContext";
import GlobalStyles from "./styles/GlobalStyles";

import AppLayout from "./components/layouts/AppLayout";
import PolicyLayout from "./components/layouts/PolicyLayout";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import ScrollToTop from "./components/ui/ScrollToTop";
import SuspenseWrapper from "./components/ui/SuspenseWrapper";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <DarkModeProvider>
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            <GlobalStyles />
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route element={<AppLayout />}>
                  <Route index element={<Navigate replace to="trang-chu" />} />
                  <Route
                    path="trang-chu"
                    element={<SuspenseWrapper path="./pages/Home" />}
                  />
                  <Route
                    path="/:mainCategory"
                    element={<SuspenseWrapper path="./pages/MainCategory" />}
                  />
                  <Route
                    path="/:mainCategory/:subCategory"
                    element={<SuspenseWrapper path="./pages/Products" />}
                  />
                  <Route
                    path="san-pham/:slug"
                    element={<SuspenseWrapper path="./pages/ProductDetail" />}
                  />
                  <Route
                    path="tim-kiem"
                    element={<SuspenseWrapper path="./pages/ProductSearch" />}
                  />
                  <Route element={<PolicyLayout />}>
                    <Route
                      path="chinh-sach-thanh-toan"
                      element={
                        <SuspenseWrapper path="./pages/policy/PaymentPolicy" />
                      }
                    />
                    <Route
                      path="chinh-sach-giao-hang"
                      element={
                        <SuspenseWrapper path="./pages/policy/DeliveryPolicy" />
                      }
                    />
                    <Route
                      path="chinh-sach-kiem-hang"
                      element={
                        <SuspenseWrapper path="./pages/policy/CheckProductPolicy" />
                      }
                    />
                    <Route
                      path="chinh-sach-doi-tra"
                      element={
                        <SuspenseWrapper path="./pages/policy/ReturnPolicy" />
                      }
                    />
                    <Route
                      path="chinh-sach-bao-hanh"
                      element={
                        <SuspenseWrapper path="./pages/policy/WarrantyPolicy" />
                      }
                    />
                    <Route
                      path="chinh-sach-bao-mat"
                      element={
                        <SuspenseWrapper path="./pages/policy/SecurityPolicy" />
                      }
                    />
                  </Route>
                  <Route
                    path="lien-he"
                    element={<SuspenseWrapper path="./pages/Contact" />}
                  />
                  <Route
                    path="gio-hang"
                    element={<SuspenseWrapper path="./pages/Cart" />}
                  />
                  <Route element={<ProtectedRoute />}>
                    <Route
                      path="tai-khoan/thong-tin-ca-nhan"
                      element={
                        <SuspenseWrapper path="./pages/profile/UserInfo" />
                      }
                    />
                    <Route
                      path="tai-khoan/thay-doi-mat-khau"
                      element={
                        <SuspenseWrapper path="./pages/profile/ChangePassword" />
                      }
                    />
                    <Route
                      path="tai-khoan/quan-ly-don-hang"
                      element={
                        <SuspenseWrapper path="./pages/profile/OrderList" />
                      }
                    />
                    <Route
                      path="tai-khoan/so-dia-chi"
                      element={
                        <SuspenseWrapper path="./pages/profile/AddressList" />
                      }
                    />
                    <Route
                      path="tai-khoan/kho-voucher"
                      element={
                        <SuspenseWrapper path="./pages/profile/VoucherList" />
                      }
                    />
                  </Route>
                </Route>
                <Route
                  path="dang-nhap"
                  element={<SuspenseWrapper path="./pages/Login" />}
                />
                <Route
                  path="dang-ky"
                  element={<SuspenseWrapper path="./pages/Register" />}
                />
                <Route
                  path="*"
                  element={<SuspenseWrapper path="./pages/PageNotFound" />}
                />
              </Routes>
            </BrowserRouter>
            <Toaster
              position="top-right"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 5000,
                },
                style: {
                  fontSize: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  backgroundColor: "var(--color-grey-0)",
                  color: "var(--color-grey-700)",
                },
              }}
            />
          </QueryClientProvider>
        </CartProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
