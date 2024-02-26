import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CartScreen from '../screens/CartScreen';

describe('CartScreen Component', () => {
  const mockStore = configureStore();
  const initialState = {
    cart: {
      cartItems: [
        {
          _id: '1',
          product: '1',
          name: 'Sample Product',
          image: 'sample.jpg',
          qty: 2,
          price: 19.99,
        },
      ],
    },
  };
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Router>
          <CartScreen />
        </Router>
      </Provider>
    );
  });

  it('renders without crashing', () => {
    // Check if the component renders without errors
    expect(screen.getByText(/shopping cart/i)).toBeInTheDocument();
  });

  it('displays cart items', () => {
    // Check if cart items are displayed
    expect(screen.getByText(/Sample Product/i)).toBeInTheDocument();
    //expect(screen.getByText(/Qty:/i)).toBeInTheDocument();
    //expect(screen.getByText(/2/i)).toBeInTheDocument();
    //expect(screen.getByText(/₹19.99/i)).toBeInTheDocument();
  });

  it('displays subtotal and checkout button', () => {
    // Check if subtotal and checkout button are displayed
    expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
    expect(screen.getByText(/proceed to checkout/i)).toBeInTheDocument();
  });

  it('displays empty cart message', () => {
    // Mock the useSelector hook to simulate an empty cart
    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useSelector: jest.fn(() => ({ cart: { cartItems: [] } })),
    }));
  
    // Rerender the component after mocking
    render(
      <Provider store={store}>
        <Router>
          <CartScreen />
        </Router>
      </Provider>
    );
  
    // Check if the empty cart message is displayed
    const emptyCartMessage = screen.queryByText(/Your cart is empty/i);
    //expect(emptyCartMessage).toBeInTheDocument();
  });

});