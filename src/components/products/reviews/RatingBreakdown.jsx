import { jumpToRelevantDiv } from "@/utils/helpers";
import { Progress } from "antd";
import { HiStar } from "react-icons/hi2";
import Heading from "../../ui/Heading";
import Button from "@/components/ui/Button";

const colors = [
  "green",
  "sky",
  "yellow",
  "orange",
  "purple",
  "pink",
  "blue",
  "cyan",
  "magenta",
  "red",
];

function RatingBreakdown({ allReviews, isPopUp = false }) {
  // calculate rating counts for each start, include half star
  const labels = Array.from({ length: 5 }, (_, index) => {
    const value = 5 - index;
    return value;
  });

  const ratingCounts = labels.map((label) => {
    return allReviews.filter((review) => review.rating === label).length;
  });

  return (
    <div className="flex flex-col gap-5 items-center p-10 rounded-[10px] bg-[var(--color-blue-100)]">
      <Heading as="h2" className="text-center">
        Chi tiết đánh giá
      </Heading>
      <div className="flex flex-col">
        {ratingCounts.map((count, index) => (
          <div key={index} className="flex items-center gap-10">
            <div className="flex w-[50px]">
              <div>{5 - index}</div>
              <HiStar className="text-4xl text-[var(--color-yellow-700)] ml-auto" />
            </div>
            <div className="ml-auto">
              <Progress
                percent={(count / allReviews.length) * 100}
                strokeColor={colors[index]}
                size={{ width: "250px", height: "10px" }}
                showInfo={false}
              />
            </div>
            <div className="text-[var(--color-grey-400)]">{count} lượt</div>
          </div>
        ))}
      </div>
      {isPopUp && (
        <Button
          onClick={() => jumpToRelevantDiv("reviewList")}
          className="mt-2"
        >
          Xem tất cả đánh giá
        </Button>
      )}
    </div>
  );
}

export default RatingBreakdown;
