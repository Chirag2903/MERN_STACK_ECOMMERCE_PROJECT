import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import Metdata from "../layout/Metdata";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderaction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";


const OrderDetails = () => {

    const dispatch= useDispatch();
    const alert = useAlert();
    const {id}= useParams();

    const {order,error, loading }= useSelector((state)=>state.orderdetails);

    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
    dispatch(getOrderDetails(id));
    }, [dispatch,alert,error,id])
    
  return (
    <Fragment>
        {
            loading?<Loader/>:(
                <Fragment>
          <Metdata title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippinginfo && order.shippinginfo.phonenumber}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippinginfo &&
                      `${order.shippinginfo.address}, ${order.shippinginfo.city}, ${order.shippinginfo.state}, ${order.shippinginfo.pincode}, ${order.shippinginfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentinfo &&
                      order.paymentinfo.status === "succeeded"
                        ? "greencolor"
                        : "redcolor"
                    }
                  >
                    {order.paymentinfo &&
                    order.paymentinfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalprice && order.totalprice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderstatus && order.orderstatus === "Delivered"
                        ? "greencolor"
                        : "redcolor"
                    }
                  >
                    {order.orderstatus && order.orderstatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderitems &&
                  order.orderitems.map((item) => (
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
        </Fragment>

            )
        }
    </Fragment>
  )
}

export default OrderDetails