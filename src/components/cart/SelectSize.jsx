import { useState } from "react";
import Select from "../ui/Select";
import { ACTIONS, useCart } from "@/context/CartContext";

function SelectSize({ cartItem }) {
  const { dispatch } = useCart();
  const [variantId, setVariantId] = useState(cartItem.variant.id);

  const handleChangeVariantId = (value) => {
    dispatch({
      type: ACTIONS.CHANGE_VARIANT,
      payload: { variantId: +variantId, newVariantId: +value },
    });
    setVariantId(value);
  };

  return (
    <div className="flex gap-4 mt-3">
      <Select
        options={cartItem.product.variants.map((variant) => {
          return {
            label: variant.size,
            value: variant.id,
          };
        })}
        value={variantId}
        onChange={(e) => handleChangeVariantId(e.target.value)}
      />
    </div>
  );
}

export default SelectSize;
