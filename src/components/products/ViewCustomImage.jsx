import {
  HiOutlineCloudArrowUp,
  HiOutlineMagnifyingGlassPlus,
  HiOutlinePaintBrush,
  HiOutlinePhoto,
  HiOutlineViewfinderCircle,
} from "react-icons/hi2";
import { useEffect, useState } from "react";
// import Modal from "./Modal";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import FileInput from "../ui/FileInput";

const backgroundImages = [
  "https://bantranh.com/wp-content/uploads/2024/02/phongkhach2.png",
  "https://bantranh.com/wp-content/uploads/2024/02/phongkhach13.png",
  "https://bantranh.com/wp-content/uploads/2024/02/phongkhach14.png",
  "https://bantranh.com/wp-content/uploads/2024/02/phongkhach16.png",
  "https://bantranh.com/wp-content/uploads/2024/02/congso4.png",
  "https://bantranh.com/wp-content/uploads/2024/02/congso7.png",
  "https://bantranh.com/wp-content/uploads/2024/02/phongtam.png",
  "https://bantranh.com/wp-content/uploads/2024/02/phongan1.png",
  "https://bantranh.com/wp-content/uploads/2024/02/phongngu2.png",
  "https://bantranh.com/wp-content/uploads/2024/02/phongngu68.png",
  "https://bantranh.com/wp-content/uploads/2021/02/phong1.png",
  "https://bantranh.com/wp-content/uploads/2021/02/phong2.png",
  "https://bantranh.com/wp-content/uploads/2021/02/phong3.png",
  "https://bantranh.com/wp-content/uploads/2021/02/phong4.png",
  "https://bantranh.com/wp-content/uploads/2021/02/phong5.png",
];

const colorImages = [
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/11.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/22.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/33.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/44.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/55.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/66.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/77.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/88.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/99.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/100.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/110.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/120.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/130.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/140.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/150.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/160.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/170.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/180.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/190.png",
  "https://bantranh.com/wp-content/plugins/Products_Viewer/img/colors/200.png",
];

function ViewCustomImage({ image }) {
  const [percent, setPercent] = useState(25);
  const [percentValue, setPercentValue] = useState(25 + "%");
  const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);
  const [colorImage, setColorImage] = useState(colorImages[0]);

  useEffect(() => {
    setPercentValue(percent + "%");
  }, [percent]);

  async function handleUploadImage(e) {
    setBackgroundImage(URL.createObjectURL(e.target.files[0]));
  }

  if (!image) return null;

  return (
    <Modal>
      <Modal.Open opens="customImage">
        <Button className="flex justify-center items-center gap-3">
          <HiOutlineViewfinderCircle />
          Xem trên tường
        </Button>
      </Modal.Open>
      <Modal.Window name="customImage">
        <div className="relative h-[80vh] w-[60vw] flex flex-col gap-10">
          <Heading as="h2" className="flex justify-center">
            Xem tranh trên tường nhà bạn
          </Heading>
          <div className=" flex gap-10">
            <div className="relative flex flex-col gap-5">
              <div className="w-[30vw] h-[52vh]">
                <img
                  style={{ backgroundImage: `url(${colorImage})` }}
                  src={backgroundImage}
                  className="h-[100%] w-[100%] object-cover rounded-md border border-[var(--color-grey-500)]"
                />
              </div>
              <div
                className={`absolute top-20 left-0 right-0 ml-auto mr-auto bg-opacity-50`}
                style={{ width: percentValue }}
              >
                <img src={image.path} />
              </div>
              <div className=" flex flex-col gap-5">
                <div className="flex gap-4 items-center">
                  <HiOutlinePaintBrush />
                  <p>Chọn màu tường</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  {colorImages.map((item, index) => (
                    <img
                      key={index}
                      src={item}
                      onClick={() => setColorImage(item)}
                      className={`cursor-pointer border rounded-md border-[var(--color-grey-500)] w-[35px] h-[35px] object-cover ${
                        item === colorImage
                          ? "border-2 border-[var(--color-brand-700)]"
                          : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-5">
                <div className="flex gap-4 items-center">
                  <HiOutlineCloudArrowUp />
                  <p>Tải ảnh căn phòng</p>
                </div>
                <FileInput accept="image/*" onChange={handleUploadImage} />
              </div>
              <div className=" flex flex-col gap-5">
                <div className="flex gap-4 items-center">
                  <HiOutlinePhoto />
                  <p>Chọn một căn phòng</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  {backgroundImages.map((item, index) => (
                    <img
                      key={index}
                      src={item}
                      onClick={() => setBackgroundImage(item)}
                      className={`cursor-pointer border rounded-md border-[var(--color-grey-500)] w-[70px] h-[70px] object-cover ${
                        item === backgroundImage
                          ? "border-2 border-[var(--color-brand-700)]"
                          : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-16 items-center">
                <div className="flex gap-4 items-center">
                  <HiOutlineMagnifyingGlassPlus />
                  <p>Tùy chỉnh kích thước tranh</p>
                </div>
                <div className="flex justify-center items-center gap-7 ">
                  <Button
                    onClick={() => {
                      if (percent > 5) setPercent((percent) => percent - 5);
                    }}
                  >
                    -
                  </Button>
                  <div>{percent * 2}%</div>
                  <Button
                    onClick={() => {
                      if (percent < 50) setPercent((percent) => percent + 5);
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Window>
    </Modal>
  );
}

export default ViewCustomImage;
