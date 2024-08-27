import { useParams } from "react-router-dom";

import { formatSlugify } from "@/utils/helpers";
import Heading from "../ui/Heading";
import RoundImage from "../ui/RoundImage";
import StyledLink from "../ui/StyledLink";

function Sidebar({ categories }) {
  const { slug } = useParams();

  return (
    <div className="flex flex-col gap-[3.2rem] px-[2.4rem] bg-[var(--color-grey-100)] border-r-[var(--color_grey_100)]">
      <Heading as="h2" className="text-center">
        Danh mục sản phẩm
      </Heading>
      {categories.map((category) => (
        <StyledLink
          key={category.id}
          to={`/${formatSlugify(category.name)}`}
          className={`capitalize flex gap-5 items-center ${
            formatSlugify(category.name) === slug ? "active" : ""
          }`}
        >
          <RoundImage path={category.thumbnailImage.path} />
          {category.name}
        </StyledLink>
      ))}
    </div>
  );
}

export default Sidebar;
