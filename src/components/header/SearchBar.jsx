import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { search } from "@/services/apiProducts";

import { Select } from "antd";
import RoundImage from "../ui/RoundImage";

let timeout;
let currentValue;

function SearchBar({ placeholder, style }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  function handleRemoveSearchText(e) {
    console.log("remove search text");
    e.preventDefault();
    setSearchQuery("");
    searchParams.delete("s");
    setSearchParams(searchParams);
  }

  const [data, setData] = useState([]);
  const [value, setValue] = useState();

  const handleSearch = (newValue) => {
    fetch(newValue, setData);
  };

  const fetch = (value, callback) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;

    const fake = async () => {
      const d =
        value !== "" ? await search(value) : { fullTextSearchResult: [] };

      if (currentValue === value) {
        const { fullTextSearchResult } = d.metadata;
        const data = fullTextSearchResult.map((item) => ({
          value: item.name,
          text: item.name,
          thumbnailImage: item.thumbnailImage.path,
        }));

        const arrName = fullTextSearchResult.map((item) =>
          item.name.toLowerCase()
        );

        if (!arrName.includes(value.toLowerCase())) {
          data.unshift({
            value: value,
            text: value,
            thumbnailImage: "",
          });
        }
        callback(data);
      }
    };
    if (value) {
      timeout = setTimeout(fake, 300);
    } else {
      callback([]);
    }
  };

  useEffect(() => {
    if (value) {
      console.log("value", value);
      setSearchQuery(value);
      searchParams.set("s", value);
      setSearchParams(searchParams);
      navigate(`/tim-kiem/?${searchParams.toString()}`);
    }
  }, [value]);

  return (
    <>
      <Select
        showSearch
        value={value}
        placeholder={placeholder}
        style={style}
        // defaultActiveFirstOption={false}
        suffixIcon={null}
        filterOption={false}
        onSearch={handleSearch}
        onChange={(e) => setValue(e)}
        notFoundContent={null}
        optionLabelProp="label"
        dropdownMatchSelectWidth={false}
      >
        {data.map((d) => (
          <Select.Option key={d.value} value={d.value}>
            <div className="flex items-center gap-2">
              {d.thumbnailImage && <RoundImage path={d.thumbnailImage} />}
              <span className="truncate">{d.text}</span>
            </div>
          </Select.Option>
        ))}
      </Select>
    </>
  );
}

export default SearchBar;
