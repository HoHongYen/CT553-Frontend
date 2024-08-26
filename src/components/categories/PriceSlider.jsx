import { formatCurrency } from "@/utils/helpers";
import { Slider } from "antd";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function PriceSlider() {
  const [value, setValue] = useState([0, 100]);
  const marks = {
    0: {
      style: {
        color: "#f50",
      },
      label: <strong>{formatCurrency(0)}</strong>,
    },
    100: {
      style: {
        color: "#f50",
      },
      label: <strong>{formatCurrency(5000000)}</strong>,
    },
  };

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(value);
    searchParams.set("minPrice", value[0] * 50000);
    searchParams.set("maxPrice", value[1] * 50000);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }, [value]);

  function formatter(value) {
    return `${formatCurrency(value * 50000)}`;
  }
  return (
    <div className="w-[35%]">
      <Slider
        range
        marks={marks}
        step="10"
        tipFormatter={formatter}
        onChange={(value) => {
          setValue(value);
        }}
        defaultValue={[0, 100]}
      />
    </div>
  );
}

export default PriceSlider;
