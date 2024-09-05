import { HiChevronDoubleUp } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";

function GoTop({ showGoTop, scrollUp }) {
  return (
    <>
      <div className={`${showGoTop ? "block" : "hidden"}`} onClick={scrollUp}>
        {/* <Button>Go to top</Button> */}
        <ButtonIcon>
          <HiChevronDoubleUp />
        </ButtonIcon>
      </div>
    </>
  );
}

export default GoTop;
