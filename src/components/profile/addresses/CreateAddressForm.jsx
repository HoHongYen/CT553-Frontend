import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toCamelCase } from "@/utils/helpers";

import { useCreateAddress } from "@/hooks/profile/addresses/useCreateAddress";
import { useUpdateAddress } from "@/hooks/profile/addresses/useUpdateAddress";

import { getProvinces } from "@/services/apiAddresses";
import { getDistricts } from "@/services/apiAddresses";
import { getWards } from "@/services/apiAddresses";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Select from "@/components/ui/Select";
import Checkbox from "@/components/ui/Checkbox";
import Heading from "@/components/ui/Heading";

function CreateAddressForm({ addressToEdit = {}, onCloseModal }) {
  const [isDefault, setIsDefault] = useState(true);

  const [provinceId, setProvinceId] = useState(0);
  const [provinceOptions, setProvinceOptions] = useState([
    { value: null, label: "Không có" },
  ]);
  const [provinceError, setProvinceError] = useState(null);

  const [districtId, setDistrictId] = useState(0);
  const [districtOptions, setDistrictOptions] = useState([
    { value: null, label: "Không có" },
  ]);
  const [districtError, setDistrictError] = useState(null);

  const [wardCode, setWardcode] = useState(0);
  const [wardOptions, setWardOptions] = useState([
    { value: null, label: "Không có" },
  ]);
  const [wardError, setWardError] = useState(null);

  useEffect(() => {
    async function helper() {
      const provinces = (await getProvinces()).metadata;

      if (provinces?.length > 0) {
        setProvinceOptions([
          { value: null, label: "Không có" },
          ...provinces.map((province) => {
            return {
              value: province.ProvinceID,
              label: province.ProvinceName,
            };
          }),
        ]);
      }
    }

    helper();
  }, []);

  useEffect(() => {
    async function helper(provinceId) {
      const districts = (await getDistricts(provinceId)).metadata;

      if (districts?.length > 0) {
        setDistrictOptions([
          { value: null, label: "Không có" },
          ...districts.map((district) => {
            return {
              value: district.DistrictID,
              label: district.DistrictName,
            };
          }),
        ]);
      }
    }

    helper(provinceId);
  }, [provinceId]);

  useEffect(() => {
    async function helper(districtId) {
      const wards = (await getWards(districtId)).metadata;

      if (wards?.length > 0) {
        setWardOptions([
          { value: null, label: "Không có" },
          ...wards.map((ward) => {
            return {
              value: ward.WardCode,
              label: ward.WardName,
            };
          }),
        ]);
      }
    }

    helper(districtId);
  }, [provinceId, districtId]);

  const { createAddress, isLoading: isCreating } = useCreateAddress();
  const { updateAddress, isLoading: isUpdating } = useUpdateAddress();

  const { id: editId, ...editValues } = addressToEdit;

  const isEditSession = Boolean(editId);

  useEffect(() => {
    if (isEditSession) {
      setProvinceId(editValues.provinceId);
      setDistrictId(editValues.districtId);
      setWardcode(editValues.wardCode);
      setIsDefault(editValues.isDefault);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const isWorking = isCreating || isUpdating;

  async function onSubmit(data, e) {
    e.preventDefault();
    console.log(data, provinceId, districtId, wardCode, isDefault);

    if (!provinceId) setProvinceError("Không được bỏ trống!");
    else setProvinceError(null);

    if (!districtId) setDistrictError("Không được bỏ trống!");
    else setDistrictError(null);

    if (!wardCode) setWardError("Không được bỏ trống!");
    else setWardError(null);

    if (isEditSession)
      updateAddress(
        {
          addressId: editId,
          updatedAddress: {
            ...data,
            provinceId,
            districtId,
            wardCode,
            isDefault,
          },
        },
        {
          onSuccess: (data) => {
            console.log(data);
            onCloseModal?.();
          },
        }
      );
    else
      createAddress(
        {
          ...data,
          provinceId,
          districtId,
          wardCode,
          isDefault,
        },
        {
          onSuccess: (data) => {
            console.log(data);
            onCloseModal?.();
          },
        }
      );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <div className="flex justify-center mb-10">
        <Heading as="h2">
          {isEditSession ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
        </Heading>
      </div>
      <FormRow label="Tên người nhận" error={errors?.contactName?.message}>
        <Input
          type="text"
          id="contactName"
          disabled={isWorking}
          {...register("contactName", {
            required: "Không được bỏ trống!",
          })}
          onChange={(e) => setValue("contactName", toCamelCase(e.target.value))}
        />
      </FormRow>

      <FormRow label="Số điện thoại" error={errors?.contactPhone?.message}>
        <Input
          type="text"
          id="contactPhone"
          disabled={isWorking}
          {...register("contactPhone", {
            required: "Không được bỏ trống!",
            pattern: {
              value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
              message: "Vui lòng nhập đúng số điện thoại",
            },
          })}
        />
      </FormRow>

      <FormRow label="Tỉnh / thành phố" error={provinceError}>
        <Select
          className="w-full"
          disabled={isWorking}
          options={provinceOptions}
          value={provinceId}
          onChange={(e) => setProvinceId(e.target.value)}
        />
      </FormRow>

      <FormRow label="Quận / huyện" error={districtError}>
        <Select
          className="w-full"
          disabled={isWorking}
          options={districtOptions}
          value={districtId}
          onChange={(e) => setDistrictId(e.target.value)}
        />
      </FormRow>

      <FormRow label="Phường / xã" error={wardError}>
        <Select
          className="w-full"
          disabled={isWorking}
          options={wardOptions}
          value={wardCode}
          onChange={(e) => setWardcode(e.target.value)}
        />
      </FormRow>

      <FormRow label="Địa chỉ cụ thể">
        <Textarea
          type="text"
          id="detailAddress"
          disabled={isWorking}
          defaultValue=""
          {...register("detailAddress")}
        />
      </FormRow>

      <FormRow label="Chọn làm địa chỉ mặc định">
        <Checkbox
          id="isDefault"
          checked={isDefault}
          disabled={isWorking}
          onChange={() => setIsDefault(!isDefault)}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Hủy
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Lưu chỉnh sửa" : "Tạo địa chỉ"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateAddressForm;
