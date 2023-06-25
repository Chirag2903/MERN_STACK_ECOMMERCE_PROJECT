import {legacy_createStore as createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension" 
import { newproductreducer, newreviewreducer, productdetailsreducers, productreducers, productreviewssreducers, productsreducers, reviewreducer } from "./reducers/productreducers";
import {allusersreducers, forgotpasswordreducers, profilereducers, userdetailsreducers, userreducers} from "./reducers/userreducer";
import { cartreducers } from "./reducers/cartreducers";
import { allorderreducers, myorderreducers, neworderreducer, orderdetailsreducer, orderreducers } from "./reducers/orderreducers";

const reducer = combineReducers({
products :productsreducers,
productdetails: productdetailsreducers,
user:userreducers,
profile:profilereducers,
forgotpassword:forgotpasswordreducers,
cart:cartreducers,
neworder:neworderreducer,
myorder:myorderreducers,
orderdetails:orderdetailsreducer,
newreview:newreviewreducer,
newProduct:newproductreducer,
deleteandupdateproduct:productreducers,
allorders:allorderreducers,
deleteandupdateorders:orderreducers,
allusers:allusersreducers,
userdetails:userdetailsreducers,
productreviews:productreviewssreducers,
deletereview:reviewreducer
});

let initialstate ={
    cart: {
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],
          shippinginfo: localStorage.getItem("shippingInfo")
          ? JSON.parse(localStorage.getItem("shippingInfo"))
          : {},
      },
};

const middleware= [thunk];

const store = createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)));


export default  store;