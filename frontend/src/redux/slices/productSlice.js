/**
 * Redux Toolkit Slice for managing product-related state.
 * @module ProductSlice
 */

import { createSlice } from '@reduxjs/toolkit';
import productAPI from '../../mocks/product';

/**
 * Initial state for the product slice.
 * @typedef {Object} InitialState
 * @property {Object} productList - Product list state.
 * @property {Array} productList.products - List of products.
 * @property {boolean} productList.loading - Loading state for product list.
 * @property {null|string} productList.error - Error message for product list.
 * @property {number} productList.page - Current page number for product list.
 * @property {number} productList.pages - Total number of pages for product list.
 * @property {Object} productDetails - Product details state.
 * @property {Object} productDetails.product - Details of a single product.
 * @property {boolean} productDetails.loading - Loading state for product details.
 * @property {null|string} productDetails.error - Error message for product details.
 * @property {Object} createReview - Create review state.
 * @property {boolean} createReview.loading - Loading state for create review.
 * @property {boolean} createReview.success - Success state for create review.
 * @property {null|string} createReview.error - Error message for create review.
 * @property {Object} topRatedProducts - Top rated products state.
 * @property {Array} topRatedProducts.products - List of top-rated products.
 * @property {boolean} topRatedProducts.loading - Loading state for top-rated products.
 * @property {null|string} topRatedProducts.error - Error message for top-rated products.
 */

/**
 * Redux Toolkit Slice for managing product-related state.
 * @type {Object}
 * @property {string} name - Name of the slice.
 * @property {InitialState} initialState - Initial state for the slice.
 * @property {Object} reducers - Redux reducers for the slice.
 */
const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: { products: [], loading: false, error: null, page: 0, pages: 0 },
    productDetails: { product: { reviews: [] }, loading: false, error: null },
    createReview: { loading: false, error: null, success: false },
    topRatedProducts: { products: [], loading: false, error: null },
  },
  reducers: {
    /**
     * Redux reducer for setting loading state and clearing error in product list.
     * @function
     * @param {Object} state - Current state.
     */
    productListRequest(state) {
      state.productList.loading = true;
      state.productList.error = null;
    },

    /**
     * Redux reducer for setting product list success state.
     * @function
     * @param {Object} state - Current state.
     * @param {Object} action - Redux action containing payload.
     */
    productListSuccess(state, action) {
      state.productList.loading = false;
      state.productList.products = action.payload.products;
      state.productList.page = action.payload.page;
      state.productList.pages = action.payload.pages;
    },

    /**
     * Redux reducer for setting product list failure state.
     * @function
     * @param {Object} state - Current state.
     * @param {Object} action - Redux action containing payload.
     */
    productListFailure(state, action) {
      state.productList.loading = false;
      state.productList.error = action.payload;
    },

    /**
     * Redux reducer for setting loading state and clearing error in product details.
     * @function
     * @param {Object} state - Current state.
     */
    productDetailsRequest(state) {
      state.productDetails.loading = true;
      state.productDetails.error = null;
    },

    /**
     * Redux reducer for setting product details success state.
     * @function
     * @param {Object} state - Current state.
     * @param {Object} action - Redux action containing payload.
     */
    productDetailsSuccess(state, action) {
      state.productDetails.loading = false;
      state.productDetails.product = action.payload;
    },

    /**
     * Redux reducer for setting product details failure state.
     * @function
     * @param {Object} state - Current state.
     * @param {Object} action - Redux action containing payload.
     */
    productDetailsFailure(state, action) {
      state.productDetails.loading = false;
      state.productDetails.error = action.payload;
    },

    /**
     * Redux reducer for setting loading state, clearing error, and resetting success state in create review.
     * @function
     * @param {Object} state - Current state.
     */
    createReviewRequest(state) {
      state.createReview.loading = true;
      state.createReview.error = null;
      state.createReview.success = false;
    },

    /**
     * Redux reducer for setting create review success state.
     * @function
     * @param {Object} state - Current state.
     */
    createReviewSuccess(state) {
      state.createReview.loading = false;
      state.createReview.success = true;
    },

    /**
     * Redux reducer for setting create review failure state.
     * @function
     * @param {Object} state - Current state.
     * @param {Object} action - Redux action containing payload.
     */
    createReviewFailure(state, action) {
      state.createReview.loading = false;
      state.createReview.error = action.payload;
    },

    /**
     * Redux reducer for setting loading state and clearing error in top-rated products.
     * @function
     * @param {Object} state - Current state.
     */
    productTopRequest(state) {
      state.topRatedProducts.loading = true;
      state.topRatedProducts.error = null;
    },

    /**
     * Redux reducer for setting top-rated products success state.
     * @function
     * @param {Object} state - Current state.
     * @param {Object} action - Redux action containing payload.
     */
    productTopSuccess(state, action) {
      state.topRatedProducts.loading = false;
      state.topRatedProducts.products = action.payload;
    },

    /**
     * Redux reducer for setting top-rated products failure state.
     * @function
     * @param {Object} state - Current state.
     * @param {Object} action - Redux action containing payload.
     */
    productTopFailure(state, action) {
      state.topRatedProducts.loading = false;
      state.topRatedProducts.error = action.payload;
    },
  },
});
export const {
  productListRequest,
  productListSuccess,
  productListFailure,
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFailure,
  createReviewRequest,
  createReviewSuccess,
  createReviewFailure,
  productTopRequest,
  productTopSuccess,
  productTopFailure,
} = productSlice.actions;
/**
 * Actions for the product slice.
 * @type {Object}
 * @property {Function} productListRequest - Action creator for requesting product list.
 * @property {Function} productListSuccess - Action creator for successful product list retrieval.
 * @property {Function} productListFailure - Action creator for failed product list retrieval.
 * @property {Function} productDetailsRequest - Action creator for requesting product details.
 * @property {Function} productDetailsSuccess - Action creator for successful product details retrieval.
 * @property {Function} productDetailsFailure - Action creator for failed product details retrieval.
 * @property {Function} createReviewRequest - Action creator for requesting review creation.
 * @property {Function} createReviewSuccess - Action creator for successful review creation.
 * @property {Function} createReviewFailure - Action creator for failed review creation.
 * @property {Function} productTopRequest - Action creator for requesting top-rated products.
 * @property {Function} productTopSuccess - Action creator for successful top-rated products retrieval.
 * @property {Function} productTopFailure - Action creator for failed top-rated products retrieval.
 */

