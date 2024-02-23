import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { payOrder } from "../redux/slices/orderSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";

/**
 * React component representing the Order Screen.
 * @component
 * @param {Object} history - The history object provided by React Router.
 * @returns {JSX.Element} - Rendered component.
 */
function OrderScreen({ history }) {
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);

  // Fetch relevant parts of state from the Redux store using useSelector
  const order = useSelector((state) => state.order);
  const { orderDetails, error, loading } = order;

  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;

  /**
   * Calculate the total price of each individual item.
   * @returns {number} - Total price of all items.
   */
  const calculateItemsPrice = () => {
    if (orderDetails.orderItems && orderDetails.orderItems.length > 0) {
      return orderDetails.orderItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price) * item.qty;
        return total + itemPrice;
      }, 0);
    }
    return 0;
  };

  // Call the calculateItemsPrice method to get the total price
  const itemsPrice = calculateItemsPrice();

  /**
   * Add PayPal script dynamically to the document.
   */
  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AYgflmsaM7ccNLPlKUiufIyw8-spOE4UuS5XyyTCvhzheA-1EUcZF9qGlgXBZaSKcP5BY0zTc9WgINKe";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    // If the user is not logged in, redirect to the login page
    if (!userDetails) {
      history.push("/login");
    } else if (!orderDetails.isPaid) {
      // Activate PayPal scripts
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderDetails, history, userDetails]);

  /**
   * Success handler for PayPal payment.
   * @param {Object} paymentResult - PayPal payment result.
   */
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderDetails._id, paymentResult));
    console.log(orderDetails._id);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {orderDetails._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {/* Shipping Details */}
            <ListGroup.Item>
              <h2>Shipping</h2>
              {/* Display shipping information */}
            </ListGroup.Item>

            {/* Payment Details */}
            <ListGroup.Item>
              <h2>Payment</h2>
              {/* Display payment method and status */}
            </ListGroup.Item>

            {/* Order Items */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {/* Display ordered items */}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Order Summary */}
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              {/* Products Cost */}
              <ListGroup.Item>
                <Row>
                  <Col>Products Cost:</Col>
                  <Col>₹{itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              {/* Shipping Cost */}
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>₹{orderDetails.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              {/* Tax Cost */}
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>₹{orderDetails.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              {/* Total Cost */}
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>₹{orderDetails.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {/* PayPal Payment Button */}
              {!orderDetails.isPaid && (
                <ListGroup.Item>
                  {loading && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={orderDetails.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
