import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * Module for displaying loading spinners.
 *
 * @module Loader
 */

/**
 * Functional component for displaying a loading spinner.
 *
 * @function Loader
 * @returns {React.ReactElement} The rendered `Loader` component, displaying a circular loading spinner.
 * @memberOf module:Loader
 */
function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size={100} />
    </div>
  );
}

export default Loader;
