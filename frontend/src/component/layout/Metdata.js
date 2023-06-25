import React from 'react'
import { Helmet } from 'react-helmet'; 

const Metdata = ({title}) => {
  return (
    <Helmet>
        <title>{title}</title>
    </Helmet>
  )
}

export default Metdata