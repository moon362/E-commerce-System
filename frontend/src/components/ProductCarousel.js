import React, { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { fetchTopRatedProducts } from "../redux/slices/productSlice";

/**
 * Functional component representing a carousel of top-rated products.
 * @component
 * @returns {JSX.Element} ProductCarousel component
 */
function ProductCarousel() {
  const dispatch = useDispatch();
  // Selecting top-rated products state from Redux store
  const topRatedProducts = useSelector(
    (state) => state.product.topRatedProducts
  );
  const { error, loading, products } = topRatedProducts;

  // Fetch top-rated products when the component mounts
  useEffect(() => {
    dispatch(fetchTopRatedProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    // Display carousel with top-rated products
    <Carousel
      style={{ height: "300px" }}
      pause="hover"
      className="bg-dark"
      interval={5000}
    >
      {products.map((product) => (
        // Carousel item for each top-rated product
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            {/* Product image */}
            <Image
              src={product.image}
              style={{ height: "250px", width: "250px" }}
              alt={product.name}
            />
            {/* Product caption */}
            <Carousel.Caption className="carousel-caption">
              <h4>
                {product.name} (₹{product.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
