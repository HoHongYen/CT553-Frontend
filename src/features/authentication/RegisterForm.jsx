import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useRegister } from "./useRegister";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRowVertical from "../../ui/FormRowVertical";
import { Link } from "react-router-dom";
import TickRoundIcon from "../../icons/TickRoundIcon";
import EmptyRoundBoxIcon from "../../icons/EmptyRoundBoxIcon";
import { useState } from "react";
import moment from "moment/moment";

// Email regex: /\S+@\S+\.\S+/

function RegisterForm() {
  const { register: registerFn, isLoading } = useRegister();
  const [isMale, setIsMale] = useState(true);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  function onSubmit({ fullName, email, password, phone, birthday }) {
    registerFn({
      fullName,
      email,
      password,
      gender: isMale,
      phone,
      birthday: new Date(birthday).toISOString(),
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Họ tên" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "Không được để trống" })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "Không được để trống",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Nhập đúng định dạng email",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Mật khẩu (tối thiểu 8 ký tự)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "Không được để trống",
            minLength: {
              value: 8,
              message: "Mật khẩu phải có ít nhất 8 ký tự",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Nhập lại mật khẩu"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "Không được để trống",
            validate: (value) =>
              value === getValues().password || "Nhập lại mật khẩu không khớp",
          })}
        />
      </FormRow>

      <FormRow label="Giới tính">
        <div className="flex items-center justify-between px-4">
          <div>
            {/* <input
              // checked
              id="male"
              // value="true"
              type="radio"
              // {...register("gender")}
              onChange={() => setIsMale(true)}
            /> */}
            <label
              htmlFor="male"
              className="flex items-center gap-5 cursor-pointer"
              onClick={() => setIsMale(true)}
            >
              {/* {getValues().gender === "true" ? ( */}
              {isMale ? <TickRoundIcon /> : <EmptyRoundBoxIcon />}
              Nam
            </label>
          </div>
          <div>
            {/* <input
              id="female"
              // value="false"
              type="radio"
              // {...register("gender")}
              onChange={() => setIsMale(false)}
            /> */}
            <label
              htmlFor="female"
              className="flex items-center gap-5 cursor-pointer"
              onClick={() => setIsMale(true)}
            >
              {/* {getValues().gender === "false" ? ( */}
              {!isMale ? <TickRoundIcon /> : <EmptyRoundBoxIcon />}
              Nữ
            </label>
          </div>
        </div>
      </FormRow>

      <FormRow label="Số điện thoại" error={errors?.phone?.message}>
        <Input
          type="text"
          id="phone"
          disabled={isLoading}
          {...register("phone", {
            pattern: {
              value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
              message: "Vui lòng nhập đúng số điện thoại",
            },
          })}
        />
      </FormRow>

      <FormRow label="Ngày sinh">
        <Input
          type="date"
          id="birthday"
          disabled={isLoading}
          {...register("birthday")}
        />
      </FormRow>

      <FormRowVertical>
        <Button className="mt-3" size="large" disabled={isLoading}>
          {!isLoading ? "Đăng ký" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
      <div className="flex justify-center gap-6">
        <span>Đã có tài khoản?</span>
        <Link className="italic underline" to="/login">
          Đăng nhập
        </Link>
      </div>
    </Form>
  );
}

export default RegisterForm;
