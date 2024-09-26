import { useReviews } from "@/hooks/reviews/useReviews";
import { Skeleton } from "antd";
import Heading from "@/components/ui/Heading";
import CommentItem from "./CommentItem";
import OverallRating from "./OverallRating";
import RatingBreakdown from "./RatingBreakdown";
import Pagination from "@/components/ui/Pagination";

function ReviewList({allReviews}) {
  const { reviews, totalReviews, totalPages } = useReviews();

  if (!reviews) return <Skeleton active />;

  if (reviews.length === 0) return null;

  return (
    <div className="flex flex-col">
      <Heading
        as="h2"
        className="uppercase flex justify-center font-extrabold my-10"
      >
        Đánh giá của khách hàng
      </Heading>

      <div className="grid grid-cols-2 gap-10">
        <OverallRating allReviews={allReviews} />
        <RatingBreakdown allReviews={allReviews} />
      </div>

      <div className="flex flex-col divide-y gap-8 my-10">
        {reviews.map((review) => (
          <CommentItem key={review.id} review={review} />
        ))}
      </div>
      <div className="mt-10">
        <Pagination
          count={totalReviews}
          totalPages={totalPages}
          label="đánh giá"
          pageSize={3}
          limitArrays={[3, 6, 9, 12]}
          isScrollToTop={false}
        />
      </div>
    </div>
  );
}

export default ReviewList;
