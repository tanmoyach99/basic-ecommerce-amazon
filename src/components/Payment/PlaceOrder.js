import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createOrder } from "../../actions/orderAction";
import { ORDER_CREATE_RESET } from "../../constants/orderConstant";
import Loader from "../Loader/Loader";
import MessageBox from "../Loader/MessageBox";

const PlaceOrder = () => {
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  console.log(orderCreate);
  const { loading, success, error, order } = orderCreate;
  //   console.log(orderCreate);
  //   console.log(order?.order?._id);

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  //   console.log(orderCreate);
  //   console.log(order?.order?._id);

  useEffect(() => {
    if (success) {
      history.push(`order/${order.order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, success, history]);
  //   console.log(orderCreate);
  //   console.log(order?.order?._id);

  return (
    <div>
      <div className="row">
        <div className=" col-md-8">
          <div>
            <div className="card card-body">
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>
                {cart.shippingAddress.fullName} <br />
                <strong>Address:</strong>
                {cart.shippingAddress.address} ,{cart.shippingAddress.city} ,
                <br />
                {cart.shippingAddress.country} ,
                {cart.shippingAddress.postalCode} ,
              </p>
            </div>
            <div className="card card-body">
              <h2>Payment</h2>
              <div>
                <p>
                  <strong>Payment Method:</strong>
                  {cart.paymentMethod}
                </p>
              </div>
            </div>
            <div className="card card-body">
              <h2>Order Items</h2>
              <div>
                {cart.cartItems.map((pd) => (
                  <div className="row mt-4">
                    <div className="col-md-3">
                      <img src={pd.image} alt="" style={{ height: "60px" }} />
                    </div>
                    <div className="col-md-5">
                      {" "}
                      <Link to={`/product/${pd.product}`}>{pd.name} </Link>{" "}
                    </div>

                    <div className="col-md-4">
                      $ {pd.price} X {pd.qty}= $ {pd.price * pd.qty}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-body">
            <h2>Order Summary</h2>
            <div className="row">
              <div className="d-flex">
                {" "}
                <h6 className="col-md-5">Items</h6>:{" "}
                <p className="col-md-5">${cart.itemsPrice}</p>
              </div>
              <div className="d-flex">
                {" "}
                <h6 className="col-md-5">Shipping Cost</h6>:{" "}
                <p className="col-md-5">${cart.shippingPrice}</p>
              </div>
              <div className="d-flex">
                {" "}
                <h6 className="col-md-5">Tax</h6>:{" "}
                <p className="col-md-5">${cart.taxPrice}</p>
              </div>
              <div className="d-flex">
                <h5 className="col-md-5">Order Total</h5>:{" "}
                <h6 className="col-md-5">${cart.totalPrice}</h6>
              </div>
            </div>
            <button
              type="button"
              onClick={placeOrderHandler}
              disabled={cart.cartItems.length === 0}
            >
              Place Order
            </button>
          </div>
          {loading && <Loader></Loader>}
          {error && <MessageBox></MessageBox>}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
