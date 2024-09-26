import { useReviews } from "@/hooks/reviews/useReviews";
import { Skeleton } from "antd";
import Heading from "@/components/ui/Heading";
import CommentItem from "./CommentItem";
import OverallRating from "./OverallRating";
import RatingBreakdown from "./RatingBreakdown";

function ReviewList() {
  const { reviews } = useReviews();

  if (!reviews) return <Skeleton active />;

  return (
    <div className="flex flex-col">
      <Heading
        as="h2"
        className="uppercase flex justify-center font-extrabold my-10"
      >
        Đánh giá của khách hàng
      </Heading>

      <div className="grid grid-cols-2 gap-10">
        <OverallRating reviews={reviews} />
        <RatingBreakdown reviews={reviews} />
      </div>

      <div className="flex flex-col divide-y gap-8 my-10">
        {reviews.map((review) => (
          <CommentItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

export default ReviewList;
