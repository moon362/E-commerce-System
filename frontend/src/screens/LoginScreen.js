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

/**
 * @component
 * @description LoginScreen component handles user login functionality.
 * @param {Object} props - React component props.
 * @param {Object} props.location - The location object containing information about the current URL.
 * @param {Object} props.history - The history object to navigate between pages.
 */
function LoginScreen({ location, history }) {
  // Styles for Material-UI components
  const classes = useStyles();

  // State hooks for managing form input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux hooks for dispatching actions and selecting data from the store
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { userDetails, loading, error } = userLogin;

  // Extracting redirect path from the URL or setting a default value
  const redirect = location.search ? location.search.split("=")[1] : "/";

  // Redirect the user to the specified path if userDetails are available
  useEffect(() => {
    if (userDetails) {
      history.replace(redirect);
    }
  }, [history, userDetails, redirect]);

  /**
   * @function
   * @description Handles the form submission.
   * @param {Object} e - The event object.
   */
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  // Render the component
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

export default LoginScreen;
