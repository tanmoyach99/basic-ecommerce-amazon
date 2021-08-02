import React, { useState } from "react";
import "./Product.css";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}));

const Product = ({ product }) => {
  const classes = useStyles();
  const { image, name, price, _id, rating, numReviews, description } = product;

  return (
    <div className="col-md-3 mt-5 product">
      <Link to={"/product/" + _id}>
        <div className="card d-flex align-items-center ">
          <img
            src={image}
            className="card-img-top "
            alt="..."
            style={{ height: "300px", width: "180px" }}
          />

          <h5 className="card-title">{name}</h5>
          <p className="product-info card-text">{description}</p>
          <p className="card-text">${price}</p>

          <div className={classes.root}>
            <Rating name="half-rating-read" precision={0.5} value={rating} />
            {numReviews} review
          </div>
          {/* <button className="amazon-button mb-2">Buy Now</button> */}
        </div>
      </Link>
    </div>
  );
};

export default Product;
