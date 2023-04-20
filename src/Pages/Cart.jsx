import React from 'react'
import Header from '../Components/Component-recyle/Header';
import { Breadcrumb } from 'antd';
import { Outlet } from 'react-router-dom';

function Cart() {
    let pathName= window.location.pathname
    if(pathName==="/cart"){
        window.location.href="/cart/mycart"
    }
    return ( 
    <>
    <Header pathName={pathName}/>
    <Outlet/>
    </> );
}

export default Cart;