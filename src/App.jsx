import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeContext";

import AppLayout from "./components/layouts/AppLayout";
import PolicyLayout from "./components/layouts/PolicyLayout";
import ProtectedRoute from "./components/ui/ProtectedRoute";

import Home from "./pages/Home";
import UserInfo from "./pages/profile/UserInfo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import Contact from "./pages/Contact";
import PaymentPolicy from "./pages/policy/PaymentPolicy";
import DeliveryPolicy from "./pages/policy/DeliveryPolicy";
import CheckProductPolicy from "./pages/policy/CheckProductPolicy";
import ReturnPolicy from "./pages/policy/ReturnPolicy";
import WarrantyPolicy from "./pages/policy/WarrantyPolicy";
import SecurityPolicy from "./pages/policy/SecurityPolicy";
import ChangePassword from "./pages/profile/ChangePassword";
import OrderList from "./pages/profile/OrderList";
import AddressList from "./pages/profile/AddressList";
import VoucherList from "./pages/profile/VoucherList";
import MainCategory from "./pages/MainCategory";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

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
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="trang-chu" />} />
                <Route path="trang-chu" element={<Home />} />

                <Route path="/:mainCategory" element={<MainCategory />} />
                <Route
                  path="/:mainCategory/:subCategory"
                  element={<Products />}
                />

                <Route path="san-pham/:slug" element={<ProductDetail />} />

                <Route element={<PolicyLayout />}>
                  <Route
                    path="chinh-sach-thanh-toan"
                    element={<PaymentPolicy />}
                  />
                  <Route
                    path="chinh-sach-giao-hang"
                    element={<DeliveryPolicy />}
                  />
                  <Route
                    path="chinh-sach-kiem-hang"
                    element={<CheckProductPolicy />}
                  />
                  <Route path="chinh-sach-doi-tra" element={<ReturnPolicy />} />
                  <Route
                    path="chinh-sach-bao-hanh"
                    element={<WarrantyPolicy />}
                  />
                  <Route
                    path="chinh-sach-bao-mat"
                    element={<SecurityPolicy />}
                  />
                </Route>

                <Route path="lien-he" element={<Contact />} />

                <Route element={<ProtectedRoute />}>
                  <Route
                    path="tai-khoan/thong-tin-ca-nhan"
                    element={<UserInfo />}
                  />
                  <Route
                    path="tai-khoan/thay-doi-mat-khau"
                    element={<ChangePassword />}
                  />
                  <Route
                    path="tai-khoan/quan-ly-don-hang"
                    element={<OrderList />}
                  />
                  <Route
                    path="tai-khoan/so-dia-chi"
                    element={<AddressList />}
                  />
                  <Route
                    path="tai-khoan/kho-voucher"
                    element={<VoucherList />}
                  />
                </Route>
              </Route>
              <Route path="dang-nhap" element={<Login />} />
              <Route path="dang-ky" element={<Register />} />
              <Route path="*" element={<PageNotFound />} />
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
      </DarkModeProvider>
    </>
  );
}

export default App;
