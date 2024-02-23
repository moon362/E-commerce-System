import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import HomeScreen from '../HomeScreen';

// Mock Redux store
const mockStore = configureStore([]);

describe('HomeScreen Component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      product: {
        productList: {
          products: [],
          loading: false,
          error: null,
          page: 1,
          pages: 1,
        },
        topRatedProducts: [],
      },
    });
  });

  test('renders latest products header', () => {
    render(
      <Provider store={store}>
        <Router>
          <HomeScreen />
        </Router>
      </Provider>
    );
    const headerElement = screen.getByText(/latest products/i);
    expect(headerElement).toBeInTheDocument();
  });

  // Add more test cases for other functionalities
});
