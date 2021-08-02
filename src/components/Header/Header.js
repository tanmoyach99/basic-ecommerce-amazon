import React from "react";
import "./Header.css";
import amazonLogo from "../../images/amazon-logo.png";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../actions/useActions";

const Header = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  // console.log(userInfo);

  const signOutHandler = () => {
    dispatch(signOut());
  };

  return (
    <div className="header">
      <Link to="/home">
        <img src={amazonLogo} alt="" className="header-logo" />
      </Link>
      <div className="header-input">
        <input type="text" className="header-input-field" />
        <SearchIcon className="header-search-icon" />
      </div>
      <div className="header-nav">
        {userInfo ? (
          <div>
            <Link to="/">
              {" "}
              <div onClick={signOutHandler} className="nav-link">
                <span className="nav-line-one">hello, {userInfo.name}</span>
                <span className="nav-line-two">sign out</span>
              </div>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/signIn">
              <div className="nav-link">
                <span className="nav-line-one">hello guest,</span>
                <span className="nav-line-two">sign in</span>
              </div>
            </Link>
          </div>
        )}
        {userInfo && (
          <div>
            <Link to="/update">
              <div className="nav-link">
                <span className="nav-line-one">want to,</span>
                <span className="nav-line-two">update profile</span>
              </div>
            </Link>
          </div>
        )}
        <Link to="/orders">
          <div className="nav-link">
            <span className="nav-line-one">returns & </span>
            <span className="nav-line-two"> orders</span>
          </div>
        </Link>
        <Link to="/orderHistory">
          <div className="nav-link">
            <span className="nav-line-one">Order </span>
            <span className="nav-line-two"> History</span>
          </div>
        </Link>
        {userInfo ? (
          <div>
            <Link to="/checkout">
              <div className="nav-basket">
                <ShoppingBasketIcon></ShoppingBasketIcon>
                <span className="nav-line-two basket-count">
                  {" "}
                  {cartItems.length}
                </span>
              </div>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/signIn">
              <div className="nav-basket">
                <ShoppingBasketIcon></ShoppingBasketIcon>
                <span className="nav-line-two basket-count"> 0</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
