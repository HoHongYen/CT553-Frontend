import RoundImage from "@/components/ui/RoundImage";

function CategoryItem({category}) {
  return (
    <div
      key={category.id}
      className="flex cursor-pointer flex-col justify-center gap-5"
    >
      <div className="flex justify-center">
        <RoundImage className="transition ease-out hover:-translate-y-1 hover:scale-105 duration-700" size="large" path={category.thumbnailImage.path} />
      </div>
      <span className="capitalize">{category.name}</span>
    </div>
  );
}

export default CategoryItem;
