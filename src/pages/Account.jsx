import { useUser } from "@/hooks/profile/useUser";

import UpdatePasswordForm from "@/components/profile/UpdatePasswordForm";
import UpdateUserDataForm from "@/components/profile/UpdateUserDataForm";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import BreadCrumb from "@/components/ui/BreadCrumb";

const breadcrumb = [{ name: "Tài khoản" }, { name: "Thông tin cá nhân" }];

function Account() {
  const { user } = useUser();

  return (
    <>
      <BreadCrumb breadcrumb={breadcrumb} />
      <Heading as="h1">Cập nhật thông tin tài khoản</Heading>
      <Row>
        <Heading as="h3">Thông tin cá nhân</Heading>
        <UpdateUserDataForm />
      </Row>

      {!user.isGoogleLogin && (
        <Row>
          <Heading as="h3">Mật khẩu</Heading>
          <UpdatePasswordForm />
        </Row>
      )}
    </>
  );
}

export default Account;
