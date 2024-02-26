import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../redux/slices/userSlice";
import { listMyOrders, getOrderDetails } from "../redux/slices/orderSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import CancelIcon from '@mui/icons-material/Cancel';

/**
 * @component
 * @description ProfileScreen component handles user profile and order details.
 * @param {Object} props - React component props.
 * @param {Object} props.history - The history object to navigate between pages.
 */
function ProfileScreen({ history }) {
  // State hooks for managing form input fields and messages
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Redux hooks for dispatching actions and selecting data from the store
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userDetails, loading, error } = user;
  const userData = {
    id: userDetails._id,
    name: name,
    email: email,
    password: password,
  };

  const order = useSelector((state) => state.order);
  const { listorder, loading: loadingOrders, error: errorOrders } = order;

  // Fetch user orders when the component mounts
  useEffect(() => {
    if (!userDetails) {
      history.push("/login");
    } else {
      dispatch(listMyOrders());
      setName(userDetails.name);
      setEmail(userDetails.username);
    }
  }, [dispatch, history, userDetails, error]);

  /**
   * @function
   * @description Handles the form submission for updating user information.
   * @param {Object} e - The event object.
   */
  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUser(userDetails.id, userData));
      setMessage("");
    }
  };

  /**
   * @function
   * @description Handles the deletion of the user account.
   */
  const handleDeleteUser = () => {
    dispatch(deleteUser(userDetails.id));
    history.push('/');
    window.location.reload(); // Reload the page
  };

  // Render the component
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          {/* Form input fields go here */}
          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </Form>
        <Button type="submit" variant="danger" className="mt-3" onClick={handleDeleteUser}>
          <div style={{ fontSize: "7px" }}><CancelIcon />  Account </div>
        </Button>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
        {/* Order details table goes here */}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
