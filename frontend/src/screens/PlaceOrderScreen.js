import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrderDetails } from "../redux/slices/orderSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { fetchUserDetails } from "../redux/slices/userSlice";

/**
 * React component for the place order screen.
 * @param {Object} props - React props.
 * @param {Object} props.history - History object for navigation.
 */
function PlaceOrderScreen({ history }) {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const { orderDetails, loading, error } = order;
  const cart = useSelector((state) => state.cart);

  // PRICE CALCULATIONS
  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.082 * itemsPrice).toFixed(2));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  /**
   * Data object containing order details.
   * @type {Object}
   * @property {Array} orderItems - List of items in the order.
   * @property {Object} shippingAddress - Shipping address details.
   * @property {string} paymentMethod - Chosen payment method.
   * @property {string} itemsPrice - Total price of items.
   * @property {string} shippingPrice - Shipping cost.
   * @property {string} taxPrice - Tax amount.
   * @property {string} totalPrice - Total order price.
   */
  const orderData = {
    orderItems: cart.cartItems,
    shippingAddress: cart.shippingAddress,
    paymentMethod: cart.paymentMethod,
    itemsPrice: itemsPrice.toFixed(2).toString(),
    shippingPrice: shippingPrice.toFixed(2).toString(),
    taxPrice: taxPrice.toFixed(2).toString(),
    totalPrice: totalPrice.toString(),
  };

  /**
   * Function to place an order.
   */
  const placeOrder = () => {
    dispatch(createOrder(orderData))
      .then(() => {
        setTimeout(() => {
          console.log(orderDetails);
          history.push(`/orderDetail`);
        }, 1000); // Delay of 1 second (1000 milliseconds)
      })
      .catch((error) => {
        // Handle any error that occurred during order creation
      });
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            {/* ... other list group items */}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              {/* ... other list group items */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
