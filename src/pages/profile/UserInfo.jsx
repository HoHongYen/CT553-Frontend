import styled from "styled-components";

import UpdateUserDataForm from "@/components/profile/UpdateUserDataForm";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Sidebar from "@/components/profile/Sidebar";

const breadcrumb = [{ name: "Tài khoản" }, { name: "Thông tin cá nhân" }];

const StyledPolicyLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  /* height: 100vh; */
  gap: 3rem;
`;

function UserInfo() {
  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <StyledPolicyLayout>
        <Sidebar />
        <Row>
          <Heading as="h1">Thông tin cá nhân</Heading>
          <Row>
            <UpdateUserDataForm />
          </Row>
        </Row>
      </StyledPolicyLayout>
    </>
  );
}

export default UserInfo;
