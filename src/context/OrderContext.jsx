/* eslint-disable no-case-declarations */
import { useReducer, useState } from "react";
import { createContext, useContext, useEffect } from "react";
import { useAddresses } from "@/hooks/profile/addresses/useAddresses";
import { getShippingFree } from "@/services/apiShippings";
import { getPaymentMethods } from "@/services/apiPayments";
import { useCart } from "./CartContext";
import { useCollectedCoupons } from "@/hooks/coupons/useCollectedCoupons";

const OrderContext = createContext();

const initialState = {
  address: null,
  sortedUnusedCoupons: [],
  appliedCoupon: null,
  shippingFee: 0,
  paymentMethod: null,
};

export const ORDER_ACTIONS = {
  SET_ADDRESS: "SET_ADDRESS",
  SET_SHIPPING_FEE: "SET_SHIPPING_FEE",
  SET_PAYMENT_METHOD: "SET_PAYMENT_METHOD",
  SET_APPLIED_COUPON: "SET_APPLIED_COUPON",
  SET_SORTED_UNUSED_COUPONS: "SET_SORTED_UNUSED_COUPONS",
  REMOVE_APPLIED_COUPON: "REMOVE_APPLIED_COUPON",
  RESET: "RESET",
};

function reducer(state, action) {
  switch (action.type) {
    case ORDER_ACTIONS.SET_ADDRESS:
      return { ...state, address: action.payload.address };
    case ORDER_ACTIONS.SET_SHIPPING_FEE:
      return { ...state, shippingFee: action.payload.shippingFee };
    case ORDER_ACTIONS.SET_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload.paymentMethod };
    case ORDER_ACTIONS.SET_APPLIED_COUPON:
      return { ...state, appliedCoupon: action.payload.appliedCoupon };
    case ORDER_ACTIONS.SET_SORTED_UNUSED_COUPONS:
      return {
        ...state,
        sortedUnusedCoupons: action.payload.sortedUnusedCoupons,
      };
    case ORDER_ACTIONS.REMOVE_APPLIED_COUPON:
      return { ...state, appliedCoupon: null };

    // keep the payment method is COD
    case ORDER_ACTIONS.RESET:
      return { ...initialState, paymentMethod: action.payload.paymentMethod };

    default:
      return state;
  }
}

function OrderProvider({ children }) {
  const [
    { address, shippingFee, paymentMethod, appliedCoupon, sortedUnusedCoupons },
    dispatch,
  ] = useReducer(reducer, initialState);

  const { addresses } = useAddresses();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { collectedCoupons } = useCollectedCoupons();
  const { totalPrice } = useCart();

  const getPriceAfterApplyingCoupon = (coupon) => {
    if (!coupon) return totalPrice;
    if (coupon.discountType === "percentage") {
      return totalPrice - (totalPrice * coupon.discountValue) / 100;
    }
    return totalPrice - coupon.discountValue;
  };

  const totalDiscount = appliedCoupon
    ? totalPrice - getPriceAfterApplyingCoupon(appliedCoupon.coupon)
    : 0;

  const finalPrice = totalPrice - totalDiscount + shippingFee;

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
    // get the most suitable coupon to apply
    const appliableCoupons = collectedCoupons.filter(
      (coupon) => !coupon.used && totalPrice >= coupon.coupon.minimumPriceToUse
    );

    const sortedCoupons = appliableCoupons.sort(
      (a, b) =>
        getPriceAfterApplyingCoupon(a.coupon) -
        getPriceAfterApplyingCoupon(b.coupon)
    );

    dispatch({
      type: ORDER_ACTIONS.SET_APPLIED_COUPON,
      payload: { appliedCoupon: sortedCoupons[0] },
    });

    // sort the unused coupons
    const unusedCoupons = collectedCoupons.filter((coupon) => !coupon.used);

    const unAppliedCoupons = unusedCoupons.filter(
      (coupon) => totalPrice < coupon.coupon.minimumPriceToUse
    );

    const sortedUnusedCoupons = [...sortedCoupons, ...unAppliedCoupons];

    console.log("sortedUnusedCoupons: ", sortedUnusedCoupons);

    dispatch({
      type: ORDER_ACTIONS.SET_SORTED_UNUSED_COUPONS,
      payload: { sortedUnusedCoupons },
    });
  }, [collectedCoupons, totalPrice]);

  useEffect(() => {
    console.log("appliedCoupon: ", appliedCoupon);
  }, [appliedCoupon]);

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
        appliedCoupon,
        sortedUnusedCoupons,
        totalDiscount,
        finalPrice,
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
