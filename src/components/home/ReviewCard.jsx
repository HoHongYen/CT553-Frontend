import { formatDateTimeFromNow } from "@/utils/helpers";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import RoundImage from "../ui/RoundImage";

function ReviewCard({ review }) {
  return (
    <div className="h-[200px] flex flex-col justify-between gap-5 bg-[var(--color-grey-0)] rounded-lg px-6 py-6 shadow-[0_2px_12px_-3px_var(--color-brand-200)]">
      <Link to={`/san-pham/${review.orderDetail.variant.product.slug}`}>
        <p className="font-semibold">
          {review.orderDetail.variant.product.name}
        </p>
      </Link>

      <div className="flex flex-col gap-5">
        <Rate disabled allowHalf value={review.rating} />
        <div className="text-[var(--color-grey-400)]">{review.comment}</div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <RoundImage
            path={review.account.avatar?.path || "/default-user.jpg"}
          />
          <div className="flex flex-col">
            <div className="font-bold">{review.account.fullName}</div>
            <span className="text-2xl text-[var(--color-grey-400)]">
              {formatDateTimeFromNow(review.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
