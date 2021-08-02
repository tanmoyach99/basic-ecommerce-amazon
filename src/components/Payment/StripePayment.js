import React, { useEffect, useMemo, useState } from "react";

import {
  useStripe,
  useElements,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { detailsOrder, payOrder } from "../../actions/orderAction";
import { ORDER_PAY_RESET } from "../../constants/orderConstant";
import { useHistory } from "react-router-dom";

const StripePayment = ({ successPaymentHandler }) => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const { id } = useParams();
  const history = useHistory();

  const orderId = id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { error, order, loading } = orderDetails;

  //   const useOptions = () => {
  //     const options = useMemo(
  //       () => ({
  //         style: {
  //           base: {
  //             color: "#424770",
  //             letterSpacing: "0.025em",
  //             fontFamily: "Source Code Pro, monospace",
  //             "::placeholder": {
  //               color: "#aab7c4",
  //             },
  //           },
  //           invalid: {
  //             color: "#9e2146",
  //           },
  //         },
  //       }),
  //       []
  //     );

  //     return options;
  //   };

  //   const options = useOptions();
  const processPayment = async (paymentId) => {
    const orderDetails = {
      order,
      paymentId,
    };
    console.log(orderDetails);
    let res;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      res = await Axios.post(`/api/orders/${order._id}/pay`, order, config);
      // setClientSecret(res.data.clientSecret);
      console.log(res);
    } catch (error) {
      console.log("error");
    }
  };

  const [paymentError, setPaymentError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!order || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else {
    }
  }, [order, orderId, dispatch]);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const refreshPage = () => {
      window.location.reload();
    };

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });
    // const { paymentMethod, error } = await stripe.confirmCardPayment({
    //   type: "card",
    //   card: elements.getElement(CardNumberElement),
    //   // payment_method: {
    //   //   card: elements.getElement(CardNumberElement),
    //   //   billing_details: {
    //   //     name: "Jenny Rosen",
    //   //   },
    //   // },
    // });

    if (error) {
      console.log(error);
      setPaymentError(error.message);
      setSuccess(null);
    } else {
      setSuccess(paymentMethod);
      processPayment(paymentMethod.id);
      successPaymentHandler(paymentMethod);
      setPaymentError(null);
      refreshPage();
      //   history.push("/");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={submitHandler}>
          <div className="mt-5">
            <label>
              Card number
              <CardNumberElement />
            </label>
          </div>
          <div className="mt-5">
            <label>
              Expiration date
              <CardExpiryElement />
            </label>
          </div>
          <div className="mt-5">
            <label>
              CVC
              <CardCvcElement />
            </label>
          </div>
          <button
            id="pay_btn"
            type="submit"
            disabled={!stripe}
            onSuccess={successPaymentHandler}
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default StripePayment;
