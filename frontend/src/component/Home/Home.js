import React, { Fragment ,useEffect} from 'react'
import {AiOutlineArrowDown } from "react-icons/ai";
import ProductCard from "./ProductCard.js";
import Metadata from "../layout/Metdata.js"
import "./Home.css";
import Loader from "../layout/Loader/Loader.js";
import {clearerrors, getproduct} from "../../actions/productaction.js";
import {useSelector,useDispatch} from "react-redux";
import {useAlert} from "react-alert";


const Home = () => {
  const alert=useAlert();
   const dispatch = useDispatch();
   const {loading,error,products, }= useSelector((state)=>state.products);

   //(As soon as component mount ho (i mean display ho component toh data rendering ke liye avaiable ho isliye useEffect)
   useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearerrors());
    }
     dispatch(getproduct());
   }, [dispatch,error,alert])
   

  return (
    <Fragment>
      {loading?<Loader/>:<Fragment>
    <Metadata title="cS Ecommerce"/>
    <div className="banner">
        <p>Welcome to cS Ecommerce</p>
          <h1>Find Amazing Product Below</h1>
         <a href='#container'>
            <button>
                Scroll <AiOutlineArrowDown />
            </button>
        </a>  
    </div>
    <h2 className="homeHeading">Featured Products</h2>
    <div className="container" id="container">

      {products && products.map((product) =><ProductCard product={product}/>)}
    </div>


   </Fragment>}
    </Fragment>
  )
   
  ;
}

export default Home

//8-100 product honge toh <Product product ={product} ye baar baar thode 100 baar thodi likhenge islie map use karo