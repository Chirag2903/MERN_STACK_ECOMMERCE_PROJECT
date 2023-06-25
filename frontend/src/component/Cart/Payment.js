import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import Metdata from "../layout/Metdata";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe,useElements,} from "@stripe/react-stripe-js";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import "./Payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {  clearErrors, createorder } from "../../actions/orderaction";

const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippinginfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.neworder);

    const paymentData = {
        amount: Math.round(orderInfo.totalprice * 100),
      };

      const order = {
        shippinginfo,
        orderitems: cartItems,
        itemsprice: orderInfo.subtotal,
        taxprice: orderInfo.taxprice,
        shippingprice: orderInfo.shippingprice,
        totalprice: orderInfo.totalprice,
      };

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;
    
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const { data } = await axios.post("/api/v1/payment/process",paymentData,config);
    
          const client_secret = data.client_secret;
    
          if (!stripe || !elements) return;
    
          const result = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
              card: elements.getElement(CardNumberElement),
              billing_details: {
                name: user.name,
                email: user.email,
                address: {
                  line1: shippinginfo.address,
                  city: shippinginfo.city,
                  state: shippinginfo.state,
                  postal_code: shippinginfo.pincode,
                  country: shippinginfo.country,
                },
              },
            },
          });
    
          if (result.error) {
            payBtn.current.disabled = false;
    
            alert.error(result.error.message);
          } 
          else {
            if (result.paymentIntent.status === "succeeded") {

                order.paymentinfo = {
                    id: result.paymentIntent.id,
                    status: result.paymentIntent.status,
                  };
        
              dispatch(createorder(order));
              navigate("/success");
            } 
            else {
              alert.error("There's some issue while processing payment ");
            }
          }
        } catch (error) {
          payBtn.current.disabled = false;
          alert.error(error.response.data.message);
        }
      };
    
    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
      }, [dispatch, error, alert]);
  return (
    <Fragment>
        <Metdata title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalprice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  )
}

export default Payment