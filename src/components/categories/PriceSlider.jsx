import { useSearchParams } from "react-router-dom";
import { Slider } from "antd";
import { formatCurrency } from "@/utils/helpers";

function PriceSlider() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentMinPriceFilter = searchParams.get("gia-toi-thieu") || 0;
  const currentMaxPriceFilter = searchParams.get("gia-toi-da") || 5000000;

  function handleSlide(value) {
    searchParams.set("gia-toi-thieu", value[0] * 50000);
    searchParams.set("gia-toi-da", value[1] * 50000);
    if (searchParams.get("trang")) searchParams.set("trang", 1);
    setSearchParams(searchParams);
  }

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
          handleSlide(value);
        }}
        value={[currentMinPriceFilter / 50000, currentMaxPriceFilter / 50000]}
      />
    </div>
  );
}

export default PriceSlider;
