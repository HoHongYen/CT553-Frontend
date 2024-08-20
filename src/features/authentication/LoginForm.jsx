import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import { Link } from "react-router-dom";
import GoogleIcon from "../../icons/GoogleIcon";

import app from "../../firebase";
const auth = getAuth(app);
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { uploadImage } from "../../services/apiUpload";
import { useLogin } from "./useLogin";
import { useLoginWithGoogle } from "./useLoginWithGoogle";

function LoginForm() {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("12345678");
  const { login, isLoading: isLoading1 } = useLogin();
  const { loginWithGoogle, isLoading: isLoading2 } = useLoginWithGoogle();

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
  const getUrlExtension = (url) => {
    return url.split(/[#?]/)[0].split(".").pop().trim();
  };

  const changeImageUrlToFile = async (imgUrl) => {
    var imgExt = getUrlExtension(imgUrl);

    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const file = new File([blob], "profileImage." + imgExt, {
      type: blob.type,
    });
    return file;
  };

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    console.log("Login with Google");

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      const form = new FormData();
      const file = await changeImageUrlToFile(result.user.photoURL);
      form.append("image", file);
      const uploadedImage = await uploadImage(form);
      const user = {
        fullName: result.user.displayName,
        email: result.user.email,
        phone: result.user.phoneNumber,
        avatarId: uploadedImage.metadata.id,
      };
      loginWithGoogle(user);
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
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading1 || isLoading2}
        />
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
            <SpinnerMini />
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
