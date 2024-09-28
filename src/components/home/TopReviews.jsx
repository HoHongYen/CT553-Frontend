import { Skeleton } from "antd";
import { useTopReviews } from "@/hooks/reviews/useTopReviews";
import ReviewCard from "./ReviewCard";
import { Carousel as AntdCarousel } from "antd";

function TopReviews() {
  const { topReviews } = useTopReviews();

  console.log("topReviews", topReviews);

  if (!topReviews) {
    return <Skeleton active />;
  }

  return (
    <AntdCarousel arrows autoplay slidesToShow={3} arrowSize={10}>
      {/* <div className="grid grid-cols-3 gap-4 gap-y-10 h-full"> */}
      {topReviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
      {/* </div> */}
    </AntdCarousel>
  );
}

export default TopReviews;
