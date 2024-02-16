import axios from "axios";

/**
 * Class representing the Cart API.
 * @class
 */
class CartAPI {
  /**
   * Fetches product details by productId.
   * @async
   * @param {string} productId - The ID of the product to fetch.
   * @returns {Promise<object>} A promise that resolves to the product data.
   * @throws {Error} If an error occurs during the API request.
   */
  async fetchProduct(productId) {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * An instance of the CartAPI class.
 * @const {CartAPI}
 */
const cartAPI = new CartAPI();

export default cartAPI;
