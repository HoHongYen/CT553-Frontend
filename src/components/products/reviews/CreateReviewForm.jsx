import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { uploadImage, uploadImages } from "@/services/apiUpload";
import {
  deleteImage,
  uploadImage as uploadReviewImage,
} from "@/services/apiReviews";
import { useCreateReview } from "@/hooks/reviews/useCreateReview";
import { useUpdateReview } from "@/hooks/reviews/useUpdateReview";

import { Rate } from "antd";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Heading from "../../ui/Heading";
import UploadReviewImage from "./UploadReviewImage";
import ShowOrderItem from "./ShowOrderItem";
import SpinnerMini from "@/components/ui/SpinnerMini";

function CreateReviewForm({ orderDetail, reviewToEdit = {}, onCloseModal }) {
  const { handleSubmit } = useForm();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const desc = ["Tệ", "Không tốt", "Trung bình", "Tốt", "Tuyệt vời"];
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [ratingError, setRatingError] = useState("");
  const [commentError, setCommentError] = useState("");

  const { isLoading: isCreating, createReview } = useCreateReview();
  const { isLoading: isUpdating, updateReview } = useUpdateReview();
  const isEditSession = Boolean(reviewToEdit.id);
  const isWorking = isCreating || isUpdating || isUploadingImage;

  useEffect(() => {
    console.log("reviewToEdit", reviewToEdit);
    console.log("isEditSession", isEditSession);

    if (isEditSession) {
      setComment(reviewToEdit.comment);
      setRating(reviewToEdit.rating);

      setImages(
        reviewToEdit.reviewImage.map((image) => ({
          id: image.id, // id nay la id cua reviewImage
          path: image.image.path,
        }))
      );

      setOldImages(
        reviewToEdit.reviewImage.map((image) => ({
          id: image.id,
          path: image.image.path,
        }))
      );
    }
  }, [reviewToEdit]);

  function checkIfHasNoChange() {
    if (comment !== reviewToEdit.comment || rating !== reviewToEdit.rating)
      return false;

    if (images.length !== oldImages.length) return false;

    for (let i = 0; i < images.length; i++) {
      if (images[i].path !== reviewToEdit?.reviewImage[i].image.path)
        return false;
    }
  }

  const handleUpdateReviewImages = async () => {
    console.log("images", images);
    console.log("oldImages", oldImages);

    const newImageArrayIds = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image.path.startsWith("blob")) {
        setIsUploadingImage(true);
        // upload new image
        const form = new FormData();
        console.log("-> new image", image);
        form.append("image", image.file);
        const res = await uploadImage(form);
        console.log("res", res.metadata.id);
        const uploadedReviewImage = await uploadReviewImage(reviewToEdit?.id, {
          uploadedImageId: res.metadata.id,
        });
        console.log("uploadedReviewImageId", uploadedReviewImage.metadata.id);
        newImageArrayIds.push(uploadedReviewImage.metadata.id);
      } else {
        console.log("image exist", image);
        newImageArrayIds.push(image.id);
      }
    }

    // delete old images
    for (let i = 0; i < oldImages.length; i++) {
      const oldImage = oldImages[i];
      if (!images.find((image) => image.path === oldImage.path)) {
        // delete image
        await deleteImage(oldImage.id);
      }
    }

    setIsUploadingImage(false);
    return newImageArrayIds;
  };

  async function onSubmit(data, e) {
    e.preventDefault();
    console.log("rating", rating);
    console.log("comment", comment);

    const uploadedImageIds = await handleUploadReviewImages();

    console.log("uploadedImageIds", uploadedImageIds);

    if (!rating) {
      setRatingError("Vui lòng chọn số sao!");
      return;
    }

    if (!comment) {
      setCommentError("Vui lòng nhập nhận xét!");
      return;
    }

    if (isEditSession) {
      if (checkIfHasNoChange()) {
        toast.error("Không có thay đổi nào được thực hiện!");
        return;
      }

      const uploadedReviewImageIds = await handleUpdateReviewImages();
      console.log("uploadedReviewImageIds", uploadedReviewImageIds);

      updateReview(
        {
          reviewId: reviewToEdit.id,
          updatedReview: {
            rating,
            comment,
          },
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    } else {
      createReview(
        {
          orderId: orderDetail.orderId,
          variantId: orderDetail.variant.id,
          productId: orderDetail.variant.product.id,
          rating,
          comment,
          uploadedImageIds: uploadedImageIds,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    }
  }

  const handleUploadReviewImages = async () => {
    const form = new FormData();
    images.forEach((image) => {
      form.append("images", image.file);
    });
    try {
      setIsUploadingImage(true);
      const res = await uploadImages(form);
      const idArray = res.metadata.map((item) => item.id);
      return idArray;
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  useEffect(() => {
    if (rating) setRatingError("");
    if (comment) setCommentError("");
  }, [rating, comment]);

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <div className="flex justify-center mb-10">
        <Heading as="h2">
          {isEditSession ? "Chỉnh sửa đánh giá" : "Viết đánh giá"}
        </Heading>
      </div>

      <ShowOrderItem orderDetail={orderDetail} />

      <div className="flex mt-7 w-full items-center">
        <label className="font-[700] text-[1.5rem] required">
          Đánh giá sản phẩm này:
        </label>
        <div className="flex items-center gap-5 w-[70%] justify-center">
          <Rate
            style={{ fontSize: "3rem" }}
            tooltips={desc}
            onChange={setRating}
            value={rating}
          />
          {rating ? <span>{desc[rating - 1]}</span> : null}
        </div>
      </div>
      <span className="text-[1.4rem] text-[var(--color-red-700)]">
        {ratingError}
      </span>

      {/* <FormRow> */}
      <div className="mt-8">
        <div className="flex gap-5 pb-5">
          <label className="font-[700] text-[1.5rem] required">Nhận xét:</label>
        </div>
        <Textarea
          maxLength={500}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          label="Nhận xét"
          placeholder="Bạn thấy thế nào về màu sắc, kích thước, chất lượng của tranh cũng như dịch vụ chăm sóc khách hàng của chúng tôi?"
          required
        />
      </div>
      <span className="text-[1.4rem] text-[var(--color-red-700)]">
        {commentError}
      </span>
      {/* </FormRow> */}

      <UploadReviewImage
        images={images}
        setImages={setImages}
        isUploadingImage={isUploadingImage}
      />

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isWorking}
        >
          Hủy
        </Button>
        <Button disabled={isWorking}>
          {!isWorking ? (
            isEditSession ? (
              "Lưu đánh giá"
            ) : (
              "Gửi đánh giá"
            )
          ) : (
            <SpinnerMini />
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateReviewForm;
