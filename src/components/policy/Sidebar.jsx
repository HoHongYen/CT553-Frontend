import Heading from "../ui/Heading";
import { policies } from "@/utils/constants";
import { v4 as uuidv4 } from "uuid";
import { formatSlugify } from "@/utils/helpers";
import StyledLink from "../ui/StyledLink";

function Sidebar() {
  return (
    <div className="flex flex-col gap-[3.2rem] pb-8 mb-auto rounded-[25px] px-[2.4rem] bg-[var(--color-grey-100)] border-r-[var(--color_grey_100)]">
      <Heading
        as="h2"
        className="text-center mt-8 pb-5 border-b border-[var(---color-grey-900)] "
      >
        Các chính sách
      </Heading>
      {policies.map((item) => (
        <StyledLink
          key={uuidv4()}
          to={formatSlugify(item.title)}
          className="capitalize flex gap-5 items-center"
        >
          <item.icon className="w-[2.4rem] h-[2.4rem]" />
          {item.title}
        </StyledLink>
      ))}
    </div>
  );
}

export default Sidebar;
