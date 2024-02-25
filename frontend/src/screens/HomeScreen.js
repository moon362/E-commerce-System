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
<<<<<<< HEAD
function HomeScreen({ history }) {
=======

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
>>>>>>> c9fe780aa9b75363256b12c635467a429679cfc6
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  const topRatedProducts = useSelector((state) => state.product.topRatedProducts);

  const { products, loading, error, page, pages } = productList;
  const { pageNumber } = useParams()
  const { products: topProducts, loading: topLoading, error: topError } = topRatedProducts;
  console.log(productList)
  let keyword =
    history.location
      .search;
  console.log(keyword)
  useEffect(() => {
<<<<<<< HEAD
    dispatch(fetchProductList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

=======
    dispatch(fetch_product_list(keyword, pageNumber)); // Dispatching action to fetch product list
  }, [dispatch, keyword, pageNumber]); // Dependencies for useEffect
>>>>>>> c9fe780aa9b75363256b12c635467a429679cfc6

  return (
    <div>
      {!keyword && (
        <>
          <div style={{ fontWeight: "bold", fontSize: "25px", color: "black", fontFamily: "MozAnimationDelay" }}>TOP-RATED PRODUCTS</div>
          <ProductCarousel />
        </>
      )}

      <div style={{ fontWeight: "bold", fontSize: "25px", color: "black", fontFamily: "MozAnimationDelay" }}>LATEST PRODUCTS</div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
      <Paginate page={page} pages={pages} keyword={keyword} />
    </div>
  );
}

<<<<<<< HEAD

export default HomeScreen;


//  <Paginate page={page} pages={pages} keyword={keyword} />  
=======
export default home_screen; // Exporting HomeScreen component
>>>>>>> c9fe780aa9b75363256b12c635467a429679cfc6
