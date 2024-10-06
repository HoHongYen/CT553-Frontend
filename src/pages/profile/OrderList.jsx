import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useOrders } from "@/hooks/orders/useOrders";

import { Skeleton } from "antd";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Sidebar from "@/components/profile/Sidebar";
import Pagination from "@/components/ui/Pagination";
import OrderFilterOperations from "@/components/profile/orders/OrderFilterOperations";
import OrderHeader from "@/components/profile/orders/OrderHeader";
import OrderFooter from "@/components/profile/orders/OrderFooter";
import OrderDetailItem from "@/components/profile/orders/OrderDetailItem";
import OrderTracking from "@/components/profile/orders/OrderTracking";

const breadcrumb = [{ name: "Tài khoản" }, { name: "Quản lý đơn hàng" }];

const StyledPolicyLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  /* height: 100vh; */
  gap: 3rem;
`;

function OrderList() {
  const { orders, totalOrders, totalPages } = useOrders();

  console.log(orders);

  if (!orders) return <Skeleton active />;

  return (
    <>
      <Helmet>
        <title>Quản lý đơn hàng</title>
      </Helmet>
      <BreadCrumb breadcrumb={breadcrumb} />
      <StyledPolicyLayout>
        <Sidebar />
        <Row>
          <Heading as="h1">Quản lý đơn hàng</Heading>
          <div className="flex justify-end">
            <OrderFilterOperations />
          </div>
          {orders.length === 0 && (
            <div className="flex justify-center items-center h-[50vh]">
              <Heading as="h2">Không có đơn hàng nào</Heading>
            </div>
          )}
          {orders.map((order, index) => (
            <div
              key={index}
              className="relative flex flex-col gap-4 bg-[var(--color-grey-0)] px-6 py-6 rounded-md shadow-[0_2px_12px_-3px_var(--color-blue-700)]"
            >
              <OrderHeader order={order} />
              {order.orderDetail.map((orderDetail, index) => (
                <OrderDetailItem
                  key={index}
                  orderDetail={orderDetail}
                  currentStatus={order.currentStatus}
                />
              ))}
              <OrderFooter order={order} />
              {/* tracking order */}
              <div className="mt-4">
                <OrderTracking order={order} />
              </div>
            </div>
          ))}

          <div className="mt-10">
            <Pagination
              count={totalOrders}
              totalPages={totalPages}
              label="đơn hàng"
            />
          </div>
        </Row>
      </StyledPolicyLayout>
    </>
  );
}

export default OrderList;
