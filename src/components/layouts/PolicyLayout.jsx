import Sidebar from "@/components/policy/Sidebar";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Row from "@/components/ui/Row";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const breadcrumb = [{ name: "Chính sách" }];

const StyledPolicyLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  /* height: 100vh; */
  gap: 3rem;
`;

function Policy() {
  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <StyledPolicyLayout>
        <Sidebar />
        <Row>
          <Outlet />
        </Row>
      </StyledPolicyLayout>
    </>
  );
}

export default Policy;
