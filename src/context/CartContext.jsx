/* eslint-disable no-case-declarations */
import { createContext, useContext, useEffect } from "react";
import { useReducer } from "react";

const CartContext = createContext();

const initialState = {
  // cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  cartItems: [],
};

export const ACTIONS = {
  SET_CART: "SET_CART",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_CART:
      return { ...state, cartItems: action.payload.cartItems };
    case ACTIONS.ADD_TO_CART:
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.variant.id === action.payload.variant.id
      );
      const updatedCartItems = [...state.cartItems];
      if (existingCartItemIndex !== -1) {
        updatedCartItems[existingCartItemIndex].quantity += Number(
          action.payload.quantity
        );
      } else {
        updatedCartItems.push(action.payload);
      }
      return { ...state, cartItems: updatedCartItems };
    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.variant.id !== action.payload.variantId
        ),
      };
    case ACTIONS.UPDATE_QUANTITY:
      const updatedItems = state.cartItems.map((item) => {
        if (item.variant.id === action.payload.variantId) {
          return { ...item, quantity: Number(action.payload.quantity) };
        }
        return item;
      });
      return { ...state, cartItems: updatedItems };
    case ACTIONS.CLEAR_CART:
      return { ...state, cartItems: [] };
    default:
      throw Error("Invalid action");
  }
}

function CartProvider({ children }) {
  const [{ cartItems }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("cartItems", cartItems);
    if (cartItems && cartItems.length > 0)
      dispatch({ type: "SET_CART", payload: { cartItems } });
  }, []);

  useEffect(() => {
    console.log("cartItems Change", cartItems);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrices = cartItems.reduce(
    (acc, item) => acc + item.variant.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, totalItems, totalPrices, dispatch }}
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
