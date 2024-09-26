import { calculateRating } from "@/utils/helpers";
import { Rate } from "antd";
import Heading from "../../ui/Heading";

function OverallRating({ reviews }) {
  const rating = calculateRating(reviews);

  return (
    <div className="flex flex-col gap-5 items-center justify-center p-10 rounded-[10px] bg-[var(--color-blue-100)]">
      <Heading as="h2" className="text-center">
        Tổng quan đánh giá
      </Heading>
      <div className="">
        <span className="text-[4.5rem] font-semibold">{rating}</span>
        <span className="text-[4rem] text-[var(--color-grey-400)]"> / 5</span>
      </div>
      <Rate
        style={{ fontSize: "40px" }}
        disabled
        allowHalf
        value={rating}
      />
      <div className="text-[var(--color-grey-400)]">
        {reviews.length} lượt đánh giá
      </div>
    </div>
  );
}

export default OverallRating;
