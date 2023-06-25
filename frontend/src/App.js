import './App.css';
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Header from './component/layout/Header/Header.js';
import WebFont from 'webfontloader';
import {useState,useEffect} from "react";
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignup from './component/User/LoginSignup';
import store from "./store";
import { loaduser } from './actions/useraction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdatePassword from "./component/User/UpdatePassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import Payment from "./component/Cart/Payment.js"
import Success from "./component/Cart/Success.js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js"
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js"
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from "./component/Admin/UpdateProduct.js"
import OrderList from "./component/Admin/OrderList.js"
import ProcessOrder from "./component/Admin/ProcessOrder.js"
import UsersList from "./component/Admin/UsersList.js"
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js"
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About.js"
import NotFound from "./component/layout/NotFound/NotFound.js"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';


function App() {
  const {isauthenticated,user} = useSelector(state=>state.user);

  const [stripeApiKey, setstripeApiKey] = useState("");

  async function getstripeapikey(){

    const {data} = await axios.get("/api/v1/stripeapikey");

    setstripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>
{
  WebFont.load({
    google:{
      families:["Roboto","Droid Sans","Chilanka"]
    }
  })

  store.dispatch(loaduser());
  getstripeapikey();
},[]);

window.addEventListener("contextmenu",(e)=>e.preventDefault());
  return (
  <Router> 
    <Header/>
    {isauthenticated && <UserOptions user={user}/>}
    <Routes>
    <Route  exact path="/" Component={Home}/> 
    <Route  exact path="/product/:id" Component={ProductDetails} />
    <Route  exact path="/products" Component={Products} />
    <Route  path="/products/:keyword" Component={Products} />
    <Route  exact path="/search" Component={Search} />
    <Route exact path="/account"  element={<ProtectedRoute Component={Profile}/>} />
    <Route exact path="/me/update"  element={<ProtectedRoute Component={UpdateProfile}/>} />
    <Route exact path="/password/update"  element={<ProtectedRoute Component={UpdatePassword}/>} />
    <Route exact path="/password/forgot"   Component={ForgotPassword} />
    <Route exact path="/password/reset/:token"   Component={ResetPassword} />
    <Route  exact path="/login" Component={LoginSignup} />
    <Route  exact path="/cart" Component={Cart} />
    <Route exact path="/login/shipping"  element={<ProtectedRoute Component={Shipping}/>} />
    <Route exact path="/order/confirm"  element={<ProtectedRoute Component={ConfirmOrder}/>} />
    {
      stripeApiKey &&(
        <Route exact path="/process/payment"element={<Elements stripe={loadStripe(stripeApiKey)}><ProtectedRoute Component={Payment} /></Elements>}/>
      )
    }
    <Route exact path="/success"  element={<ProtectedRoute Component={Success}/>} />
    <Route exact path="/orders"  element={<ProtectedRoute Component={MyOrders}/>} />
    <Route exact path="/order/:id"  element={<ProtectedRoute Component={OrderDetails}/>} />
    <Route exact path="/admin/dashboard"  element={<ProtectedRoute Component={Dashboard} isadmin={true}/>} />
    <Route exact path="/admin/products"  element={<ProtectedRoute Component={ProductList} isadmin={true}/>} />
    <Route exact path="/admin/product"  element={<ProtectedRoute Component={NewProduct} isadmin={true}/>} />
    <Route exact path="/admin/product/:id"  element={<ProtectedRoute Component={UpdateProduct} isadmin={true}/>} />
    <Route exact path="/admin/orders"  element={<ProtectedRoute Component={OrderList} isadmin={true}/>} />
    <Route exact path="/admin/order/:id"  element={<ProtectedRoute Component={ProcessOrder} isadmin={true}/>} />
    <Route exact path="/admin/users"  element={<ProtectedRoute Component={UsersList} isadmin={true}/>} />
    <Route exact path="/admin/user/:id"  element={<ProtectedRoute Component={UpdateUser} isadmin={true}/>} />
    <Route exact path="/admin/reviews"  element={<ProtectedRoute Component={ProductReviews} isadmin={true}/>} />
    <Route  exact path="/contact" Component={Contact}/> 
    <Route  exact path="/about" Component={About}/> 
    <Route path="*" Component={NotFound }/>
    </Routes>
    <Footer/>
  </Router>
  );

}

export default App;
