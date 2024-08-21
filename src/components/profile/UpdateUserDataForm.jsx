import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDarkMode } from "@/context/DarkModeContext";
import { useUser } from "@/hooks/profile/useUser";
import { useUpdateUser } from "@/hooks/profile/useUpdateUser";
import { destroyImage, uploadImage } from "@/services/apiUpload";

import { HiOutlineCamera } from "react-icons/hi2";

import Button from "@/components/ui/Button";
import FileInput from "@/components/ui/FileInput";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Input from "@/components/ui/Input";
import SpinnerMini from "@/components/ui/SpinnerMini";
import TickRoundIcon from "@/components/icons/TickRoundIcon";
import EmptyRoundBoxIcon from "@/components/icons/EmptyRoundBoxIcon";

function UpdateUserDataForm() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      fullName: currentFullName,
      phone: currentPhone,
      gender: currentGender,
      birthday: currentBirthday,
      avatar: currentAvatar,
    },
  } = useUser();

  const { isDarkMode } = useDarkMode();

  const [birthday, setBirthday] = useState(
    currentBirthday?.slice(0, 10) || null
  );
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(currentAvatar);
  const [isMale, setIsMale] = useState(currentGender);
  const [phone, setPhone] = useState(currentPhone);

  useEffect(() => {
    setBirthday(birthday ? birthday.slice(0, 10) : null);
  }, [birthday]);

  const { updateUser, isUpdating } = useUpdateUser();

  async function handleUploadImage(e) {
    const form = new FormData();
    form.append("image", e.target.files[0]);
    const res = await uploadImage(form);
    console.log(res.metadata);
    setAvatar(res.metadata);
  }

  async function onSubmit(data, e) {
    e.preventDefault();

    if (currentAvatar && avatar.id !== currentAvatar.id) {
      await destroyImage(currentAvatar.id);
    }

    if (!fullName) return;
    // console.log(fullName, phone, gender, birthday, avatar.id);
    updateUser(
      {
        fullName,
        phone,
        gender: isMale,
        birthday,
        avatarId: avatar?.id,
      },
      {
        onSuccess: () => {
          e.target.reset();
        },
      }
    );
  }

  async function handleCancel() {
    // khong can e.preventDefault() vi day la button type="reset"
    if (fullName !== currentFullName) setFullName(currentFullName);

    if (avatar.id !== currentAvatar.id) {
      await destroyImage(avatar.id);
      setAvatar(currentAvatar);
    }

    if (phone !== currentPhone) setPhone(currentPhone);

    if (birthday !== currentBirthday?.slice(0, 10))
      setBirthday(currentBirthday);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-around">
        <div className="relative w-[80px] h-[80px] lg:w-[180px] lg:h-[180px]">
          <div className="flex justify-center">
            <div className="w-[80px] h-[80px] lg:w-[180px] lg:h-[180px] border border-gray-300 rounded-full overflow-hidden flex items-end justify-center">
              <img
                className="w-[80px] h-[80px] lg:w-[180px] lg:h-[180px] object-cover"
                src={avatar ? avatar.path : "/default-user.jpg"}
              />
            </div>
            <div
              className={`absolute w-6 h-6 lg:w-14 lg:h-14 left-[65%] bottom-0 ${
                !isDarkMode ? "bg-white" : "bg-gray-600"
              } rounded-[50%] cursor-pointer`}
            >
              <FormRow>
                <FileInput
                  className="w-[36px] h-[36px] absolute opacity-0 cursor-pointer"
                  id="avatar"
                  accept="image/*"
                  onChange={handleUploadImage}
                  disabled={isUpdating}
                />
                <HiOutlineCamera className="lg:w-14 lg:h-14" />
              </FormRow>
            </div>
          </div>
          <p className="text-lg lg:text-2xl text-center my-3">{fullName}</p>
        </div>
        <div>
          <FormRow label="Email">
            <Input value={email} disabled />
          </FormRow>
          <FormRow label="Họ tên" error={errors?.fullName?.message}>
            <Input
              type="text"
              value={fullName}
              id="fullName"
              disabled={isUpdating}
              {...register("fullName", {
                required: "Không được để trống",
                onChange: (e) => setFullName(e.target.value),
              })}
            />
          </FormRow>

          <FormRow label="Giới tính">
            <div id="gender" className="flex items-center justify-between px-4">
              <div
                className="flex items-center gap-5 cursor-pointer"
                onClick={() => setIsMale(true)}
              >
                <div className="max-w-6">
                  {isMale ? <TickRoundIcon /> : <EmptyRoundBoxIcon />}
                </div>
                <span>Nam</span>
              </div>
              <div
                className="flex items-center gap-5 cursor-pointer"
                onClick={() => setIsMale(false)}
              >
                <div className="max-w-6">
                  {!isMale ? <TickRoundIcon /> : <EmptyRoundBoxIcon />}
                </div>
                <span>Nữ</span>
              </div>
            </div>
          </FormRow>

          <FormRow label="Số điện thoại" error={errors?.phone?.message}>
            <Input
              type="text"
              value={phone}
              id="phone"
              disabled={isUpdating}
              {...register("phone", {
                pattern: {
                  value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                  message: "Vui lòng nhập đúng số điện thoại",
                },
                onChange: (e) => setPhone(e.target.value),
              })}
            />
          </FormRow>
          <FormRow label="Ngày sinh">
            <Input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              id="birthday"
              disabled={isUpdating}
            />
          </FormRow>
        </div>
      </div>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Hủy
        </Button>
        <Button disabled={isUpdating}>
          {!isUpdating ? "Cập nhật thông tin cá nhân" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
