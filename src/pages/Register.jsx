import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/profile/useUser";

import styled from "styled-components";
import RegisterForm from "@/components/auth/RegisterForm";
import Logo from "@/components/header/Logo";
import Heading from "@/components/ui/Heading";
import FullPage from "@/components/ui/FullPage";
import Spinner from "@/components/ui/Spinner";

const AuthLayout = styled.main`
  min-height: 100vh;
  display: grid;
  /* grid-template-columns: 48rem; */
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Register() {
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
      <Heading as="h4">Đăng ký</Heading>
      <RegisterForm />
    </AuthLayout>
  );
}

export default Register;
