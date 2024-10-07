import styled from "styled-components";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "@/utils/constants";
import Select from "./Select";

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

function Pagination({
  count,
  totalPages,
  label = "sản phẩm",
  pageSize = PAGE_SIZE,
  limitArrays = [4, 8, 12, 16, 20],
  isScrollToTop = true,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("trang")
    ? 1
    : Number(searchParams.get("trang"));

  let limits = limitArrays;
  let limitOptions = limits.map((limit) => ({
    label: `Hiển thị ${limit} ${label}`,
    value: limit,
  }));

  const [limitId, setLimitId] = useState(
    searchParams.get("gioi-han") || pageSize
  );

  function handleLimitChange(e) {
    setLimitId(e.target.value);
    searchParams.set("gioi-han", e.target.value);
    // remove trang query when limit changes
    searchParams.delete("trang");
    setSearchParams(searchParams);
    // scroll smoothly to top
    if (isScrollToTop) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("trang", prev);
    setSearchParams(searchParams);
    // scroll smoothly to top
    if (isScrollToTop) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function nextPage() {
    const next = currentPage === totalPages ? currentPage : currentPage + 1;
    searchParams.set("trang", next);
    setSearchParams(searchParams);
    // scroll smoothly to top
    if (isScrollToTop) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // if (totalPages <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Hiển thị từ <span>{(currentPage - 1) * limitId + 1}</span> đến{" "}
        <span>
          {currentPage === totalPages ? count : currentPage * limitId}
        </span>{" "}
        trong tổng số <span>{count}</span> {label}
      </P>
      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Trước</span>
        </PaginationButton>

        <div className="flex justify-center gap-5">
          {totalPages <= 7 ? (
            Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PageButton
                className="px-10 py-2"
                key={page}
                active={page === currentPage}
                onClick={() => {
                  searchParams.set("trang", page);
                  setSearchParams(searchParams);
                  // scroll smoothly to top
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <span>{page}</span>
              </PageButton>
            ))
          ) : (
            <div className="flex items-center justify-center gap-5">
              {currentPage + 2 < totalPages && currentPage > 3 && (
                <span>...</span>
              )}
              {(currentPage + 2 >= totalPages || currentPage <= 3) &&
                Array.from({ length: 3 }, (_, i) => i + 1).map((page) => (
                  <PageButton
                    className="px-10 py-2"
                    key={page}
                    active={page === currentPage}
                    onClick={() => {
                      searchParams.set("trang", page);
                      setSearchParams(searchParams);
                      // scroll smoothly to top
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <span>{page}</span>
                  </PageButton>
                ))}
              {currentPage > 3 &&
                currentPage + 3 < totalPages &&
                Array.from({ length: 3 }, (_, i) => currentPage + i).map(
                  (page) => (
                    <PageButton
                      className="px-10 py-2"
                      key={page}
                      active={page === currentPage}
                      onClick={() => {
                        searchParams.set("trang", page);
                        setSearchParams(searchParams);
                        // scroll smoothly to top
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <span>{page}</span>
                    </PageButton>
                  )
                )}
              <span>...</span>
              {Array.from({ length: 3 }, (_, i) => totalPages - 2 + i).map(
                (page) => (
                  <PageButton
                    className="px-10 py-2"
                    key={page}
                    active={page === currentPage}
                    onClick={() => {
                      searchParams.set("trang", page);
                      setSearchParams(searchParams);
                      // scroll smoothly to top
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <span>{page}</span>
                  </PageButton>
                )
              )}
            </div>
          )}
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
