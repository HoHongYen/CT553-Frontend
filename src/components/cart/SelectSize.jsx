import { useState } from "react";
import Select from "../ui/Select";
import { ACTIONS, useCart } from "@/context/CartContext";

function SelectSize({ cartItem }) {
  const { cartItems, dispatch } = useCart();
  const [variantId, setVariantId] = useState(cartItem.variant.id);

  const handleChangeVariantId = (value) => {
    console.log("dispatch", value);

    const existedCartItemIndex = cartItems.findIndex(
      (item) => item.variant.id === variantId
    );

    console.log("existedCartItemIndex", existedCartItemIndex);

    const newVariant = cartItem.product.variants[existedCartItemIndex];

    console.log("newVariant", newVariant);

    let newCartItems = [...cartItems];
    newCartItems[existedCartItemIndex].variant = { ...newVariant };

    // dispatch({
    //   type: ACTIONS.SET_CART,
    //   payload: { cartItems: newCartItems },
    // });

    dispatch({
      type: ACTIONS.CHANGE_VARIANT,
      payload: { variantId, newVariant },
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
