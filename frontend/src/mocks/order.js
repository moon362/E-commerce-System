import axios from "axios";

/**
 * Class representing an API for handling orders.
 */
class OrderAPI {
  /**
   * Create a new order.
   *
   * @param {Object} order - The order information.
   * @returns {Promise<Object>} - The created order data.
   * @throws {string} - Throws an error message if the request fails.
   */
  createOrder = async (order) => {
    try {
      // Retrieve the user token from local storage
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      // Set the request headers
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a POST request to create the order
      const { data } = await axios.post(`/api/orders/add/`, order, config);

      return data;
    } catch (error) {
      // Handle errors and throw appropriate messages
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  };

  /**
   * Get details of a specific order.
   *
   * @param {string} id - The ID of the order.
   * @returns {Promise<Object>} - The order details.
   * @throws {string} - Throws an error message if the request fails.
   */
  getOrderDetails = async (id) => {
    try {
      // Retrieve the user token from local storage
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      // Set the request headers
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a GET request to retrieve order details
      const { data } = await axios.get(`/api/orders/${id}/`, config);

      return data;
    } catch (error) {
      // Handle errors and throw appropriate messages
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  };

  /**
   * Pay for an existing order.
   *
   * @param {string} id - The ID of the order.
   * @param {Object} paymentResult - The payment result information.
   * @returns {Promise<Object>} - The updated order data after payment.
   * @throws {string} - Throws an error message if the request fails.
   */
  payOrder = async (id, paymentResult) => {
    try {
      // Retrieve the user token from local storage
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      // Set the request headers
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a PUT request to update order payment status
      const { data } = await axios.put(
        `/api/orders/${id}/pay/`,
        paymentResult,
        config
      );

      return data;
    } catch (error) {
      // Handle errors and throw appropriate messages
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  };

  /**
   * List orders belonging to the authenticated user.
   *
   * @returns {Promise<Object>} - The list of orders for the authenticated user.
   * @throws {string} - Throws an error message if the request fails.
   */
  listMyOrders = async () => {
    try {
      // Retrieve the user token from local storage
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      // Set the request headers
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a GET request to retrieve the authenticated user's orders
      const { data } = await axios.get(`/api/orders/myorders/`, config);

      return data;
    } catch (error) {
      // Handle errors and throw appropriate messages
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  };

  /**
   * Mark an order as delivered.
   *
   * @param {Object} order - The order to be marked as delivered.
   * @returns {Promise<Object>} - The updated order data after marking as delivered.
   * @throws {string} - Throws an error message if the request fails.
   */
  deliverOrder = async (order) => {
    try {
      // Retrieve the user token from local storage
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      // Set the request headers
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a PUT request to mark the order as delivered
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver/`,
        {},
        config
      );

      return data;
    } catch (error) {
      // Handle errors and throw appropriate messages
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  };
}

// Create an instance of the OrderAPI class
const orderAPI = new OrderAPI();

// Export the orderAPI instance
export default orderAPI;
