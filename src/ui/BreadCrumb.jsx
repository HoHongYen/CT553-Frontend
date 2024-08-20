import { Breadcrumb } from "antd";
import { HiOutlineHome } from "react-icons/hi2";
import { Link } from "react-router-dom";

const menuItems = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        General
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        Layout
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Navigation
      </a>
    ),
  },
];

function BreadCrumb({ breadcrumb }) {
  return (
    <div className="-mt-10">
      <Breadcrumb
        items={[
          {
            title: (
              <Link to="/">
                <div className="flex items-center gap-3">
                  <HiOutlineHome />
                  <span>Trang chủ</span>
                </div>
              </Link>
            ),
          },
          {
            ...breadcrumb.map((item) => {
              return {
                title: <Link to={item.link}>{item.name}</Link>,
              };
            }),
          },
          //   {
          //     title: <a href="">General</a>,
          //     menu: {
          //       items: menuItems,
          //     },
          //   },
        ]}
      />
    </div>
  );
}

export default BreadCrumb;
