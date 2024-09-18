import { ACTIONS, useCart } from "@/context/CartContext";
import Button from "../ui/Button";
import Input from "../ui/Input";

function CartItemQuantity({ cartItem }) {
  const { dispatch } = useCart();

  return (
    <div className="mt-3 flex gap-[4.5px]">
      <Button
        onClick={() =>
          dispatch({
            type: ACTIONS.DECREASE_QUANTITY,
            payload: { variantId: cartItem.variant.id },
          })
        }
        variation="secondary"
        size="small"
        radius="radius-none"
      >
        -
      </Button>
      <Input
        className="w-[70px]"
        radius="radius-none"
        type="number"
        min={1}
        max={cartItem.variant.quantity}
        value={cartItem.quantity}
        onChange={(e) =>
          dispatch({
            type: ACTIONS.UPDATE_QUANTITY,
            payload: {
              variantId: cartItem.variant.id,
              quantity: e.target.value,
            },
          })
        }
      />
      <Button
        onClick={() =>
          dispatch({
            type: ACTIONS.INCREASE_QUANTITY,
            payload: { variantId: cartItem.variant.id },
          })
        }
        variation="secondary"
        size="small"
        radius="radius-none"
      >
        +
      </Button>
    </div>
  );
}

export default CartItemQuantity;
