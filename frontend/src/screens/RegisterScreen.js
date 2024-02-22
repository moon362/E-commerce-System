// Import necessary modules and components from React, Material-UI, React Router, and Redux
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid, Typography, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/slices/userSlice";

import Message from "../components/Message";
import Loader from "../components/Loader";
/**
 * The code defines a functional component for a registration screen in a React application using
 * Material-UI styles and Redux for state management.
 * @returns The RegisterScreen component is being returned.
 */

// Define styles using Material-UI makeStyles hook
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// Functional component for the Register Screen
function RegisterScreen({ location, history }) {
  // Use the defined stylescd

  const classes = useStyles();

  // State variables for form input fields and error messages
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Redux: useDispatch to dispatch actions, useSelector to get state
  const dispatch = useDispatch();
  const { userDetails, loading, error } = useSelector((state) => state.user);

  // Extracting redirect path from the URL query parameters
  const redirect = location.search ? location.search.split("=")[1] : "/";

  // useEffect hook to redirect to the specified path once the user is registered
  useEffect(() => {
    if (userDetails) {
      history.push(redirect);
    }
  }, [history, userDetails, redirect]);

  // Event handler for form submission
  const submitHandler = (e) => {
    e.preventDefault();

    // Validate passwords match before dispatching the action
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(createUser(name, email, password));
    }
  };

  // JSX for the Register Screen
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" style={{ fontWeight: "bold" }} variant="h5">
          Register
        </Typography>

        {/* Display error and message components */}
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        {/* Form for user registration */}
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            {/* Text field for name input */}
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            {/* Text field for email input */}
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            {/* Text field for password input */}
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            {/* Text field for confirming password input */}
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>

          {/* Button for submitting the form */}
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>

          {/* Link to the login page */}
          <Grid container justifyContent="flex-start">
            <Grid item>
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                variant="body2"
              >
                Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

// Export the RegisterScreen component as the default export
export default RegisterScreen;
