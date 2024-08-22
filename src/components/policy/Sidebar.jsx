import { NavLink } from "react-router-dom";
import Heading from "../ui/Heading";
import slugify from "slugify";
import { policies } from "@/utils/constants";
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
    <div className="flex flex-col row-span-full gap-[3.2rem] py-[3.2rem] px-[2.4rem] bg-[var(--color-grey-100)] border-r-[var(--color_grey_100)]">
      <Heading as="h3">Các chính sách</Heading>
      {policies.map((policy) => (
        <StyledLink
          key={uuidv4()}
          to={slugify(policy, { lower: true, locale: "vi" })}
          className="capitalize"
        >
          {policy}
        </StyledLink>
      ))}
    </div>
  );
}

export default Sidebar;
