/* eslint-disable no-case-declarations */
import { useReducer, useState } from "react";
import { createContext, useContext, useEffect } from "react";
import { useAddresses } from "@/hooks/profile/addresses/useAddresses";
import { getShippingFree } from "@/services/apiShippings";
import { getPaymentMethods } from "@/services/apiPayments";

const OrderContext = createContext();

const initialState = {
  address: null,
  shippingFee: 0,
  paymentMethod: null,
};

export const ORDER_ACTIONS = {
  SET_ADDRESS: "SET_ADDRESS",
  SET_SHIPPING_FEE: "SET_SHIPPING_FEE",
  SET_PAYMENT_METHOD: "SET_PAYMENT_METHOD",
};

function reducer(state, action) {
  switch (action.type) {
    case ORDER_ACTIONS.SET_ADDRESS:
      return { ...state, address: action.payload.address };
    case ORDER_ACTIONS.SET_SHIPPING_FEE:
      return { ...state, shippingFee: action.payload.shippingFee };
    case ORDER_ACTIONS.SET_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload.paymentMethod };
    default:
      return state;
  }
}

function OrderProvider({ children }) {
  const [{ address, shippingFee, paymentMethod }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { addresses } = useAddresses();
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      const defaultAddress = addresses.find((address) => address.isDefault);
      if (!defaultAddress) {
        dispatch({
          type: ORDER_ACTIONS.SET_ADDRESS,
          payload: { address: addresses[0] },
        });
      }
      dispatch({
        type: ORDER_ACTIONS.SET_ADDRESS,
        payload: { address: defaultAddress },
      });
    } 
  }, [addresses]);

  useEffect(() => {
    async function fetchPaymentMethods() {
      const res = await getPaymentMethods();
      setPaymentMethods(res.metadata);
    }
    fetchPaymentMethods();
  }, []);

  useEffect(() => {
    if (paymentMethods.length > 0) {
      dispatch({
        type: ORDER_ACTIONS.SET_PAYMENT_METHOD,
        payload: { paymentMethod: paymentMethods[0] },
      });
    }
  }, [paymentMethods]);

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
        paymentMethods,
        paymentMethod,
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
