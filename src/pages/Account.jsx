import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Cập nhật thông tin tài khoản</Heading>

      <Row>
        <Heading as="h3">Thông tin cá nhân</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Mật khẩu</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
