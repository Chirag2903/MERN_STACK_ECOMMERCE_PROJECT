import React, { Fragment ,useState} from 'react'
import {useNavigate} from "react-router-dom";
import "./Search.css";
import Metdata from '../layout/Metdata';

const Search = () => {

    const [keyword,setKeyword]=useState("");
    const navigate = useNavigate();

    const searchhandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }
        else{
            navigate("/products");
        }
    }

  return (
    <Fragment>
        <Metdata title="Search a Product--cS Ecommerce"/>
      
        <form className='searchbox' onSubmit={searchhandler}>
            <input type="text" placeholder='Search a Product ...' onChange={(e)=>setKeyword
            (e.target.value)}/>
            <input type="submit" value="Search"/>
        </form>

    </Fragment>
  )
}

export default  Search;