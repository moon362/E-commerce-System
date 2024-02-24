import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing the cart state.
 * @type {import("@reduxjs/toolkit").Slice}
 */
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    shippingAddress: {},
    paymentMethod: null, // Add this line to the initialState
  },
  reducers: {
    /**
     * Sets the cart items in the state and updates the local storage.
     * @param {object} state - The current state.
     * @param {import("@reduxjs/toolkit").PayloadAction} action - The Redux action.
     */
    setCartItems(state, action) {
      state.cartItems = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(action.payload));
    },

    /**
     * Removes a cart item based on its ID.
     * @param {object} state - The current state.
     * @param {import("@reduxjs/toolkit").PayloadAction} action - The Redux action.
     */
    removeCartItem(state, action) {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== id);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    /**
     * Sets the shipping address in the state and updates the local storage.
     * @param {object} state - The current state.
     * @param {import("@reduxjs/toolkit").PayloadAction} action - The Redux action.
     */
    setShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },

    /**
     * Sets the payment method in the state and updates the local storage.
     * @param {object} state - The current state.
     * @param {import("@reduxjs/toolkit").PayloadAction} action - The Redux action.
     */
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
    },
  },
});

export const {
  setCartItems,
  removeCartItem,
  setShippingAddress,
  setPaymentMethod,
} = cartSlice.actions;

export const { reducer } = cartSlice;
export default cartSlice;
