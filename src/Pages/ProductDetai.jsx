
import {useParams,Link} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { getProductId } from '../Feature/productSlice';
import { getCart } from '../Feature/cartSlice';
import React, { useEffect } from "react"
import { Breadcrumb } from "antd";
import { numberWithCommas } from "../Feature/FuncionNumberWithComat";
import "./ProductDetail.scss"
import { addToCart } from "../Feature/cartSlice";
function ProductDetail() {

    let {product}=useSelector((state)=>state.products);
    let {cart}=useSelector((state)=>state.cart);
    let {id}=useParams()
    let dispatch=useDispatch()
    let fetchMount = true;
    useEffect(() => {
        if(fetchMount){
            dispatch(getProductId(Number(id)))
            dispatch(getCart())
        }
        return ()=>{
            fetchMount = false;
        }
    }, [])

   
    const add_To_Cart=()=>{  
      let cartItem={
        name:product.name,
        quantity:1,
        price:product.price,
        image:product.image,
        id:product.id,
        isChecker:false
      }
        const data={cart:cart, cartItem:cartItem}
         dispatch(addToCart(data))
        
    }
    return ( 
        <div className="product-detail">
        <Breadcrumb 
      items={[
        { title: <Link to="/products/products-list">Product </Link>},
        {   title: id }]}
      />
      <div className="product-title">
        <p className="title">Thông tin sản phẩm</p>
      </div>
      <div className="product-info">
        <div className="img">
          <img src={product.image} alt="" />
        </div>
        <div className="info">
            <p className="name"> {product.name}</p>
            <div className="sale">
                <p className="price"> VND {numberWithCommas((product.price*(100-product.discount)/100).toFixed(0))}</p>
                <p className="origin-price" style={product.discount===0 ? {display:"none"}:{display:"block"}}>  VND {numberWithCommas(+product.price)}</p>
                <div className="discount"style={product.discount===0 ? {display:"none"}:{display:"block"}}> 
                  <p>{product.discount}%</p>
                </div>
            </div>
            <button onClick={add_To_Cart}> Thêm vào giỏ hàng</button>
        <div>

          </div>
        </div>
      </div>
        </div>
     );
}

export default ProductDetail;