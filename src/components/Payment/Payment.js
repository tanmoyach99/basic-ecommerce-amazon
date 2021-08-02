import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { savePaymentMethod } from "../../actions/cartAction";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeOrder");
  };

  return (
    <div className="d-flex align-items-center justify-content-center mt-5 p-5">
      <form action="" className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment</h1>
        </div>
        <div>
          <input
            type="radio"
            name="paymentMethod"
            id="paypal"
            value="paypal"
            required
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="paypal"> Paypal</label>
        </div>
        <div>
          <input
            type="radio"
            name="paymentMethod"
            id="stripe"
            value="stripe"
            required
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="stripe"> Stripe</label>
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default Payment;
