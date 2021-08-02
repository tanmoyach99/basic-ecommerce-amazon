import React, { useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../Loader/MessageBox";
import Loader from "../Loader/Loader";
import { detailsProduct } from "../../actions/productActions";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}));

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const productId = id;
  const history = useHistory();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, products } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  // console.log(products);

  // const product = products?.find((pd) => pd._id === productId);

  const classes = useStyles();
  const [qty, setQty] = useState(1);

  const cartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div>
      <Link to="/">Back To Home </Link>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="row m-5">
          <div className="col-md-6">
            <img className="me-2" src={products?.product?.image} alt="" />
          </div>
          <div className="col-md-3 ">
            <div className="text-center">
              <h1 className="text-center">{products?.product?.name}</h1>

              <div className="d-flex align-items-center justify-content-center">
                <div className={classes.root}>
                  <Rating
                    name="half-rating-read"
                    precision={0.5}
                    value={products?.rating}
                  />
                  {products?.product?.numReviews} review
                </div>
              </div>

              <h5>
                price: <strong>${products?.product?.price}</strong>{" "}
              </h5>

              <p>{products?.description}</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className=" card card-body align-items-center justify-content-center">
              <div>
                <div className="text-center">
                  <div>
                    Price:{" "}
                    <span className="p-5"> ${products?.product?.price}</span>{" "}
                  </div>
                </div>
                <div>
                  <div className="mt-2">
                    {" "}
                    Status:{" "}
                    {products?.product?.countInStock > 0 ? (
                      <span className="text-primary p-5">In Stock</span>
                    ) : (
                      <span className="text-danger p-5">Unavailable </span>
                    )}
                  </div>
                </div>
              </div>
              {products?.product?.countInStock > 0 && (
                <>
                  <div className="mt-2">
                    Qty:
                    <span className="p-5">
                      {" "}
                      <select
                        name={qty}
                        id=""
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(products?.product?.countInStock).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}{" "}
                            </option>
                          )
                        )}
                      </select>{" "}
                    </span>
                  </div>
                  <button
                    onClick={cartHandler}
                    className="btn btn-warning mt-2"
                  >
                    {" "}
                    ADD TO CART
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
