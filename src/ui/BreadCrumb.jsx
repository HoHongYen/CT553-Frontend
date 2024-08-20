import { HiOutlineHome } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

function BreadCrumb({ breadcrumb }) {
  const { isDarkMode } = useDarkMode();
  function getPath(currentItemIndex) {
    if (currentItemIndex === 0) return `/${breadcrumb[currentItemIndex]?.slug}`;
    if (currentItemIndex === 1)
      return `/${breadcrumb[currentItemIndex - 1]?.slug}/${
        breadcrumb[currentItemIndex]?.slug
      }/tat-ca`;
    let path = "";
    while (currentItemIndex >= 0) {
      path = `/${breadcrumb[currentItemIndex--]?.slug}` + path;
    }
    return path;
  }

  return (
    <div className="-mt-10 flex items-center list-none">
      <Link to="/">
        <div
          className={`flex items-center gap-3 ${
            isDarkMode && "text-[#e5e7eb]"
          }`}
        >
          <HiOutlineHome />
          <span>Trang chủ</span>
        </div>
      </Link>{" "}
      {breadcrumb.map((item, index) => {
        return (
          <li
            key={item.name}
            className={`cursor-pointer ${isDarkMode && "text-[#e5e7eb]"}`}
          >
            <span className="mx-2">/</span>
            {index < breadcrumb.length - 1 ? (
              <Link to={getPath(index)}>{item.name}</Link>
            ) : (
              <span>{item.name}</span>
            )}
          </li>
        );
      })}
    </div>
  );
}

export default BreadCrumb;
