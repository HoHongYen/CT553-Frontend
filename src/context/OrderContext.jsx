/* eslint-disable no-case-declarations */
import { useReducer } from "react";
import { createContext, useContext, useEffect } from "react";
import { useAddresses } from "@/hooks/profile/addresses/useAddresses";
import { getShippingFree } from "@/services/apiShippings";

const OrderContext = createContext();

const initialState = {
  address: null,
  shippingFee: 0,
};

export const ORDER_ACTIONS = {
  SET_ADDRESS: "SET_ADDRESS",
  SET_SHIPPING_FEE: "SET_SHIPPING_FEE",
};

function reducer(state, action) {
  switch (action.type) {
    case ORDER_ACTIONS.SET_ADDRESS:
      return { ...state, address: action.payload.address };
    case ORDER_ACTIONS.SET_SHIPPING_FEE:
      return { ...state, shippingFee: action.payload.shippingFee };
    default:
      return state;
  }
}

function OrderProvider({ children }) {
  const [{ address, shippingFee }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { addresses } = useAddresses();

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      const defaultAddress = addresses.find((address) => address.isDefault);
      console.log(defaultAddress);
      dispatch({
        type: ORDER_ACTIONS.SET_ADDRESS,
        payload: { address: defaultAddress },
      });
    }
  }, [addresses]);

  useEffect(() => {
    calculateShippingFee();
  }, [address]);

  async function calculateShippingFee() {
    if (address) {
      const res = await getShippingFree({
        toDistrictId: address.districtId,
        toWardCode: address.wardCode,
        weightInGram: 1000,
      });

      dispatch({
        type: ORDER_ACTIONS.SET_SHIPPING_FEE,
        payload: { shippingFee: res.metadata.total },
      });
    }
  }

  return (
    <OrderContext.Provider
      value={{
        address,
        shippingFee,
        dispatch,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within a OrderProvider");
  }
  return context;
}

export { OrderProvider, useOrder };
