import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/profile/useUser";

import styled from "styled-components";
import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/header/Logo";
import Heading from "@/components/ui/Heading";
import FullPage from "@/components/ui/FullPage";
import Spinner from "@/components/ui/Spinner";

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
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  if (isAuthenticated) {
    navigate("/");
  }

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
