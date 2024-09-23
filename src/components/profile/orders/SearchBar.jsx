import Input from "@/components/ui/Input";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchBar({ placeholder, style }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState();

  const handleSeaching = () => {
    searchParams.delete("trang");
    searchParams.delete("gioi-han");
    searchParams.delete("thu-tu");
    searchParams.delete("trang-thai");
    navigate(`/tai-khoan/quan-ly-don-hang/${value}`);
  };

  return (
    <Input
      type="number"
      value={value}
      placeholder={placeholder}
      style={style}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleSeaching(e.target.value);
      }}
    />
  );
}

export default SearchBar;
