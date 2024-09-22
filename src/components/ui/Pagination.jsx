import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "@/utils/constants";
import Select from "./Select";
import { useState } from "react";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const PageButton = styled.button`
  border: 1px solid
    ${(props) =>
      props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-black-50)"};
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count, totalPages }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("trang")
    ? 1
    : Number(searchParams.get("trang"));

  const limitOptions = [
    { label: "Hiển thị 4 sản phẩm", value: 4 },
    { label: "Hiển thị 8 sản phẩm", value: 8 },
    { label: "Hiển thị 12 sản phẩm", value: 12 },
    { label: "Hiển thị 16 sản phẩm", value: 16 },
    { label: "Hiển thị 20 sản phẩm", value: 20 },
  ];

  const [limitId, setLimitId] = useState(
    searchParams.get("gioi-han") || PAGE_SIZE
  );

  function handleLimitChange(e) {
    setLimitId(e.target.value);
    searchParams.set("gioi-han", e.target.value);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("trang", prev);
    setSearchParams(searchParams);
  }

  function nextPage() {
    const next = currentPage === totalPages ? currentPage : currentPage + 1;
    searchParams.set("trang", next);
    setSearchParams(searchParams);
  }

  if (totalPages <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Hiển thị từ <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> đến{" "}
        <span>
          {currentPage === totalPages ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        trong tổng số <span>{count}</span> sản phẩm
      </P>
      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Trước</span>
        </PaginationButton>

        <div className="flex justify-center gap-5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PageButton
              className="px-10 py-2"
              key={page}
              active={page === currentPage}
              onClick={() => {
                searchParams.set("trang", page);
                setSearchParams(searchParams);
              }}
            >
              <span>{page}</span>
            </PageButton>
          ))}
        </div>

        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          <span>Sau</span>
          <HiChevronRight />
        </PaginationButton>

        <Select
          className="ml-10"
          options={limitOptions}
          value={limitId}
          onChange={handleLimitChange}
        />
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
