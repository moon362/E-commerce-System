// Import necessary modules and components from React, Material-UI, React Router, and Redux
/**
 * @module LoginScreen
 * @desc Functional component representing the Login Screen.
 * @param {Object} props - React props for the component.
 * @param {Object} props.location - Location object from React Router.
 * @param {Object} props.history - History object from React Router.
 * @returns {JSX.Element} - Rendered component.
 */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  login
} from "../redux/slices/userSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";


// Define styles using Material-UI makeStyles hook
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// Functional component for the Login Screen
function LoginScreen({ location, history }) {
  const classes = useStyles();

  // State variables to manage email, password, and Redux state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux: useDispatch to dispatch actions, useSelector to get state
  const dispatch = useDispatch();

  // Extracting user details, loading, and error from the Redux state
  const userLogin = useSelector((state) => state.user);
  const { userDetails, loading, error } = userLogin;

  // Extracting redirect path from the URL query parameters
  const redirect = location.search ? location.search.split("=")[1] : "/";

  // useEffect hook to redirect to the specified path once the user is logged in
  useEffect(() => {
    if (userDetails) {
      history.replace(redirect);
    }
  }, [history, userDetails, redirect]);

  // Event handler for form submission
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password)
    dispatch(login(email, password));
  };

  // JSX for the Login Screen
  return (
    <FormContainer>
      <Typography component="h1" style={{ fontWeight: "bold" }} variant="h5">
        Sign In
      </Typography>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <form className={classes.form} onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Text field for email input */}
            <TextField
              variant="filled"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            {/* Text field for password input */}
            <TextField
              variant="filled"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          Sign In
        </Button>
        <Grid container justify="flex-start">
          <Grid item>
            {/* Link to the registration page */}
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              variant="body2"
            >
              Register
            </Link>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  );
}

// Export the LoginScreen component as the default export
export default LoginScreen;
