// PlaceOrderScreen.test.js
import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import { createOrder } from "../redux/slices/orderSlice"; // Import the action creator

jest.mock("../redux/slices/orderSlice", () => ({
  ...jest.requireActual("../redux/slices/orderSlice"),
  createOrder: jest.fn(),
}));

describe("PlaceOrderScreen Component", () => {
  const mockStore = configureStore();
  const initialState = {
    order: {
      orderDetails: null,
      loading: false,
      error: null,
    },
    cart: {
      cartItems: [
        {
          _id: "1",
          product: "1",
          name: "Sample Product",
          image: "sample.jpg",
          qty: 2,
          price: 19.99,
        },
        // ... add more sample items if needed
      ],
      shippingAddress: {
        address: "123 Street",
        city: "Cityville",
        postalCode: "12345",
        country: "Countryland",
      },
      paymentMethod: "PayPal",
    },
  };
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Router>
          <PlaceOrderScreen />
        </Router>
      </Provider>
    );
  });

  it("renders without crashing", () => {
    expect(screen.getByText(/Shipping Address/i)).toBeInTheDocument();
    expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();
  });

  it("displays correct order summary calculations", async () => {
    await act(async () => {});
  });

  it("calls createOrder action on place order button click", async () => {
    // Additional assertions based on the expected behavior after calling createOrder
  });

  it("handles createOrder API call errors", async () => {
    createOrder.mockImplementationOnce(() => {
      throw new Error("API call failed");
    });

    // Expect error handling logic to be triggered (e.g., displaying error message)
    // Add assertions based on your error handling implementation

    // Optionally, reset mocks to prevent affecting other tests
    createOrder.mockRestore();
  });
});
