import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import { fetch_product_list } from "../redux/slices/productSlice";
import Paginate from "../components/Paginate";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

/**
 * The home_screen component is a React component that displays a list of products and a carousel of
 * top-rated products.
 * @returns The home_screen component is returning JSX elements, including conditional rendering for the
 * top-rated products carousel, a header for the top-rated products, the ProductCarousel component, a
 * header for the latest products, and a grid of products. It also includes conditional rendering for a
 * loader while products are loading, an error message if there's an error fetching products, and a
 * pagination component.
 */
function home_screen({ history }) {
  // Redux hooks
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  const topRatedProducts = useSelector((state) => state.product.topRatedProducts);

  // Destructuring product data from the Redux store
  const { products, loading, error, page, pages } = productList;
  const { pageNumber } = useParams(); // Getting page number from URL params

  // Fetch product list from the server
  useEffect(() => {
    dispatch(fetch_product_list(keyword, pageNumber)); // Dispatching action to fetch product list
  }, [dispatch, keyword, pageNumber]); // Dependencies for useEffect

  // Rendering JSX
  return (
    <div>
      {/* Conditional rendering for top-rated products carousel */}
      {!keyword && (
        <>
          {/* Header for top-rated products */}
          <div style={{ fontWeight: "bold", fontSize: "25px", color: "black", fontFamily: "MozAnimationDelay" }}>TOP-RATED PRODUCTS</div>
          <ProductCarousel /> {/* Render ProductCarousel component */}
        </>
      )}

      {/* Header for latest products */}
      <div style={{ fontWeight: "bold", fontSize: "25px", color: "black", fontFamily: "MozAnimationDelay" }}>LATEST PRODUCTS</div>
      {loading ? (
        <Loader /> // Showing loader while products are loading
      ) : error ? (
        <Message variant="danger">{error}</Message> // Showing error message if there's an error fetching products
      ) : (
        <div>
          {/* Displaying products in a grid */}
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} /> {/* Rendering Product component for each product */}
              </Col>
            ))}
          </Row>
        </div>
      )}
      <Paginate page={page} pages={pages} keyword={keyword} /> {/* Pagination component */}
    </div>
  );
}

export default home_screen; // Exporting HomeScreen component
