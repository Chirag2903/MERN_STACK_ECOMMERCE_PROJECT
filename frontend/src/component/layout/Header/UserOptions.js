import React, { Fragment, useState } from 'react';
import './Header.css';
import {SpeedDial,SpeedDialAction}  from '@material-ui/lab';
import DashboardIcon from "@material-ui/icons/Dashboard"
import { Backdrop } from '@material-ui/core';
import PersonIcon from "@material-ui/icons/Person"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExitToAppIcon  from "@material-ui/icons/ExitToApp";
import ListAltIcon  from "@material-ui/icons/ListAlt";
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/useraction';

const UserOptions = ({user}) => {

  const {cartItems} = useSelector((state)=>state.cart);

  const navigate= useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [open, setOpen] = useState(false);

  const options=[
    {icon:<ListAltIcon/>,name:"Orders",func:orders},
    {icon:<PersonIcon/>,name:"Profile",func:account},
    {icon:<ShoppingCartIcon  style={{color:cartItems.length>0?"#024cc6":"unset"}}/>,name:`Cart(${cartItems.length})`,func:cart},
    {icon:<ExitToAppIcon/>,name:"Logout",func:logoutuser}
  ]

  if(user.role==="admin"){
    options.unshift({icon:<DashboardIcon/>,name:"Dashboard",func:dashboard})
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }

  function logoutuser() {
    dispatch(logout());
    alert.success("Logout Successfully")
  }


  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{zIndex:"11"}}
        direction="down"
        className='speeddial'
        icon={
          <img
          className='speeddialicon'
          src={user.avatar.url ? user.avatar.url:"/Profile.png"}
          alt='Profile'
          />
        }>

        {
          options.map((items)=>(
            <SpeedDialAction key={items.name} icon={items.icon} tooltipTitle={items.name} onClick={items.func} tooltipOpen={window.innerWidth<=600?true :false}/>
          ))
        }
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
