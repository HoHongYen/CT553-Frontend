import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import RoundImage from "../../ui/RoundImage";
import Spinner from "../../ui/Spinner";
import { useCategories } from "../category/useCategories";
import FrameSkeleton from "../../ui/FrameSkeleton";

function CategoryMenu() {
  const { categories } = useCategories();
  const [isShowAll, setIsShowAll] = useState(false);
  const [showCategories, setShowCategories] = useState([]);

  useEffect(() => {
    if (isShowAll) {
      const children = categories.map((category) => [...category.children]);
      setShowCategories([...categories, ...children.flat()]);
    } else {
      setShowCategories(categories);
    }
    console.log("showCategories", showCategories);
  }, [categories, isShowAll]);

  if (!categories) return <FrameSkeleton />;

  return (
    <div className="flex flex-col gap-10 bg-[var(--color-blue-100)] p-5 pt-10 rounded-3xl">
      <div className="flex flex-wrap justify-center gap-16">
        {showCategories?.map((category) => (
          <div
            key={category.id}
            className="flex cursor-pointer flex-col justify-center gap-5"
          >
            <div className="flex justify-center">
              <RoundImage size="large" path={category.thumbnailImage.path} />
            </div>
            <span className="capitalize">{category.name}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button onClick={() => setIsShowAll((s) => !s)} variation="secondary">
          {!isShowAll ? "Xem tất cả" : "Thu gọn"}
        </Button>
      </div>
    </div>
  );
}
export default CategoryMenu;
