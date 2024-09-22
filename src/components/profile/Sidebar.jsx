import { useUser } from "@/hooks/profile/useUser";
import { profileLinks } from "@/utils/constants";
import { formatSlugify } from "@/utils/helpers";
import Heading from "../ui/Heading";
import StyledLink from "../ui/StyledLink";

function Sidebar() {
  const {
    user: { fullName, avatar },
  } = useUser();
  return (
    <div className="flex flex-col gap-[3.2rem] pb-8 mb-auto rounded-[25px] px-[2.4rem] bg-[var(--color-grey-100)] border-r-[var(--color_grey_100)]">
      <Heading
        as="h2"
        className="text-center mt-8 pb-5 border-b border-[var(---color-grey-900)]"
      >
        Tài khoản của tôi
      </Heading>
      {/* avatar begin */}
      <div className="flex justify-center mb-8">
        <div className="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px]">
          <div className="flex justify-center">
            <div className="w-[80px] h-[80px] lg:w-[180px] lg:h-[100px] border border-gray-300 rounded-full overflow-hidden flex items-end justify-center">
              <img
                className="w-[80px] h-[80px] lg:w-[180px] lg:h-[100px] object-cover"
                src={avatar ? avatar.path : "/default-user.jpg"}
              />
            </div>
          </div>
          <p className="text-lg lg:text-2xl text-center my-3">{fullName}</p>
        </div>
      </div>
      {/* avatar end */}
      {profileLinks.map((item) => (
        <StyledLink
          key={item.title}
          to={`/tai-khoan/${formatSlugify(item.title)}`}
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
