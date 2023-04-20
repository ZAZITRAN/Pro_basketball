import Header from '../Components/Component-recyle/Header';
import React from 'react'
import {  Outlet } from 'react-router-dom';

function Product() {

    let pathName = window.location.pathname
    if(pathName==="/products"){
      window.location.href="/products/products-list"
    }
    

    return ( 
    <div className='products'>
        <Header pathName={pathName}/>
      
      
        <Outlet/>
    </div> );
}

export default Product;