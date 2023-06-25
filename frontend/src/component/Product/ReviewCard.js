import React from 'react'
import profilePng from "../../images/Profile.png";
import { Rating } from "@material-ui/lab";


const ReviewCard = ({review}) => {
  const options={
    value:review.rating,
    readOnly:true,
    precision:0.5
  };
  return (
    <div className="reviewcard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options}/>
      <span className="reviewcardcomment">{review.comment}</span>
    </div>
  )
}

export default ReviewCard