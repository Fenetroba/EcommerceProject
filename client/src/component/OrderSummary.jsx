import React, { useState } from "react";
import { useCartStore } from "../store/CartStore";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios.js";
import "../page/page Css/OrderSummary.css";
import pay from './assets/pay.png'
import { AiOutlineArrowLeft } from "react-icons/ai";
const stripePromise = loadStripe(
  "pk_test_51QTUjTFFNOCHTdBRPjbnj9w2S0M31iloeQpLW7sAtfc0XD1dMByxfpkNI45PjNGpoEpMAZDtkHQE8TVR78Uk625n00DKfuh8QS"
);
const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);
  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await axios.post("/payment/create-checkout-session", {
      products: cart,
    });

    const session = res.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Error:", result.error);
    }
  };

  return (
   
    <div className="card  payment_conteners" style={{width:"200px"}}>
      <div className="card-body">
        <h5 className="card-title">original price</h5>
        <p>{formattedTotal} Birr</p>
        <img src={pay} alt="pay" className="img-thumbnail " />
      </div>
      <ul className="list-group list-group-flush">
        <button onClick={handlePayment} className="paybutton" >Paying</button>
        <Link to="/">back to Home</Link>
      </ul>
    </div>
  );
};

export default OrderSummary;
