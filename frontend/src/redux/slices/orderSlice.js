import { createSlice } from "@reduxjs/toolkit";
import orderAPI from "../../mocks/order";

// Define the initial state for the order slice
const initialState = {
  listorder: [], // Array to store user's orders
  orderDetails: {}, // Object to store details of a specific order
  loading: false, // Flag indicating whether an asynchronous operation is in progress
  error: null, // Holds any error that occurs during the asynchronous operations
};

// Create the order slice using createSlice from Redux Toolkit
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Reducer functions for handling different actions related to orders

    // Action to set loading to true and reset error for fetching order details
    getOrderDetailsStart(state) {
      state.loading = true;
      state.error = null;
    },

    // Action to update orderDetails with fetched data, set loading to false, and reset error
    getOrderDetailsSuccess(state, action) {
      state.orderDetails = action.payload;
      state.loading = false;
      state.error = null;
      console.log(action.payload);
    },

    // Action to set loading to false and update error with failure message
    getOrderDetailsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Action to set loading to true and reset error for creating a new order
    createOrderStart(state) {
      console.log(state);
      state.loading = true;
      state.error = null;
    },

    // Action to update listorder and orderDetails with the created order, set loading to false, and reset error
    createOrderSuccess(state, action) {
      state.listorder.push(action.payload);
      state.orderDetails = action.payload;
      state.loading = false;
      state.error = null;
      console.log(state, action);
    },

    // Action to set loading to false and update error with failure message
    createOrderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      console.log(state, action);
    },

    // Action to set loading to true and reset error for initiating payment of an order
    payOrderStart(state) {
      state.loading = true;
      state.error = null;
    },

    // Action to update orderDetails with the paid status, set loading to false, and reset error
    payOrderSuccess(state, action) {
      if (action.payload === "Order was paid") {
        state.orderDetails.isPaid = true; // Update the 'isPaid' property of 'orderDetails'
      }

      state.loading = false;
      state.error = null;
      console.log(action.payload);
      console.log(state.orderDetails);

      return state; // Return the updated state
    },

    // Action to set loading to false and update error with failure message
    payOrderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Action to set loading to true and reset error for fetching user's orders
    listMyOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },

    // Action to update listorder with the fetched user's orders, set loading to false, and reset error
    listMyOrdersSuccess(state, action) {
      state.listorder = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Action to set loading to false and update error with failure message
    listMyOrdersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Action to set loading to true and reset error for fetching all orders
    listOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },

    // Action to update listorder with the fetched orders, set loading to false, and reset error
    listOrdersSuccess(state, action) {
      state.listorder = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Action to set loading to false and update error with failure message
    listOrdersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Action to set loading to true and reset error for marking an order as delivered
    deliverOrderStart(state) {
      state.loading = true;
      state.error = null;
    },

    // Action to update listorder with the delivered order, set loading to false, and reset error
    deliverOrderSuccess(state, action) {
      const updatedOrder = action.payload;
      const index = state.listorder.findIndex(
        (order) => order._id === updatedOrder._id
      );
      if (index !== -1) {
        state.listorder[index] = updatedOrder;
      }
      state.loading = false;
      state.error = null;
    },

    // Action to set loading to false and update error with failure message
    deliverOrderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export individual action creators from the slice
export const {
  getOrderDetailsStart,
  getOrderDetailsSuccess,
  getOrderDetailsFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  payOrderStart,
  payOrderSuccess,
  payOrderFailure,
  listMyOrdersStart,
  listMyOrdersSuccess,
  listMyOrdersFailure,
  listOrdersStart,
  listOrdersSuccess,
  listOrdersFailure,
  deliverOrderStart,
  deliverOrderSuccess,
  deliverOrderFailure,
} = orderSlice.actions;

// Async thunk action creator to create a new order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderStart());
    const createdOrder = await orderAPI.createOrder(order);
    dispatch(createOrderSuccess(createdOrder));
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch(createOrderFailure(error.message));
  }
};

// Async thunk action creator to fetch details of a specific order
export const getOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch(getOrderDetailsStart());
    const orderDetails = await orderAPI.getOrderDetails(orderId);
    console.log(orderId);
    dispatch(getOrderDetailsSuccess(orderDetails));
  } catch (error) {
    dispatch(getOrderDetailsFailure(error.message));
  }
};

// Async thunk action creator to initiate payment for an order
export const payOrder = (orderId, paymentResult) => async (dispatch) => {
  try {
    dispatch(payOrderStart());
    const updatedOrder = await orderAPI.payOrder(orderId, paymentResult);
    dispatch(payOrderSuccess(updatedOrder));
  } catch (error) {
    dispatch(payOrderFailure(error.message));
  }
};

// Async thunk action creator to fetch the authenticated user's orders
export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch(listMyOrdersStart());
    const myOrders = await orderAPI.listMyOrders();
    dispatch(listMyOrdersSuccess(myOrders));
  } catch (error) {
    dispatch(listMyOrdersFailure(error.message));
  }
};

// Async thunk action creator to fetch all orders
export const listOrders = () => async (dispatch) => {
  try {
    dispatch(listOrdersStart());
    const allOrders = await orderAPI.listOrders();
    dispatch(listOrdersSuccess(allOrders));
  } catch (error) {
    dispatch(listOrdersFailure(error.message));
  }
};

// Async thunk action creator to mark an order as delivered
export const deliverOrder = (orderId) => async (dispatch) => {
  try {
    dispatch(deliverOrderStart());
    const updatedOrder = await orderAPI.deliverOrder(orderId);
    dispatch(deliverOrderSuccess(updatedOrder));
  } catch (error) {
    dispatch(deliverOrderFailure(error.message));
  }
};

// Export the reducer generated by createSlice
export const { reducer } = orderSlice;

// Default export the entire orderSlice for usage in other modules
export default orderSlice;
