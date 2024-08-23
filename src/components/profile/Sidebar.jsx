import { NavLink } from "react-router-dom";
import Heading from "../ui/Heading";
import slugify from "slugify";
import { profileLinks } from "@/utils/constants";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const StyledLink = styled(NavLink)`
  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-brand-600);
  }
`;

function Sidebar() {
  return (
    <div className="flex flex-col gap-[3.2rem] py-[3.2rem] px-[2.4rem] bg-[var(--color-grey-100)] border-r-[var(--color_grey_100)]">
      <Heading as="h2" className="text-center">
        Tài khoản của tôi
      </Heading>
      {profileLinks.map((item) => (
        <StyledLink
          key={uuidv4()}
          to={`/tai-khoan/${slugify(item.title, {
            lower: true,
            locale: "vi",
          })}`}
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
