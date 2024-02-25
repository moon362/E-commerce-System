/**
 * Redux Toolkit Slice for managing cart-related state.
 * @module CartSlice
 */

import { createSlice } from "@reduxjs/toolkit";
import cartAPI from "../../mocks/cart";

/**
 * Initial state for the cart slice.
 * @typedef {Object} InitialState
 * @property {Array} cartItems - Array of items in the cart.
 * @property {Object} shippingAddress - Shipping address information.
 */

/**
 * Redux Toolkit Slice for managing cart-related state.
 * @type {Object}
 * @property {string} name - Name of the slice.
 * @property {InitialState} initialState - Initial state for the slice.
 * @property {Object} reducers - Redux reducers for the slice.
 */
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    shippingAddress: {},
  },
  reducers: {
    /**
     * Redux reducer for setting cart items.
     * @function
     * @param {Object} state - Current state.
     * @param {Object} action - Redux action containing payload.
     */
    setCartItems(state, action) {
      state.cartItems = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(action.payload));
    },

    /**
     * Redux reducer for removing a cart item by ID.
     * @function
     * @param {Object} state - Current state.
     * @param {Object} action - Redux action containing payload.
     */
    removeCartItem(state, action) {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== id);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    /**
     * Redux reducer for setting shipping address.
     * @function
     * @param {Object} state - Current state.
     * @param {Object} action - Redux action containing payload.
     */
    setShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },

    /**
     * Redux reducer for setting payment method.
     * @function
     * @param {Object} state - Current state.
     * @param {Object} action - Redux action containing payload.
     */
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
    },
  },
});

/**
 * Actions for the cart slice.
 * @type {Object}
 * @property {Function} setCartItems - Action creator for setting cart items.
 * @property {Function} removeCartItem - Action creator for removing a cart item.
 * @property {Function} setShippingAddress - Action creator for setting shipping address.
 * @property {Function} setPaymentMethod - Action creator for setting payment method.
 */

export const {
  setCartItems,
  removeCartItem,
  setShippingAddress,
  setPaymentMethod,
} = cartSlice.actions;

/**
 * Action creator for adding an item to the cart.
 * @function
 * @param {string} id - Product ID.
 * @param {number} qty - Quantity of the product.
 * @returns {Function} - Thunk function for asynchronous dispatch.
 */
export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { cartItems } = getState().cart;
    const product = await cartAPI.fetchProduct(id);

    let existingItemIndex = -1;

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i]._id === id) {
        existingItemIndex = i;
        break;
      }
    }

    if (existingItemIndex !== -1) {
      // If an item with the same product ID exists, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].qty += qty;
      dispatch(setCartItems(updatedCartItems));
    } else {
      // If the product doesn't exist in the cart, add it as a new item
      dispatch(setCartItems([...cartItems, { ...product, qty }]));
    }
  } catch (error) {
    console.log("Error adding item to cart:", error);
  }
};

/**
 * Action creator for removing an item from the cart.
 * @function
 * @param {string} id - Product ID.
 * @returns {Function} - Thunk function for asynchronous dispatch.
 */
export const removeFromCart = (id) => (dispatch, getState) => {
  try {
    dispatch(removeCartItem(id));
  } catch (error) {
    console.log("Error removing item from cart:", error);
  }
};

/**
 * Action creator for saving the shipping address.
 * @function
 * @param {Object} data - Shipping address information.
 * @returns {Function} - Thunk function for asynchronous dispatch.
 */
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(setShippingAddress(data));
};

/**
 * Action creator for saving the payment method.
 * @function
 * @param {Object} data - Payment method information.
 * @returns {Function} - Thunk function for asynchronous dispatch.
 */
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(setPaymentMethod(data));
};

/**
 * Redux Toolkit reducer for the cart slice.
 * @type {Function}
 */
export const { reducer } = cartSlice;

/**
 * Default export for the cart slice.
 */
export default cartSlice;
