import { HiOutlineArrowsPointingOut } from "react-icons/hi2";
import { useEffect, useState } from "react";
import ButtonIcon from "../ui/ButtonIcon";
import Modal from "./Modal";
import Button from "../ui/Button";

function ViewScaleImage({ image, setIsFirstTime }) {
  const [percent, setPercent] = useState(25);
  const [percentValue, setPercentValue] = useState(25 + "%");

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
          <div
            className={`z-[991] max-w-[100vh]`}
            style={{ width: percentValue }}
          >
            <img src={image.path} />
          </div>
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
