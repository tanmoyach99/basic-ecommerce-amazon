import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import ProductDetails from "./components/Product/ProductDetails";
import Cart from "./components/Cart/Cart";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/SignIn/Register";
import Shipping from "./components/Shipping/Shipping";
import Payment from "./components/Payment/Payment";
import PlaceOrder from "./components/Payment/PlaceOrder";
import Order from "./components/Payment/Order";
import { useState } from "react";
import { useSelector } from "react-redux";
import PaymentProcess from "./components/Payment/PaymentProcess";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import Profile from "./components/SignIn/Profile";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/product/:id">
            <Header />
            <ProductDetails />
          </Route>
          <Route path="/cart/:id?">
            <Header />
            <Cart />
          </Route>
          <Route path="/checkout">
            <Header />
            <Cart />
          </Route>
          <Route path="/signIn">
            <Header />
            <SignIn />
          </Route>
          <Route path="/register">
            <Header />
            <Register />
          </Route>
          <Route path="/update">
            <Header />
            <Profile />
          </Route>
          <Route path="/shipping">
            <Header />
            <Shipping />
          </Route>
          <Route path="/payment">
            <Header />
            <Payment />
          </Route>
          {/* <Route path="/paymentProcess">
            <Header />
            <PaymentProcess />
          </Route> */}
          <Route path="/order/:id">
            <Header />
            <Order />
          </Route>
          <Route path="/placeOrder">
            <Header />
            <PlaceOrder />
          </Route>
          <Route path="/orderHistory">
            <Header />
            <OrderHistory />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
