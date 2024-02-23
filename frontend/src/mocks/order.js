import axios from "axios";

// Class representing the Order API
class OrderAPI {
  // Method to create a new order
  createOrder = async (order) => {
    try {
      // Retrieve user token from localStorage
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      // Set up request headers with authentication token
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a POST request to create a new order
      const { data } = await axios.post(`/api/orders/add/`, order, config);

      // Return the response data
      return data;
    } catch (error) {
      // Handle and throw errors with appropriate messages
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  };

  // Method to get details of a specific order by ID
  getOrderDetails = async (id) => {
    try {
      // Retrieve user token from localStorage
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      // Set up request headers with authentication token
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a GET request to retrieve order details
      const { data } = await axios.get(`/api/orders/${id}/`, config);

      // Return the response data
      return data;
    } catch (error) {
      // Handle and throw errors with appropriate messages
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  };

  // Method to update an order's payment status
  payOrder = async (id, paymentResult) => {
    try {
      // Retrieve user token from localStorage
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      // Set up request headers with authentication token
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a PUT request to update the payment status of an order
      const { data } = await axios.put(
        `/api/orders/${id}/pay/`,
        paymentResult,
        config
      );

      // Return the response data
      return data;
    } catch (error) {
      // Handle and throw errors with appropriate messages
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  };

  // Method to get a list of orders for the authenticated user
  listMyOrders = async () => {
    try {
      // Retrieve user token from localStorage
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      // Set up request headers with authentication token
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a GET request to retrieve the user's orders
      const { data } = await axios.get(`/api/orders/myorders/`, config);

      // Return the response data
      return data;
    } catch (error) {
      // Handle and throw errors with appropriate messages
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  };

  // Method to mark an order as delivered
  deliverOrder = async (order) => {
    try {
      // Retrieve user token from localStorage
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      // Set up request headers with authentication token
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a PUT request to mark an order as delivered
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver/`,
        {},
        config
      );

      // Return the response data
      return data;
    } catch (error) {
      // Handle and throw errors with appropriate messages
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  };
}

// Create an instance of the OrderAPI class
const orderAPI = new OrderAPI();

// Export the instance of OrderAPI for use in other modules
export default orderAPI;
