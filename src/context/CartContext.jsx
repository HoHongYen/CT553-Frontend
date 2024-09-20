/* eslint-disable no-case-declarations */
import { createContext, useContext, useEffect } from "react";
import { useReducer } from "react";

const CartContext = createContext();

const initialState = {
  // cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  cartItems: [],
};

export const CART_ACTIONS = {
  SET_CART: "SET_CART",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  DECREASE_QUANTITY: "DECREASE_QUANTITY",
  INCREASE_QUANTITY: "INCREASE_QUANTITY",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CHANGE_VARIANT: "CHANGE_VARIANT",
  CLEAR_CART: "CLEAR_CART",
  CHECK_ITEM: "CHECK_ITEM",
};

function reducer(state, action) {
  switch (action.type) {
    // first action
    case CART_ACTIONS.SET_CART:
      return { ...state, cartItems: action.payload.cartItems };

    // second action
    case CART_ACTIONS.ADD_TO_CART:
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.variant.id === action.payload.variant.id
      );
      const updatedCartItems = [...state.cartItems];
      if (existingCartItemIndex !== -1) {
        // Check if current quantity + added value is less than variant quantity
        if (
          updatedCartItems[existingCartItemIndex].quantity +
            Number(action.payload.quantity) <=
          updatedCartItems[existingCartItemIndex].variant.quantity
        )
          updatedCartItems[existingCartItemIndex].quantity += Number(
            action.payload.quantity
          );
        // If not, set quantity to variant quantity
        else {
          updatedCartItems[existingCartItemIndex].quantity =
            updatedCartItems[existingCartItemIndex].variant.quantity;
        }
      } else {
        updatedCartItems.push(action.payload);
      }
      return { ...state, cartItems: updatedCartItems };

    // third action
    case CART_ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.variant.id !== action.payload.variantId
        ),
      };

    // fourth action
    case CART_ACTIONS.INCREASE_QUANTITY:
      const existingCartItemIndex4 = state.cartItems.findIndex(
        (item) => item.variant.id === action.payload.variantId
      );
      const updatedCartItems4 = [...state.cartItems];
      if (
        existingCartItemIndex4 !== -1 &&
        updatedCartItems4[existingCartItemIndex4].quantity <
          state.cartItems[existingCartItemIndex4].variant.quantity
      ) {
        updatedCartItems4[existingCartItemIndex4].quantity += 1;
      }
      return { ...state, cartItems: updatedCartItems4 };

    // fifth action
    case CART_ACTIONS.DECREASE_QUANTITY:
      const existingCartItemIndex5 = state.cartItems.findIndex(
        (item) => item.variant.id === action.payload.variantId
      );
      const updatedCartItems6 = [...state.cartItems];
      if (
        existingCartItemIndex5 !== -1 &&
        updatedCartItems6[existingCartItemIndex5].quantity > 1
      ) {
        updatedCartItems6[existingCartItemIndex5].quantity -= 1;
      }
      return { ...state, cartItems: updatedCartItems6 };

    // sixth action
    case CART_ACTIONS.UPDATE_QUANTITY:
      const updatedCartItems7 = state.cartItems.map((item) => {
        if (
          item.variant.id === action.payload.variantId &&
          action.payload.quantity > 0 &&
          action.payload.quantity <= item.variant.quantity
        ) {
          return { ...item, quantity: Number(action.payload.quantity) };
        }
        return item;
      });
      return { ...state, cartItems: updatedCartItems7 };

    // seventh action
    case CART_ACTIONS.CHANGE_VARIANT:
      const existingCartItemIndex8 = state.cartItems.findIndex(
        (item) => item.variant.id === action.payload.variantId
      );

      const product = state.cartItems.find(
        (item) => item.variant.id === action.payload.variantId
      ).product;

      const newVariant = product.variants.find(
        (variant) => variant.id === action.payload.newVariantId
      );

      let discountPrice = 0;
      if (product.productDiscount.length > 0) {
        const { discountType, discountValue } = product.productDiscount[0];
        discountPrice =
          discountType === "percentage"
            ? newVariant.price * (discountValue / 100)
            : discountValue;
      }

      const newPricePerOne = newVariant.price - discountPrice;

      const updatedCartItems8 = [...state.cartItems];
      if (existingCartItemIndex8 !== -1) {
        updatedCartItems8[existingCartItemIndex8] = {
          ...updatedCartItems8[existingCartItemIndex8],
          variant: newVariant,
          finalPricePerOne: newPricePerOne,
        };
      }

      return { ...state, cartItems: updatedCartItems8 };

    // eighth action
    case CART_ACTIONS.CLEAR_CART:
      return { ...state, cartItems: [] };

    // ninth action
    case CART_ACTIONS.CHECK_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.variant.id === action.payload.variantId) {
            return { ...item, isChecked: !item.isChecked };
          }
          return item;
        }),
      };

    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [{ cartItems }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartItems && cartItems.length > 0) {
      dispatch({ type: "SET_CART", payload: { cartItems } });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.isChecked ? item.quantity : 0),
    0
  );

  const totalPrices = cartItems.reduce((acc, item) => {
    return acc + (item.isChecked ? item.finalPricePerOne * item.quantity : 0);
  }, 0);

  const choosedItems = cartItems.filter((item) => item.isChecked);

  const isProductInCart = (productId) => {
    return cartItems.some((item) => item.product.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrices,
        choosedItems,
        dispatch,
        isProductInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export { CartProvider, useCart };
