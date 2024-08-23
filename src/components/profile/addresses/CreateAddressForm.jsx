import { useForm } from "react-hook-form";

import Input from "@/components/ui/Input";
import Form from "@/components/ui/Form";
import Button from "@/components/ui/Button";
import FileInput from "@/components/ui/FileInput";
import Textarea from "@/components/ui/Textarea";
import FormRow from "@/components/ui/FormRow";

function CreateAddressForm({ cabinToEdit = {}, onCloseModal }) {
  // const { isCreating, createCabin } = useCreateCabin();
  // const { isUpdating, updateCabin } = useUpdateCabin();

  // const { id: editId, ...editValues } = cabinToEdit;

  // const isEditSession = Boolean(editId);
  const isEditSession = false;

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    // defaultValues: isEditSession ? editValues : {},
    defaultValues: {},
  });

  // const isWorking = isCreating || isUpdating;
  const isWorking = false;

  const onSubmit = (data) => {

    // if (isEditSession)
    //   updateCabin(
    //     { newCabinData: { ...data, image }, id: editId },
    //     {
    //       onSuccess: (data) => {
    //         console.log(data);
    //         reset();
    //         onCloseModal?.();
    //       },
    //     }
    //   );
    // else
    //   createCabin(
    //     { ...data, image: image },
    //     {
    //       onSuccess: (data) => {
    //         console.log(data);
    //         reset();
    //       },
    //     }
    //   );
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => onCloseModal?.()}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateAddressForm;
