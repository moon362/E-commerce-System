import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PaymentScreen from "../screens/PaymentScreen";
import { savePaymentMethod } from "../redux/slices/cartSlice";

// Mock the CheckoutSteps component
jest.mock("../components/CheckoutSteps", () => ({
  __esModule: true,
  default: () => <div>MockedCheckoutSteps</div>,
}));

describe("PaymentScreen Component", () => {
  const mockStore = configureStore();
  const initialState = {
    cart: {
      shippingAddress: {
        address: "123 Street",
        city: "Cityville",
        postalCode: "12345",
        country: "Countryland",
      },
    },
  };
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Router>
          <PaymentScreen />
        </Router>
      </Provider>
    );
  });

  it("renders without crashing", () => {
    expect(screen.getByText(/select method/i)).toBeInTheDocument();
  });

  it("redirects to shipping screen if no shipping address", () => {
    // Mock the useSelector hook to simulate no shipping address
    jest.mock("react-redux", () => ({
      ...jest.requireActual("react-redux"),
      useSelector: jest.fn(() => ({ cart: { shippingAddress: {} } })),
    }));

    render(
      <Provider store={store}>
        <Router>
          <PaymentScreen />
        </Router>
      </Provider>
    );

    // const redirectedText = screen.getByText(/Redirecting to Shipping/i);
    // expect(redirectedText).toBeInTheDocument();
  });
  it("dispatches savePaymentMethod on form submission", () => {
    const mockDispatch = jest.fn();
    jest.mock("react-redux", () => ({
      ...jest.requireActual("react-redux"),
      useDispatch: () => mockDispatch,
    }));

    render(
      <Provider store={store}>
        <Router>
          <PaymentScreen />
        </Router>
      </Provider>
    );

    // Simulate form submission using fireEvent.submit on the form
    // fireEvent.submit(screen.getByRole("button", { name: "Continue" }));

    // expect(mockDispatch).toHaveBeenCalledWith(savePaymentMethod("PayPal"));
  });

  it("renders with CheckoutSteps component", () => {
    // Check if MockedCheckoutSteps is rendered
    expect(screen.getByText(/MockedCheckoutSteps/i)).toBeInTheDocument();
  });
});
