import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Chart from 'chart.js/auto'
import { Doughnut,Line } from 'react-chartjs-2'
import { useSelector, useDispatch } from "react-redux";
import { getadminproduct } from "../../actions/productaction.js";
import { getallorders } from "../../actions/orderaction.js";
import Metdata from "../layout/Metdata.js";
import { getallusers } from "../../actions/useraction.js";
Chart.register();



const Dashboard = () => {

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state)=>state.allorders);
    const {users} = useSelector((state)=>state.allusers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

    useEffect(() => {
      dispatch(getadminproduct());
      dispatch(getallorders());
      dispatch(getallusers());
    }, [dispatch]);


    let totalAmount = 0;
    orders &&
      orders.forEach((item) => {
        totalAmount += item.totalprice;
      });
    
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, totalAmount],
          },
        ],
      };
    
      const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, products.length - outOfStock],
          },
        ],
      };

      
  return (
    <div className="dashboard">
      <Metdata title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
      <Typography component="h1">Dashboard</Typography>

<div className="dashboardSummary">
  <div>
    <p>
      Total Amount <br /> ₹{totalAmount}
    </p>
  </div>
  <div className="dashboardSummaryBox2">
    <Link to="/admin/products">
      <p>Product</p>
      <p>{products && products.length}</p>
    </Link>
    <Link to="/admin/orders">
      <p>Orders</p>
      <p>{orders && orders.length}</p>
    </Link>
    <Link to="/admin/users">
      <p>Users</p>
      <p>{users && users.length}</p>
    </Link>
  </div>
</div>

<div className="lineChart">
  <Line data={lineState} />
</div>

<div className="doughnutChart">
  <Doughnut data={doughnutState} />
</div>
      </div>
    </div>
  )
}

export default Dashboard