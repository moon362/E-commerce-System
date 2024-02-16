import React from "react";
import { Typography, Box } from "@material-ui/core";
import { Star, StarHalf, StarBorder } from "@material-ui/icons";

/**
 * @component
 * @description Rating component displays a star rating based on the provided value.
 * @param {Object} props - React component props.
 * @param {number} props.value - The rating value (should be between 0 and 5).
 * @param {string} props.text - Additional text to be displayed alongside the rating.
 * @param {string} props.color - The color of the stars.
 * @returns {JSX.Element} - React component
 */
function Rating({ value, text, color }) {
  return (
    <>
      <Box display="flex" alignItems="center">
        {/* Star icons for each rating level */}
        {[1, 2, 3, 4, 5].map((index) => (
          <Box key={index} mr={1}>
            {value >= index ? (
              <Star style={{ color }} fontSize="small" />
            ) : value >= index - 0.5 ? (
              <StarHalf style={{ color }} fontSize="small" />
            ) : (
              <StarBorder style={{ color }} fontSize="small" />
            )}
          </Box>
        ))}
      </Box>

      {/* Display additional text if provided */}
      <Typography variant="subtitle2" color="textSecondary">{text ? text : ""}</Typography>
    </>
  );
}

export default Rating;
