import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import Rating from "./Rating";

/**
 * @component
 * @description Product component displays information about a product.
 * @param {Object} props - React component props.
 * @param {Object} props.product - The product object containing details like name, image, rating, numReviews, and price.
 * @returns {JSX.Element} - React component
 */
function Product({ product }) {
  return (
    <Paper sx={{ maxWidth: 345, margin: "5px" }}>
      <CardActionArea component={Link} to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          sx={{ objectFit: "contain", maxHeight: 140 }}
          image={product.image}
          alt={product.name}
        />
        <CardContent style={{ textAlign: "center" }}>
          {/* Product name */}
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>

          {/* Product rating */}
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', flexDirection: "column", alignItems: 'center' }} component="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color="#f8e825"
            />
          </Typography>

          {/* Product price */}
          <Typography variant="h6" component="div">
            ₹{product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Paper>
  );
}

export default Product;
