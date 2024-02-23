import { createSlice } from "@reduxjs/toolkit";
import orderAPI from "../../mocks/order";

/**
 * @typedef {Object} OrderState - Initial state for the order slice in the Redux store.
 * @property {Array} listorder - List of orders.
 * @property {Object} orderDetails - Details of a specific order.
 * @property {boolean} loading - Loading state indicator.
 * @property {?string} error - Error message in case of failure.
 */

/**
 * Initial state for the order slice in the Redux store.
 * @type {OrderState}
 */
const initialState = {
  listorder: [],
  orderDetails: {},
  loading: false,
  error: null,
};

/**
 * Redux toolkit slice for handling order-related actions and state.
 * @type {Slice}
 */
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    /**
     * Action to indicate the start of fetching order details.
     * @param {OrderState} state - Current order state.
     */
    getOrderDetailsStart(state) {
      state.loading = true;
      state.error = null;
    },
    /**
     * Action to handle successful fetching of order details.
     * @param {OrderState} state - Current order state.
     * @param {Object} action - Redux action containing payload.
     * @param {Object} action.payload - Order details payload.
     */
    getOrderDetailsSuccess(state, action) {
      state.orderDetails = action.payload;
      state.loading = false;
      state.error = null;
      console.log(action.payload);
    },
    /**
     * Action to handle failure in fetching order details.
     * @param {OrderState} state - Current order state.
     * @param {Object} action - Redux action containing payload.
     * @param {string} action.payload - Error message.
     */
    getOrderDetailsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    /**
     * Action to indicate the start of creating a new order.
     * @param {OrderState} state - Current order state.
     */
    createOrderStart(state) {
      console.log(state);
      state.loading = true;
      state.error = null;
    },
    /**
     * Action to handle successful creation of a new order.
     * @param {OrderState} state - Current order state.
     * @param {Object} action - Redux action containing payload.
     * @param {Object} action.payload - Created order payload.
     */
    createOrderSuccess(state, action) {
      state.listorder.push(action.payload);
      state.orderDetails = action.payload;
      state.loading = false;
      state.error = null;
      console.log(state, action);
    },
    /**
     * Action to handle failure in creating a new order.
     * @param {OrderState} state - Current order state.
     * @param {Object} action - Redux action containing payload.
     * @param {string} action.payload - Error message.
     */
    createOrderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      console.log(state, action);
    },

    /**
     * Action to indicate the start of paying for an order.
     * @param {OrderState} state - Current order state.
     */
    payOrderStart(state) {
      state.loading = true;
      state.error = null;
    },
    /**
     * Action to handle successful payment for an order.
     * @param {OrderState} state - Current order state.
     * @param {Object} action - Redux action containing payload.
     * @param {string} action.payload - Payment success message.
     */
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
    /**
     * Action to handle failure in paying for an order.
     * @param {OrderState} state - Current order state.
     * @param {Object} action - Redux action containing payload.
     * @param {string} action.payload - Error message.
     */
    payOrderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    /**
     * Action to indicate the start of fetching authenticated user's orders.
     * @param {OrderState} state - Current order state.
     */
    listMyOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },
    /**
     * Action to handle successful fetching of authenticated user's orders.
     * @param {OrderState} state - Current order state.
     * @param {Object} action - Redux action containing payload.
     * @param {Array} action.payload - List of authenticated user's orders.
     */
    listMyOrdersSuccess(state, action) {
      state.listorder = action.payload;
      state.loading = false;
      state.error = null;
    },
    /**
     * Action to handle failure in fetching authenticated user's orders.
     * @param {OrderState} state - Current order state.
     * @param {Object} action - Redux action containing payload.
     * @param {string} action.payload - Error message.
     */
    listMyOrdersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    /**
     * Action to set loading to true and reset error for fetching all orders.
     * @param {OrderState} state - Current order state.
     */
    listOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },

    /**
     * Action to update listorder with the fetched orders, set loading to false, and reset error.
     * @param {OrderState} state - Current order state.
     * @param {Object} action - Redux action containing payload.
     * @param {Array} action.payload - List of fetched orders.
     */
    listOrdersSuccess(state, action) {
      state.listorder = action.payload;
      state.loading = false;
      state.error = null;
    },

    /**
     * Action to set loading to false and update error with failure message.
     * @param {OrderState} state - Current order state.
     * @param {Object} action - Redux action containing payload.
     * @param {string} action.payload - Error message.
     */
    listOrdersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    /**
     * Action to set loading to true and reset error for marking an order as delivered.
     * @param {OrderState} state - Current order state.
     */
    deliverOrderStart(state) {
      state.loading = true;
      state.error = null;
    },

    /**
     * Action to update listorder with the delivered order, set loading to false, and reset error.
     * @param {OrderState} state - Current order state.
     * @param {Object} action - Redux action containing payload.
     * @param {Object} action.payload - Updated order marked as delivered.
     */
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

    /**
     * Action to set loading to false and update error with failure message.
     * @param {OrderState} state - Current order state.
     * @param {Object} action - Redux action containing payload.
     * @param {string} action.payload - Error message.
     */
    deliverOrderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

/**
 * Export individual actions from the order slice for usage in components.
 */
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
/**
 * Thunk action to create a new order.
 * @param {Object} order - The order information.
 * @returns {Function} - Thunk function for asynchronous order creation.
 */
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
/**
 * Thunk action to get details of a specific order.
 * @param {string} orderId - The ID of the order.
 * @returns {Function} - Thunk function for asynchronous order details retrieval.
 */
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
/**
 * Thunk action to pay for an order.
 * @param {string} orderId - The ID of the order to be paid.
 * @param {Object} paymentResult - The payment result information.
 * @returns {Function} - Thunk function for asynchronous order payment.
 */
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
/**
 * Thunk action to fetch authenticated user's orders.
 * @returns {Function} - Thunk function for asynchronous fetching of authenticated user's orders.
 */
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
/**
 * Thunk action to fetch all orders.
 * @returns {Function} - Thunk function for asynchronous fetching of all orders.
 */
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
/**
 * Thunk action to mark an order as delivered.
 * @param {string} orderId - The ID of the order to be marked as delivered.
 * @returns {Function} - Thunk function for asynchronous marking an order as delivered.
 */
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
/**
 * Export the reducer from the order slice.
 */
export const { reducer } = orderSlice;

// Default export the entire orderSlice for usage in other modules
/**
 * Default export the entire orderSlice for usage in other modules.
 */
export default orderSlice;
