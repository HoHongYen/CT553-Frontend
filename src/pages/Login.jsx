import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const AuthLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <AuthLayout>
      <div className="flex justify-center">
        <Logo />
      </div>
      <Heading as="h4">Đăng nhập</Heading>
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
