import RoundImage from "@/components/ui/RoundImage";
import StyledLink from "../ui/StyledLink";

function CategoryItem({ category, parentSlug = "", isActive = false }) {
  return (
    <StyledLink
      to={`/${parentSlug}/${category.slug}`}
      key={category.id}
      className={`flex cursor-pointer flex-col justify-center gap-5 capitalize ${
        isActive ? "text-[var(--color-blue-800)]" : ""
      }`}
    >
      <div className="flex justify-center">
        <RoundImage
          className="transition ease-out hover:-translate-y-1 hover:scale-105 duration-700"
          size="large"
          path={category.thumbnailImage.path}
        />
      </div>
      <span className="flex justify-center">{category.name}</span>
    </StyledLink>
  );
}

export default CategoryItem;
