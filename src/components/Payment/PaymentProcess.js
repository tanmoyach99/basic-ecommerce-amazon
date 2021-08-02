import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePayment from "./StripePayment";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { detailsOrder, payOrder } from "../../actions/orderAction";
import { useParams } from "react-router-dom";

const PaymentProcess = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();
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
  console.log(stripeApiKey);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  return (
    <div>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <StripePayment
            successPaymentHandler={successPaymentHandler}
          ></StripePayment>
        </Elements>
      )}
    </div>
  );
};

export default PaymentProcess;
