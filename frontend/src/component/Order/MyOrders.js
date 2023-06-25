import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myorders } from "../../actions/orderaction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import Metdata from "../layout/Metdata";
import LaunchIcon from "@material-ui/icons/Launch";


const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    
    const { user } = useSelector((state) => state.user);
    const { loading, error, orders } = useSelector((state) => state.myorder);


    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 280, flex: 0.8 },
  
      {
        field: "status",
        headerName: "Status",
        minWidth: 150,
        flex: 0.5,
        cellClassName: (params) => {
          return params.getValue(params.id, "status") === "Delivered"
            ? "greencolor"
            : "redcolor";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 150,
        flex: 0.3,
      },
  
      {
        field: "amount",
        headerName: "Amount",
        type: "number",
        minWidth: 270,
        flex: 0.5,
      },
  
      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Link to={`/order/${params.getValue(params.id, "id")}`}>
              <LaunchIcon />
            </Link>
          );
        },
      },
    ];
//Ye params wale mein coulmn ke ander koi bhi value access kar sakte hia params.amount karta toh amount mil jata
      const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderitems.length,
        id: item._id,
        status: item.orderstatus,
        amount: item.totalprice,
      });
    });


    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      dispatch(myorders());
    }, [dispatch, alert, error]);

  return (
    <Fragment>
      <Metdata title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
          </Fragment>
      )}
    </Fragment>
  )
}

export default MyOrders