import { useState } from "react";
import { useForm } from "react-hook-form";
import { useChangePassword } from "@/hooks/profile/useChangePassword";

import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Input from "@/components/ui/Input";
import SpinnerMini from "@/components/ui/SpinnerMini";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { changePassword, isUpdating } = useChangePassword();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const images = {
    eyeOn:
      "https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-2/576/eye-64.png",
    eyeOff:
      "https://cdn3.iconfinder.com/data/icons/mix-pack-6/44/Asset_25-64.png",
  };

  function onSubmit({ password }) {
    changePassword({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Mật khẩu mới (tối thiểu 8 ký tự)"
        error={errors?.password?.message}
      >
        <div id="password" className="relative">
          <Input
            className="w-full"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            disabled={isUpdating}
            {...register("password", {
              required: "Không được để trống",
              minLength: {
                value: 8,
                message: "Mật khẩu phải có ít nhất 8 ký tự",
              },
            })}
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
      </FormRow>

      <FormRow
        label="Nhập lại mật khẩu mới"
        error={errors?.passwordConfirm?.message}
      >
        <div id="confirmPassword" className="relative">
          <Input
            className="w-full"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            id="passwordConfirm"
            disabled={isUpdating}
            {...register("passwordConfirm", {
              required: "Không được để trống",
              validate: (value) =>
                getValues().password === value ||
                "Nhập lại mật khẩu không khớp",
            })}
          />
          {/* show confirm password begin  */}
          <div className="absolute right-3 top-[50%] translate-y-[-50%]">
            <img
              onClick={() => setShowConfirmPassword((show) => !show)}
              src={showConfirmPassword ? images.eyeOn : images.eyeOff}
              className="hover:cursor-pointer h-8 w-8"
            />
          </div>
          {/* show confirm password end  */}
        </div>
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Hủy
        </Button>
        <Button disabled={isUpdating}>
          {!isUpdating ? "Cập nhật mật khẩu" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
