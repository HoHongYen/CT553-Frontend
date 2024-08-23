import styled from "styled-components";
import { useUser } from "@/hooks/profile/useUser";

import UpdatePasswordForm from "@/components/profile/UpdatePasswordForm";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Sidebar from "@/components/profile/Sidebar";

const breadcrumb = [{ name: "Tài khoản" }, { name: "Thay đổi mật khẩu" }];

const StyledPolicyLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  /* height: 100vh; */
  gap: 3rem;
`;

function ChangePassword() {
  const { user } = useUser();

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <StyledPolicyLayout>
        <Sidebar />
        <Row>
          <Heading as="h1">Thay đổi mật khẩu</Heading>
          <Row className="mt-10">
            {!user.isGoogleLogin ? (
              <UpdatePasswordForm />
            ) : (
              <p>Không thể thay đổi mật khẩu vì bạn đã đăng nhập bằng Google</p>
            )}
          </Row>
        </Row>
      </StyledPolicyLayout>
    </>
  );
}

export default ChangePassword;
