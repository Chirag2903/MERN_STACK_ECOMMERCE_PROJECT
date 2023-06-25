import React, { Fragment,useEffect, useState } from 'react'
import "./Products.css";
import { useDispatch,useSelector, } from 'react-redux';
import {clearerrors, getproduct} from "../../actions/productaction.js";
import Loader from "../layout/Loader/Loader.js";
import ProductCard from "../Home/ProductCard";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import {useAlert} from "react-alert";
import Metdata from '../layout/Metdata';


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

const Products = () => {

    const dispatch=useDispatch();
    const alert =useAlert();
    const {keyword}  = useParams();

    const [currentpage, setcurrentpage] = useState(1);
    const [price, setprice] = useState([0, 25000]);
    const [category, setcategory] = useState("");
    const [ratings, setratings] = useState(0);



   const {loading,error,products,productcount,resultperpage} = useSelector((state)=>state.products)


   const setCurrentPageNo =(e)=>{
    setcurrentpage(e);
   }
   const priceHandler = (event, newPrice) => {
    setprice(newPrice);
  };


  useEffect(() => {
    if(error){
        alert.error(error);
        dispatch(clearerrors());
    }
    dispatch(getproduct(keyword,currentpage,price,category,ratings));
  
  }, [dispatch,keyword,currentpage,price,category,ratings,alert, error]);
  


  return (
    <Fragment>
        {
            loading? <Loader/>:(
            <Fragment>
                <Metdata title="Products--cS Ecommerce"/>
                <h2 className='productsheading'>Products</h2>
                    <div className='products'>
                        {
                            products && products.map((product)=>
                            (
                                <ProductCard key={product._id} product={product}/>
                            ))
                        }
                    </div>

                    <div className="filterBox">

                       <Typography>Price</Typography>
                        <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                        />

                     <Typography>Categories</Typography>
                     <ul className="categoryBox">
                     {categories.map((category) => (
                     <li
                     className="category-link"
                       key={category}
                      onClick={() => setcategory(category)}
                     >
                      {category}
                      </li>
                       ))}
                     </ul>


                     <fieldset>
                      <Typography component="legend">Ratings Above</Typography>
                      <Slider
                      value={ratings}
                      onChange={(e, newRating) => {
                        setratings(newRating);
                      }}
                      aria-labelledby="continuous-slider"
                      valueLabelDisplay="auto"
                      min={0}
                      max={5}
                      />
                     </fieldset>


                    </div>

                    {
                        resultperpage<productcount && (
                          <div className='paginationBox'>
                        <Pagination
                         activePage={currentpage}
                         itemsCountPerPage={resultperpage}
                         totalItemsCount={productcount}
                         onChange={setCurrentPageNo}
                         nextPageText="Next"
                         prevPageText="Prev"
                         firstPageText="1st"
                         lastPageText="Last"
                         itemClass="page-item"
                         linkClass="page-link"
                         activeClass="pageItemActive"
                         activeLinkClass="pageLinkActive"
                        />
                    </div>
                        )
                    }
            </Fragment>
            )         
            
        }
    </Fragment>
  )
}

export default Products