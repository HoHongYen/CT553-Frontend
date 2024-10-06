import { HiChevronDoubleUp } from "react-icons/hi2";

function GoTop({ showGoTop, scrollUp }) {
  return (
    <>
      <div className={`${showGoTop ? "block" : "hidden"}`} onClick={scrollUp}>
        {/* <Button>Go to top</Button> */}
        <div className="text-[var(--color-grey-800)] bg-[var(--color-blue-100)] px-[1.4rem] py-[1.4rem] rounded-[50%] cursor-pointer">
          <HiChevronDoubleUp />
        </div>
      </div>
    </>
  );
}

export default GoTop;
