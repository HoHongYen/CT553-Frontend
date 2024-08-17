import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import { HiOutlineCamera } from "react-icons/hi2";
import { destroyImage, uploadImage } from "../../services/apiUpload";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      fullName: currentFullName,
      phone: currentPhone,
      gender,
      birthday: currentBirthday,
      avatar: currentAvatar,
    }, 
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(currentAvatar);
  const [phone, setPhone] = useState(currentPhone);
  const [birthday, setBirthday] = useState(currentBirthday);

  async function handleUploadImage(e) {
    const form = new FormData();
    form.append("image", e.target.files[0]);
    const res = await uploadImage(form);

    if (currentAvatar) {
      await destroyImage(currentAvatar.id);
    }
    console.log(res.metadata);
    setAvatar(res.metadata);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, phone, gender, birthday, avatarId: avatar.id },
      {
        onSuccess: () => {
          e.target.reset();
        },
      }
    );
  }

  async function handleCancel() {
    // khong can e.preventDefault() vi day la button type="reset"
    setFullName(currentFullName);
    setAvatar(currentAvatar);
    await destroyImage(avatar.id);
    setPhone(currentPhone);
    setBirthday(currentBirthday);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex justify-around">
        <div className="relative w-[80px] h-[80px] lg:w-[180px] lg:h-[180px]">
          <div className="flex justify-center">
            <div className="w-[80px] h-[80px] lg:w-[180px] lg:h-[180px] border border-gray-300 rounded-full overflow-hidden flex items-end justify-center">
              <img
                className="w-[80px] h-[80px] lg:w-[180px] lg:h-[180px] object-cover"
                src={avatar ? avatar.path : "/default-user.jpg"}
              />
            </div>
            {/* spinner */}
            <div className="absolute w-6 h-6 lg:w-14 lg:h-14 left-[65%] bottom-0 bg-white rounded-[50%] cursor-pointer">
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
          <FormRow label="Họ tên">
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              id="fullName"
              disabled={isUpdating}
            />
          </FormRow>
          <FormRow label="Số điện thoại">
            <Input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              disabled={isUpdating}
            />
          </FormRow>
          <FormRow label="Ngày sinh">
            <Input
              type="text"
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
          disabled={
            isUpdating ||
            (fullName === currentFullName && avatar === currentAvatar)
          }
          onClick={handleCancel}
        >
          Hủy
        </Button>
        <Button disabled={isUpdating}>Cập nhật thông tin cá nhân</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
