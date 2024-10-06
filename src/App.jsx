import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeContext";
import { CartProvider } from "./context/CartContext";
import { ShowCartDrawerProvider } from "./context/ShowCartDrawerContext";
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
      <QueryClientProvider client={queryClient}>
        <DarkModeProvider>
          <CartProvider>
            <ShowCartDrawerProvider>
              <ConfigProvider
                theme={{
                  token: {
                    fontFamily: "Nunito",
                  },
                }}
              >
                <GlobalStyles />
                {/* <ReactQueryDevtools
                  initialIsOpen={false}
                /> */}
                <BrowserRouter>
                  <ScrollToTop />
                  <Routes>
                    <Route element={<AppLayout />}>
                      <Route
                        index
                        element={<Navigate replace to="trang-chu" />}
                      />
                      <Route
                        path="trang-chu"
                        element={<SuspenseWrapper path="Home" />}
                      />
                      <Route
                        path="/:mainCategory"
                        element={<SuspenseWrapper path="MainCategory" />}
                      />
                      <Route
                        path="/:mainCategory/:subCategory"
                        element={<SuspenseWrapper path="Products" />}
                      />
                      <Route
                        path="san-pham/:slug"
                        element={<SuspenseWrapper path="ProductDetail" />}
                      />
                      <Route
                        path="tim-kiem"
                        element={<SuspenseWrapper path="ProductSearch" />}
                      />
                      <Route element={<PolicyLayout />}>
                        <Route
                          path="chinh-sach-thanh-toan"
                          element={
                            <SuspenseWrapper
                              level1={"policy"}
                              path="PaymentPolicy"
                            />
                          }
                        />
                        <Route
                          path="chinh-sach-giao-hang"
                          element={
                            <SuspenseWrapper
                              level1="policy"
                              path="DeliveryPolicy"
                            />
                          }
                        />
                        <Route
                          path="chinh-sach-kiem-hang"
                          element={
                            <SuspenseWrapper
                              level1="policy"
                              path="CheckProductPolicy"
                            />
                          }
                        />
                        <Route
                          path="chinh-sach-doi-tra"
                          element={
                            <SuspenseWrapper
                              level1="policy"
                              path="ReturnPolicy"
                            />
                          }
                        />
                        <Route
                          path="chinh-sach-bao-hanh"
                          element={
                            <SuspenseWrapper
                              level1="policy"
                              path="WarrantyPolicy"
                            />
                          }
                        />
                        <Route
                          path="chinh-sach-bao-mat"
                          element={
                            <SuspenseWrapper
                              level1="policy"
                              path="SecurityPolicy"
                            />
                          }
                        />
                      </Route>
                      <Route
                        path="khuyen-mai"
                        element={<SuspenseWrapper path="HotDeals" />}
                      />
                      <Route
                        path="lien-he"
                        element={<SuspenseWrapper path="Contact" />}
                      />
                      <Route
                        path="gio-hang"
                        element={<SuspenseWrapper path="Cart" />}
                      />
                      <Route element={<ProtectedRoute />}>
                        <Route
                          path="dat-hang"
                          element={<SuspenseWrapper path="Order" />}
                        />
                        <Route
                          path="tai-khoan/thong-tin-ca-nhan"
                          element={
                            <SuspenseWrapper level1="profile" path="UserInfo" />
                          }
                        />
                        <Route
                          path="tai-khoan/thay-doi-mat-khau"
                          element={
                            <SuspenseWrapper
                              level1="profile"
                              path="ChangePassword"
                            />
                          }
                        />
                        <Route
                          path="tai-khoan/quan-ly-don-hang"
                          element={
                            <SuspenseWrapper
                              level1="profile"
                              path="OrderList"
                            />
                          }
                        />
                        <Route
                          path="tai-khoan/quan-ly-don-hang/:orderId"
                          element={
                            <SuspenseWrapper
                              level1="profile"
                              path="OrderDetail"
                            />
                          }
                        />
                        <Route
                          path="tai-khoan/so-dia-chi"
                          element={
                            <SuspenseWrapper
                              level1="profile"
                              path="AddressList"
                            />
                          }
                        />
                        <Route
                          path="tai-khoan/coupon"
                          element={
                            <SuspenseWrapper
                              level1="profile"
                              path="CouponList"
                            />
                          }
                        />
                      </Route>
                    </Route>
                    <Route
                      path="dang-nhap"
                      element={<SuspenseWrapper path="Login" />}
                    />
                    <Route
                      path="dang-ky"
                      element={<SuspenseWrapper path="Register" />}
                    />
                    <Route
                      path="*"
                      element={<SuspenseWrapper path="PageNotFound" />}
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
              </ConfigProvider>
            </ShowCartDrawerProvider>
          </CartProvider>
        </DarkModeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
