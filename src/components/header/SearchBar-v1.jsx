import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  /* &:focus {
    outline: none;
  } */

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }
`;

function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearchingProducts(e) {
    console.log("searchQuery", searchQuery);
    e.preventDefault();
    searchParams.set("s", searchQuery);
    setSearchParams(searchParams);
    navigate(`/tim-kiem/?${searchParams.toString()}`);
  }

  function handleRemoveSearchText(e) {
    console.log("remove search text");
    e.preventDefault();
    setSearchQuery("");
    searchParams.delete("s");
    setSearchParams(searchParams);
  }

  return (
    <>
      <form onSubmit={handleSearchingProducts} className="flex flex-1">
        <div className="relative w-full flex items-center">
          <input
            type="text"
            className="w-full rounded-xl px-4 border py-2 outline-none"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute flex items-center right-1 p-2 ml-4 cursor-pointer text-4xl hover:opacity-85">
            <StyledButtonIcon type="reset" onClick={handleRemoveSearchText}>
              <HiXMark />
            </StyledButtonIcon>
          </div>
        </div>

        <StyledButtonIcon type="submit">
          <HiMagnifyingGlass />
        </StyledButtonIcon>
      </form>
    </>
  );
}

export default SearchBar;