/**
 * Action creators for fetching the product list.
 * @function
 * @param {string} keyword - Keyword for product search.
 * @param {string} [pageNumber=''] - Optional page number for pagination.
 * @returns {Function} - Thunk function for asynchronous dispatch.
 */
export const fetchProductList = (keyword, pageNumber = '') => async (dispatch) => {
  try {
    dispatch(productListRequest());
    const productList = await productAPI.getProductList(keyword, pageNumber);
    dispatch(productListSuccess(productList));
  } catch (error) {
    dispatch(productListFailure(error.response?.data.detail || error.message));
  }
};

/**
 * Action creator for fetching product details.
 * @function
 * @param {string} id - Product ID.
 * @returns {Function} - Thunk function for asynchronous dispatch.
 */
export const fetchProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsRequest());
    const productDetails = await productAPI.getProductDetails(id);
    dispatch(productDetailsSuccess(productDetails));
  } catch (error) {
    dispatch(productDetailsFailure(error.response?.data.detail || error.message));
  }
};

/**
 * Action creator for creating a product review.
 * @function
 * @param {string} productId - Product ID.
 * @param {Object} review - Review details.
 * @returns {Function} - Thunk function for asynchronous dispatch.
 */
export const createReview = (productId, review) => async (dispatch) => {
  try {
    dispatch(createReviewRequest());
    
    await productAPI.createProductReview(productId, review);
    dispatch(createReviewSuccess());
  } catch (error) {
    dispatch(createReviewFailure(error.response?.data.detail || error.message));
  }
};

/**
 * Action creator for fetching top-rated products.
 * @function
 * @returns {Function} - Thunk function for asynchronous dispatch.
 */
export const fetchTopRatedProducts = () => async (dispatch) => {
  try {
    dispatch(productTopRequest());
    const topRatedProducts = await productAPI.getTopRatedProducts();
    dispatch(productTopSuccess(topRatedProducts));
  } catch (error) {
    dispatch(productTopFailure(error.response?.data.detail || error.message));
  }
};

/**
 * Redux Toolkit reducer for the product slice.
 * @type {Function}
 */
export const { reducer } = productSlice;

/**
 * Default export for the product slice.
 */
export default productSlice;
