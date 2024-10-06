import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useCollectedCoupons } from "@/hooks/coupons/useCollectedCoupons";

import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Sidebar from "@/components/profile/Sidebar";
import CouponItem from "@/components/hotdeals/CouponItem";

const breadcrumb = [{ name: "Tài khoản" }, { name: "Coupon" }];

const StyledPolicyLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  /* height: 100vh; */
  gap: 3rem;
`;

function CouponList() {
  const { collectedCoupons } = useCollectedCoupons();

  return (
    <>
      <Helmet>
        <title>Coupon của bạn</title>
      </Helmet>
      <BreadCrumb breadcrumb={breadcrumb} />
      <StyledPolicyLayout>
        <Sidebar />
        <Row>
          <Heading as="h1">Coupon của bạn</Heading>
          <Row>
            <div className="grid grid-cols-2">
              {collectedCoupons?.map((item) => (
                <CouponItem key={item.coupon.id} coupon={item.coupon} />
              ))}
            </div>
          </Row>
        </Row>
      </StyledPolicyLayout>
    </>
  );
}

export default CouponList;
