import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import OrderScreen from '../OrderScreen';

describe('OrderScreen Component', () => {
  const mockStore = configureStore();
  const initialState = {
    order: {
      orderDetails: {
        _id: '1',
        orderItems: [
          {
            _id: '1',
            name: 'Sample Product 1',
            price: 19.99,
            qty: 2,
          },
        ],
        shippingPrice: 5.99,
        taxPrice: 2.5,
        totalPrice: 48.97,
        isPaid: false,
      },
      loading: false,
      error: null,
    }
  };
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Router>
          <OrderScreen history={{ push: jest.fn() }} />
        </Router>
      </Provider>
    );
  });

  it('renders without crashing', () => {
    // Check if the component renders without errors
    expect(screen.getByText(/Order: 1/i)).toBeInTheDocument();
  });

  it('displays order details', () => {
    // Check if order details are displayed
    expect(screen.getByText(/Payment/i)).toBeInTheDocument();
    expect(screen.getByText(/Order Items/i)).toBeInTheDocument();
  });

  it('displays order summary', () => {
    // Check if order summary details are displayed
    expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Products Cost:/i)).toBeInTheDocument();
    expect(screen.getByText(/Shipping:/i)).toBeInTheDocument();
    expect(screen.getByText(/Tax:/i)).toBeInTheDocument();
    expect(screen.getByText(/Total:/i)).toBeInTheDocument();
  });

});
