
/**
 * LoginScreen component for user login functionality.
 * @module LoginScreen
 * @param {Object} props - React component props.
 * @param {Object} props.location - The current location object.
 * @param {Object} props.history - The history object for navigation.

 * @returns {JSX.Element} - Rendered component.
 */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../redux/slices/userSlice";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

// Custom styles for the LoginScreen component.

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


/**
 * React functional component for user login.
 * @function
 * @param {Object} props - React component props.
 * @returns {JSX.Element} - Rendered component.
 */
function LoginScreen({ location, history }) {
  // Styles
  const classes = useStyles();

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux
  const dispatch = useDispatch();

  // Redirect path
  const redirect = location.search ? location.search.split("=")[1] : "/";

  // Redux state
  const userLogin = useSelector((state) => state.user);
  const { userDetails, loading, error } = userLogin;

  // useEffect to redirect on successful login

  useEffect(() => {
    if (userDetails) {
      history.replace(redirect);
    }
  }, [history, userDetails, redirect]);


  // Form submission handler
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(login(email, password));
  };

  // Component rendering

  return (
    <FormContainer>
      <Typography component="h1" style={{ fontWeight: "bold" }} variant="h5">
        Sign In
      </Typography>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <form className={classes.form} onSubmit={submitHandler}>
        <Grid container spacing={2}>

          {/* Email input */}
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

          {/* Password input */}
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

        {/* Submit button */}

        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>

        {/* Registration link */}
        <Grid container justifyContent="flex-start">
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
