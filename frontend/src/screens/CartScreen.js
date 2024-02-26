/**
 * @module CartScreen
 */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { removeFromCart } from "../redux/slices/cartSlice";

/**
 * CartScreen functional component.
 * @param {object} props - Component properties.
 * @param {object} props.history - History object from React Router.
 * @returns {JSX.Element} JSX element representing the CartScreen component.
 */
function CartScreen({ history }) {
  const dispatch = useDispatch();

  /**
   * Redux state for the cart.
   * @type {object}
   * @property {object[]} cartItems - Array of items in the cart.
   */
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  /**
   * Handles removing an item from the cart.
   * @param {string} id - ID of the item to be removed.
   * @returns {void}
   */
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  /**
   * Handles the checkout process.
   * Redirects to the login page with a redirect parameter set to "shipping".
   * @returns {void}
   */
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty. <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col m={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col>{item.qty}</Col>
                  <Col>₹{item.price}</Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              ₹
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <Button
              type="button"
              className="w-100"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
