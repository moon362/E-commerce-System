import React from "react";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

/**
 * Styled component for displaying alert messages.
 *
 * @function StyledAlert
 * @param {Object} props - React component props.
 * @param {string} props.variant - The visual style of the alert (e.g., "success", "error").
 * @param {React.ReactNode} props.children - The content to be displayed within the alert.
 * @returns {React.ReactElement} The rendered styled `Alert` component.
 * @memberOf module:Message
 */
const StyledAlert = styled(MuiAlert)(({ theme, variant }) => ({
  backgroundColor: "grey",
  color: "white",
}));

/**
 * Functional component for displaying styled alert messages.
 *
 * @function Message
 * @param {Object} props - React component props.
 * @param {string} props.variant - The visual style of the alert (e.g., "success", "error").
 * @param {React.ReactNode} props.children - The content to be displayed within the alert.
 * @returns {React.ReactElement} The rendered `StyledAlert` component wrapped in the `Message` component.
 * @memberOf module:Message
 */
function Message({ variant, children }) {
  return (
    <StyledAlert variant={variant} severity={variant}>
      {children}
    </StyledAlert>
  );
}

export default Message;
