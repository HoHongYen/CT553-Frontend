import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineArrowsPointingOut,
} from "react-icons/hi2";
import { useEffect, useState } from "react";
import ButtonIcon from "../ui/ButtonIcon";
import Modal from "./Modal";
import Button from "../ui/Button";

function ViewScaleImage({ images, setIsFirstTime, index }) {
  const [percent, setPercent] = useState(25);
  const [percentValue, setPercentValue] = useState(25 + "%");
  const [image, setImage] = useState();
  const [imageIndex, setImageIndex] = useState(0);

  const handlePreviousImage = () => {
    if (imageIndex > 0) {
      setImageIndex((index) => index - 1);
    }
  };

  const handleNextImage = () => {
    if (imageIndex < images.length - 1) {
      setImageIndex((index) => index + 1);
    }
  };

  useEffect(() => {
    setImageIndex(index);
    setImage(images[index]);
  }, [images, index]);

  useEffect(() => {
    setImage(images[imageIndex]);
  }, [imageIndex]);

  useEffect(() => {
    setPercentValue(percent + "%");
  }, [percent]);

  if (!image) return null;

  return (
    <Modal setIsFirstTime={setIsFirstTime}>
      <Modal.Open opens="scaleImage">
        <ButtonIcon>
          <HiOutlineArrowsPointingOut className="w-10 h-10" />
        </ButtonIcon>
      </Modal.Open>
      <Modal.Window name="scaleImage">
        <div className="relative h-[100vh] w-[100vw] flex justify-center items-center ">
          {imageIndex !== 0 && (
            <div className="absolute left-4">
              <ButtonIcon onClick={handlePreviousImage}>
                <HiChevronLeft />
              </ButtonIcon>
            </div>
          )}
          <div
            className={`z-[991] max-w-[100vh]`}
            style={{ width: percentValue }}
          >
            <img src={image.path} />
          </div>
          {imageIndex !== images.length - 1 && (
            <div className="absolute right-4">
              <ButtonIcon onClick={handleNextImage}>
                <HiChevronRight />
              </ButtonIcon>
            </div>
          )}
          <div className="absolute flex justify-center items-center gap-7 bottom-20 right-20">
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
      </Modal.Window>
    </Modal>
  );
}

export default ViewScaleImage;
