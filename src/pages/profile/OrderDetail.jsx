import toast from "react-hot-toast";
import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Skeleton } from "antd";
import { useOrder } from "@/hooks/orders/useOrder";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Sidebar from "@/components/profile/Sidebar";
import Row from "@/components/ui/Row";
import Heading from "@/components/ui/Heading";
import ButtonText from "@/components/ui/ButtonText";
import OrderHeader from "@/components/profile/orders/OrderHeader";
import OrderDetailItem from "@/components/profile/orders/OrderDetailItem";
import OrderFooter from "@/components/profile/orders/OrderFooter";
import OrderTracking from "@/components/profile/orders/OrderTracking";

const breadcrumb = [
  { name: "Tài khoản" },
  { name: "Quản lý đơn hàng" },
  { name: "Chi tiết đơn hàng" },
];

const StyledPolicyLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  /* height: 100vh; */
  gap: 3rem;
`;

function OrderDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { order } = useOrder();

  const handleBackToOrderList = () => {
    navigate("/tai-khoan/quan-ly-don-hang");
  };

  useEffect(() => {
    if (searchParams.get("code") == "00")
      toast.success("Thanh toán thành công");
  }, [searchParams]);

  if (!order) return <Skeleton active />;

  return (
    <>
      <Helmet>
        <title>Chi tiết đơn hàng</title>
      </Helmet>
      <BreadCrumb breadcrumb={breadcrumb} />
      <StyledPolicyLayout>
        <Sidebar />
        <Row>
          <Heading as="h1">Chi tiết đơn hàng #{order.id}</Heading>
          <div className="flex justify-end">
            <ButtonText onClick={handleBackToOrderList}>
              &larr; Quay lại
            </ButtonText>
          </div>
          <div className="relative flex flex-col gap-4 bg-[var(--color-grey-0)] px-6 py-6 rounded-md shadow-[0_2px_12px_-3px_var(--color-blue-700)]">
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
        </Row>
      </StyledPolicyLayout>
    </>
  );
}

export default OrderDetail;
