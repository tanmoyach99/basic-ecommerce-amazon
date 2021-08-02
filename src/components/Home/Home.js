import React, { useState } from "react";
import "./Home.css";
// import Slider from "react-slick";
import Product from "../Product/Product";
import { useEffect } from "react";
// import axios from "axios";
import MessageBox from "../Loader/MessageBox";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
// import banner1 from "../../images/ecommerce-banner.jpg";
// import banner2 from "../../images/ecommerce-banner-2.jpg";

const Home = () => {
  const dispatch = useDispatch();
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const productList = useSelector((state) => state.productList);
  console.log(productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     setLoading(true);
    //     const { data } = await axios.get("api/products");
    //     setLoading(false);
    //     setProducts(data);
    //   } catch (err) {
    //     setError(err.message);
    //     setLoading(false);
    //   }
    // };
    // fetchData();
    dispatch(listProducts());
  }, []);

  return (
    <div className="home">
      <div className="home-container">
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
          className="home-image"
        />
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <div className="home-row row">
            {products.products?.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
