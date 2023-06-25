import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import Metdata from "../layout/Metdata";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";


const ConfirmOrder = () => {

    const { shippinginfo, cartItems } = useSelector((state) => state.cart);

    const { user } = useSelector((state) => state.user);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
    
      const shippingprice = subtotal > 1000 ? 0 : 100;
    
      const taxprice = subtotal * 0.18;
    
      const totalprice = subtotal + taxprice + shippingprice;
    
      const address = `${shippinginfo.address}, ${shippinginfo.city}, ${shippinginfo.state}, ${shippinginfo.pincode}, ${shippinginfo.country}`;
    
      const navigate = useNavigate();

      const proceedToPayment = () => {
        const data = {
          subtotal,
          shippingprice,
          taxprice,
          totalprice,
        };
    
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
    
        navigate("/process/payment");
      };


  return (
    <Fragment>
      <Metdata title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippinginfo.phonenumber}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingprice}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{taxprice}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalprice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ConfirmOrder