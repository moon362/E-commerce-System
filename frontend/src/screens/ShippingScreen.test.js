import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ShippingScreen from "./ShippingScreen";

// Mocking the saveShippingAddress action
jest.mock("../redux/slices/cartSlice", () => ({
  saveShippingAddress: jest.fn(),
}));

const mockStore = configureStore([]);

describe("ShippingScreen", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        shippingAddress: {
          address: "",
          city: "",
          postalCode: "",
          country: "",
        },
      },
    });
  });

  test("renders shipping screen form", () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <ShippingScreen />
      </Provider>
    );

    expect(getByLabelText("Address")).toBeInTheDocument();
    expect(getByLabelText("City")).toBeInTheDocument();
    expect(getByLabelText("Postal Code")).toBeInTheDocument();
    expect(getByLabelText("Country")).toBeInTheDocument();
    expect(getByText("Continue")).toBeInTheDocument();
  });

  test("dispatches saveShippingAddress action on form submission", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ShippingScreen />
      </Provider>
    );

    fireEvent.click(getByText("Continue"));

    expect(saveShippingAddress).toHaveBeenCalled();
  });
});