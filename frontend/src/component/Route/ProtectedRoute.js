import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({Component}, isadmin) => {
  const { loading, isauthenticated ,user} = useSelector((state) => state.user);

  if (loading === false) {
    if (isauthenticated===false) {
      return <Navigate to="/login" />;
    }
    if(isadmin===true && user.role!=="admin"){
      return <Navigate to="/login" />;
    }

    return <Component/> ;
  }
   
  return <Loader/>;

        
     
};

export default ProtectedRoute;
