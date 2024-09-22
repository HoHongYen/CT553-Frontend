import styled from "styled-components";
import { useOrders } from "@/hooks/orders/useOrders";

import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Sidebar from "@/components/profile/Sidebar";

const breadcrumb = [{ name: "Tài khoản" }, { name: "Quản lý đơn hàng" }];

const StyledPolicyLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  /* height: 100vh; */
  gap: 3rem;
`;

function OrderList() {
  const { orders } = useOrders();

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <StyledPolicyLayout>
        <Sidebar />
        <Row>
          <Heading as="h1">Quản lý đơn hàng</Heading>
          {orders?.map((order) => (
            <div key={order.id}>
              <p>{order.id}</p>
              <p>{order.totalPrice}</p>
              <p>{order.status}</p>
            </div>
          ))}
        </Row>
      </StyledPolicyLayout>
    </>
  );
}

export default OrderList;
