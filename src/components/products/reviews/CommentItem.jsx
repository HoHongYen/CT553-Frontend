import { formatDateTimeFromNow } from "@/utils/helpers";
import { useUser } from "@/hooks/profile/useUser";
import { Rate } from "antd";
import { HiPencil } from "react-icons/hi2";
import RoundImage from "@/components/ui/RoundImage";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Modal from "@/components/ui/Modal";
import ViewScaleImage from "../ViewScaleImage";
import CreateReviewForm from "./CreateReviewForm";

function CommentItem({ review }) {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-3 pt-10 justify-center ">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <RoundImage
            path={review.account.avatar?.path || "/default-user.jpg"}
          />
          <div className="flex flex-col">
            <div className="font-bold">{review.account.fullName}</div>
            <Rate disabled value={review.rating} />
          </div>
        </div>
        <span className="text-2xl text-[var(--color-grey-400)]">
          {formatDateTimeFromNow(review.createdAt)}
        </span>
      </div>
      <div className="flex justify-between">
        <div>
          <div className="flex gap-3">
            <span className="italic font-semibold">Nhận xét:</span>
            <span className="text-[var(--color-grey-400)]">
              {review.comment}
            </span>
          </div>
          {review.reviewImage.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="italic font-semibold">Hình ảnh:</span>

              <div className="flex gap-2">
                {review.reviewImage.map((item, index) => (
                  <div
                    onClick={() => setScaleImage(item.image)}
                    key={item.image.path}
                    className="flex gap-8 h-[25vh] max-w-[40vw]"
                  >
                    <div className="relative overflow-hidden border border-[var(--color-grey-300)] ">
                      <div className="absolute cursor-pointer right-0 z-10">
                        <ViewScaleImage
                          index={index}
                          images={review.reviewImage.map((item) => item.image)}
                        />
                      </div>
                      <img
                        src={item.image.path}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="flex gap-2 items-center">
            {review.createdAt !== review.updatedAt && (
              <div className="text-2xl text-[var(--color-grey-400)]">
                Đã chỉnh sửa {formatDateTimeFromNow(review.updatedAt)}
              </div>
            )}
            {review.account.id === user?.id && (
              <Modal>
                <Modal.Open opens="updateReview">
                  <ButtonIcon>
                    <HiPencil />
                  </ButtonIcon>
                </Modal.Open>
                <Modal.Window name="updateReview">
                  <CreateReviewForm
                    orderDetail={review.orderDetail}
                    reviewToEdit={review}
                  />
                </Modal.Window>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
