import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ProductScreen from '../product_screen';

// Mock Redux store
const mockStore = configureStore([]);

describe('ProductScreen Component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      product: {
        productDetails: {
          product: {
            _id: '1',
            name: 'Test Product',
            image: 'test.jpg',
            price: 100,
            rating: 4.5,
            numReviews: 10,
            description: 'Test Description',
            countInStock: 5,
            reviews: [],
          },
          loading: false,
          error: null,
        },
        createReview: {
          loading: false,
          error: null,
          success: false,
        },
      },
      user: {
        userDetails: null,
      },
    });
  });

  test('renders product details', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductScreen match={{ params: { id: '1' } }} />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/₹100/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
    expect(screen.getByText(/In Stock/i)).toBeInTheDocument();
  });

  test('renders quantity select when product is in stock', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductScreen match={{ params: { id: '1' } }} />
        </Router>
      </Provider>
    );

    const quantitySelect = screen.getByRole('combobox');
    expect(quantitySelect).toBeInTheDocument();
    expect(quantitySelect.children.length).toBe(5); // 1 to 5 options
  });

  test('adds product to cart when Add to Cart button is clicked', () => {
    const historyMock = { push: jest.fn() };

    render(
      <Provider store={store}>
        <Router>
          <ProductScreen match={{ params: { id: '1' } }} history={historyMock} />
        </Router>
      </Provider>
    );

    const addToCartButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addToCartButton);
    expect(historyMock.push).toHaveBeenCalledWith('/cart/1?qty=1');
  });

  // Add more test cases for other functionalities
});
