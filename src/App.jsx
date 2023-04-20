import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Homepage';
import Login from './Pages/Login';
import Product from './Pages/Products';
import Register from './Pages/Register';
import ProductDetail from './Pages/ProductDetai';
import ProductList from './Pages/ProductList';
import Cart from './Pages/Cart';
import MyCart from './Pages/MyCart';
import Payment from './Pages/Payment';



function App() {
  if(window.location.pathname==="/"){
    window.location.href="/home"
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/products' element={<Product />}>
          <Route path='products-list' element={<ProductList />}></Route>
          <Route path='product-detail/:id' element={<ProductDetail />}></Route>
        </Route>
        <Route path='/cart' element={<Cart/>}>
          <Route path='mycart' element={<MyCart/>}></Route>
          <Route path='payment' element={<Payment />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

