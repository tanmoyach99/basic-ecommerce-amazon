import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { detailsOrder, payOrder } from "../../actions/orderAction";
import Loader from "../Loader/Loader";
import MessageBox from "../Loader/MessageBox";
// import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePayment from "./StripePayment";

const Order = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();
  const orderPay = useSelector((state) => state.orderPay);
  const { id } = useParams();
  const orderId = id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { error, order, loading } = orderDetails;

  useEffect(() => {
    dispatch(detailsOrder(orderId));
    const getStripeApiKey = async () => {
      const { data } = await Axios.get("/api/config/stripe");
      setStripeApiKey(data);
    };
    getStripeApiKey();
  }, [dispatch, orderId]);

  
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  return loading ? (
    <Loader></Loader>
  ) : (
    <div>
      <h1> order {order?._id}</h1>
      <div className="row">
        <div className=" col-md-8">
          <div>
            <div className="card card-body">
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>
                {order?.shippingAddress.fullName} <br />
                <strong>Address:</strong>
                {order?.shippingAddress.address} ,{order?.shippingAddress.city}{" "}
                ,
                <br />
                {order?.shippingAddress.country} ,
                {order?.shippingAddress.postalCode} ,
              </p>
              {order?.isDelivered ? (
                <h6 className="text-success">
                  Delivered at {order.deliveredAt}
                </h6>
              ) : (
                <h6 className="text-danger">Not Delivered</h6>
              )}
            </div>
            <div className="card card-body">
              <h2>Payment</h2>
              <div>
                <p>
                  <strong>Payment Method:</strong>
                  {order?.paymentMethod}
                </p>
              </div>
              {order?.isPaid ? (
                <h6 className="text-success">paid at {order.paidAt}</h6>
              ) : (
                <h6 className="text-danger">Not Paid</h6>
              )}
            </div>
            <div className="card card-body">
              <h2>Order Items</h2>
              <div>
                {order?.orderItems.map((pd) => (
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
                <p className="col-md-5">${order?.itemsPrice}</p>
              </div>
              <div className="d-flex">
                {" "}
                <h6 className="col-md-5">Shipping Cost</h6>:{" "}
                <p className="col-md-5">${order?.shippingPrice}</p>
              </div>
              <div className="d-flex">
                {" "}
                <h6 className="col-md-5">Tax</h6>:{" "}
                <p className="col-md-5">${order?.taxPrice}</p>
              </div>
              <div className="d-flex">
                <h5 className="col-md-5">Order Total</h5>:{" "}
                <h6 className="col-md-5">${order?.totalPrice}</h6>
              </div>
            </div>
            <div>
              {!order.isPaid && (
                <div>
                  {stripeApiKey && (
                    <div>
                      <Elements stripe={loadStripe(stripeApiKey)}>
                        <StripePayment
                          successPaymentHandler={successPaymentHandler}
                        ></StripePayment>
                      </Elements>
                    </div>
                  )}
                </div>
              )}

              {/* {!order.isPaid && (
                <div>
                  {!sdkReady ? (
                    <Loader></Loader>
                  ) : (
                    <PayPalButton
                      amount={order?.totalPrice}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
                  )} */}
              {/* </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
