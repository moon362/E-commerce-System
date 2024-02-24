import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, InputBase, IconButton } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

// Styles using Material-UI makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#fff",
    boxShadow: "0 0 3px 1px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: "1rem",
  },
  iconButton: {
    padding: theme.spacing(1),
    backgroundColor: "grey",
    color: "#fff",
    "&:hover": {
      backgroundColor: "black",
    },
  },
}));

/**
 * Functional component representing a search box.
 * @component
 * @returns {JSX.Element} SearchBox component
 */
function SearchBox() {
  const classes = useStyles();
  const [keyword, setKeyword] = useState(""); // State to hold the search keyword
  const history = useHistory();

  /**
   * Handles form submission to perform a search.
   * @param {object} e - The event object.
   * @returns {void}
   */
  const submitHandler = (e) => {
    e.preventDefault();
    // Redirect to the search results page with the specified keyword and page number
    history.push(`/?keyword=${keyword}&page=1`);
  };

  return (
    // Search box form
    <Box component="form" onSubmit={submitHandler} className={classes.root}>
      {/* Input field for entering the search keyword */}
      <InputBase
        placeholder="Search for products..."
        className={classes.input}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {/* Search button */}
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
}

export default SearchBox;
