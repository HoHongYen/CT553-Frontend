import { Skeleton } from "antd";
import { Carousel as AntdCarousel } from "antd";
import ReviewCard from "./ReviewCard";

function TopReviews({ topReviews }) {
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
