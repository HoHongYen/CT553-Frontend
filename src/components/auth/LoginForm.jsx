import { useState } from "react";
import { useLogin } from "@/hooks/auth/useLogin";
import { useLoginWithGoogle } from "@/hooks/auth/useLoginWithGoogle";

import { Link } from "react-router-dom";

import app from "../../firebase";
const auth = getAuth(app);
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import FormRowVertical from "@/components/ui/FormRowVertical";
import SpinnerMini from "@/components/ui/SpinnerMini";
import GoogleIcon from "@/components/icons/GoogleIcon";

function LoginForm() {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading: isLoading1 } = useLogin();
  const { loginWithGoogle } = useLoginWithGoogle();
  const [isLoading2, setIsLoading2] = useState(false);

  const images = {
    eyeOn:
      "https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-2/576/eye-64.png",
    eyeOff:
      "https://cdn3.iconfinder.com/data/icons/mix-pack-6/44/Asset_25-64.png",
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  // LOGIN WITH GOOGLE
  function handleLoginWithGoogle(e) {
    e.preventDefault();
    setIsLoading2(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log("Login with Google result", result);
      const user = {
        fullName: result.user.displayName,
        email: result.user.email,
        phone: result.user.phoneNumber,
        avatarURL: result.user.photoURL,
      };
      loginWithGoogle(user, {
        onSettled: () => {
          setIsLoading2(false);
        },
      });
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading1 || isLoading2}
        />
      </FormRowVertical>
      <FormRowVertical label="Mật khẩu">
        <div id="password" className="w-full relative">
          <Input
            className="w-full"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading1 || isLoading2}
          />
          {/* show password begin  */}
          <div className="absolute right-3 top-[50%] translate-y-[-50%]">
            <img
              onClick={() => setShowPassword((show) => !show)}
              src={showPassword ? images.eyeOn : images.eyeOff}
              className="hover:cursor-pointer h-8 w-8"
            />
          </div>
          {/* show password end  */}
        </div>
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading1 || isLoading2}>
          {!isLoading1 ? "Đăng nhập" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <div className="flex justify-center">hoặc</div>
      <FormRowVertical>
        <Button
          onClick={handleLoginWithGoogle}
          size="large"
          variation="secondary"
          disabled={isLoading1 || isLoading2}
        >
          {!isLoading2 ? (
            <div className="flex gap-10 justify-center items-center">
              <GoogleIcon />
              <span>Đăng nhập bằng Google</span>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <SpinnerMini />
            </div>
          )}
        </Button>
      </FormRowVertical>
      <div className="flex justify-center gap-6">
        <span>Chưa có tài khoản?</span>
        <Link className="italic underline" to="/dang-ky">
          Đăng ký
        </Link>
      </div>
    </Form>
  );
}

export default LoginForm;
