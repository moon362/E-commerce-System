import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

/**
 * @component
 * @description CheckoutSteps component displays navigation steps for the checkout process.
 * @param {Object} props - React component props.
 * @param {boolean} props.step1 - Indicates whether Step 1 (Login) is completed.
 * @param {boolean} props.step2 - Indicates whether Step 2 (Shipping) is completed.
 * @param {boolean} props.step3 - Indicates whether Step 3 (Place Order) is completed.
 * @returns {JSX.Element} - React component
 */
const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    color: theme.palette.grey[600],
    textDecoration: "none",
  },
  activeLink: {
    color: theme.palette.primary.main,
  },
}));

function CheckoutSteps({ step1, step2, step3 }) {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {/* Step 1: Login */}
      <Link
        to="/login"
        className={`${classes.link} ${step1 ? classes.activeLink : ""}`}
      >
        {step1 ? "Login" : "Login (Incomplete)"}
      </Link>

      {/* Step 2: Shipping */}
      <Link
        to="/shipping"
        className={`${classes.link} ${step2 ? classes.activeLink : ""}`}
      >
        {step2 ? "Shipping" : "Shipping (Incomplete)"}
      </Link>

      {/* Step 3: Place Order */}
      <Typography
        color={step3 ? "textPrimary" : "textSecondary"}
        className={`${classes.link} ${step3 ? classes.activeLink : ""}`}
      >
        {step3 ? "Place Order" : "Place Order (Incomplete)"}
      </Typography>
    </Breadcrumbs>
  );
}

export default CheckoutSteps;
