import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/slices/cartSlice";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

/**
 * The `ShippingScreen` component handles the shipping address form submission and saving
 * the address in a shopping cart application.
 * @returns {JSX.Element} The `ShippingScreen` component returns a JSX element that represents a shipping screen
 * form. The form includes input fields for the shipping address, city, postal code, and country. The
 * user can enter their shipping information and submit the form. Upon submission, the shipping address
 * details are saved using the `saveShippingAddress` action creator dispatched through Redux
 * `dispatch`. After saving the address, the user is redirected to the payments page.
 */
function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );

    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />

      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        {/* ... rest of your form code ... */}
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
