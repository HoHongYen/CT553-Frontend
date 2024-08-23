import styled from "styled-components";
import { useUser } from "@/hooks/profile/useUser";

import UpdatePasswordForm from "@/components/profile/UpdatePasswordForm";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Sidebar from "@/components/profile/Sidebar";

const breadcrumb = [{ name: "Tài khoản" }, { name: "Kho voucher" }];

const StyledPolicyLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  /* height: 100vh; */
  gap: 3rem;
`;

function VoucherList() {
  const { user } = useUser();

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <StyledPolicyLayout>
        <Sidebar />
        <Row>
          <Heading as="h1">Kho voucher</Heading>
          {!user.isGoogleLogin && (
            <Row>
              <UpdatePasswordForm />
            </Row>
          )}
        </Row>
      </StyledPolicyLayout>
    </>
  );
}

export default VoucherList;
