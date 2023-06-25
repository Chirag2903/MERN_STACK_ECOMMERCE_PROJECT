import React, { Fragment, useState } from 'react';
import Carousel from "react-material-ui-carousel";
import "./Productdetails.css";
import { useDispatch,useSelector, } from 'react-redux';
import { clearerrors, getproductdetails, newReview } from '../../actions/productaction';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader"
import {useAlert} from "react-alert";
import Metdata from '../layout/Metdata';
import {addItemsToCart} from "../../actions/cartaction"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productconstants";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const {id}= useParams();
    const {product,loading,error} =useSelector((state)=>state.productdetails);

    const { success, error:reviewError } = useSelector((state) => state.newreview);

    const [quantity, setquantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");


    const increasequantity=()=>{
      if(product.Stock<=quantity) return;

      const qty=quantity+1;
      setquantity(qty);
    }

    const decreasequantity=()=>{
     if(1>=quantity) return;
      
      const qty=quantity-1;
      setquantity(qty);
    }

    const addToCartHandler =()=>{
      dispatch(addItemsToCart(id,quantity));
      alert.success("Item Added to Cart")
    }

    const submitReviewToggle = () => {
      open ? setOpen(false) : setOpen(true);
    };
  
    const reviewSubmitHandler = () => {
      const myForm = new FormData();
  
      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("productId", id);
  
      dispatch(newReview(myForm));
  
      setOpen(false);
    };

    useEffect(() => {
      if(error){
       alert.error(error);
       dispatch(clearerrors());
      }
      if (reviewError) {
        alert.error(reviewError);
        dispatch(clearerrors());
      }
  
      if (success) {
        alert.success("Review Submitted Successfully");
        dispatch({ type: NEW_REVIEW_RESET });
      }
      dispatch(getproductdetails(id))
    }, [dispatch,id,error,alert,reviewError,success])

    const options={
      size:"large",
      value:product.ratings,
      readOnly:true,
      precision:0.5
    };

  return (
    <Fragment>
      {loading?<Loader/>:(
        <Fragment>
          <Metdata title={`${product.name}--cS Ecommerce`}/>
        <div className="Productdetails">
           <div> 
              <Carousel>
                    {product.images &&
                      product.images.map((item, i) => (
                        <img className="CarouselImage" key={item.url} src={item.url}
                          alt={`${i} Slide`}/>
                      ))}
              </Carousel>
            </div>
            <div>
            <div className='detailsblock-1'>
              <h2>{product.name}</h2>
              <p>Product # {product._id}</p>
            </div>
            <div className='detailsblock-2'>
              <Rating {...options}/>
              <span className='detailsblock-2-span'>({product.numOfReviews} Reviews)</span>
            </div>
            <div className='detailsblock-3'>
              <h1>{`₹${product.price}`}</h1>
              <div className='detailsblock-3-1'>
                <div className='detailsblock-3-1-1'>
                    <button onClick={decreasequantity}>-</button>
                    <input readOnly value={quantity} type='number' />
                    <button onClick={increasequantity}>+</button>
                </div>
                <button  disabled={product.Stock<1?true:false}onClick={addToCartHandler}>ADD TO CART</button>
              </div>
              <p>
                Status:
                <b className={product.Stock<1 ?"redcolor" :"greencolor"}>
                 {product.Stock<1 ?"Outofstock" :" Instock"}
                </b>
              </p>
            </div>
            <div className='detailsblock-4'>
              Description : <p>{product.description}</p>
            </div>
            <button onClick={submitReviewToggle} className='submitreview'>Submit Review</button>
        </div>
        </div>
    
    
        <h3 className="reviewsheading">Reviews</h3>

        <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitdialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitdialogtextarea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
    
    {
      product.reviews && product.reviews[0]? (
        <div className='reviews'>
          {
            product.reviews && 
            product.reviews.map((review)=> <ReviewCard review={review}/>)
          }
    
        </div>
      ):
      (
        <p className='noreviews'>No Reviews Yet</p>
      )
    }
        </Fragment>
      )}
    </Fragment>
    
  )
}

export default ProductDetails