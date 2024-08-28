import { HiOutlineThumbUp } from "react-icons/hi";
import {
  HiOutlineCube,
  HiOutlineSparkles,
  HiOutlineTruck,
} from "react-icons/hi2";

function Introduce() {
  return (
    <div className="-mt-5 flex justify-between">
      <div className="flex items-center gap-4 ">
        <HiOutlineTruck className="w-14 h-14 bg-[var(--color-blue-100)] rounded-xl" />
        <div>
          <p className="font-bold">Giao hàng toàn quốc</p>
          <p className="text-gray-400 text-xl">
            Dễ dàng nhận hàng tất cả các ngày trong tuần
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 ">
        <HiOutlineSparkles className="w-14 h-14 bg-[var(--color-blue-100)] rounded-xl" />
        <div>
          <p className="font-bold">Đa dạng mẫu mã tranh</p>
          <p className="text-gray-400 text-xl">Vô vàn chủ đề có sẵn</p>
        </div>
      </div>
      <div className="flex items-center gap-4 ">
        <HiOutlineThumbUp className="w-14 h-14 bg-[var(--color-blue-100)] rounded-xl" />
        <div>
          <p className="font-bold">Hàng đẹp chất lượng cao</p>
          <p className="text-gray-400 text-xl">
            Khác biệt so với hàng rẻ trên thị trường
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 ">
        <HiOutlineCube className="w-14 h-14 bg-[var(--color-blue-100)] rounded-xl" />
        <div>
          <p className="font-bold">Bảo hành dài hạn</p>
          <p className="text-gray-400 text-xl">Bảo hành 24 tháng</p>
        </div>
      </div>
    </div>
  );
}

export default Introduce;
