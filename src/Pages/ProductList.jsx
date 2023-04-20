
import React, {useEffect, useState, useRef} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import "./ProductList.scss"
import { Col,Row,Button,ConfigProvider,Breadcrumb} from 'antd';

import { numberWithCommas } from '../Feature/FuncionNumberWithComat';
import loc_xoa_dau from '../Feature/FunctionLocXoaDau';

import { addToCart } from '../Feature/cartSlice';
import { Link } from 'react-router-dom';


function ProductList() {
    let {products}=useSelector((state)=>state.products);
   
    const { cart } = useSelector((state) => state.cart)
    console.log(cart);
    let [productList,setProductList]=useState([])
    useEffect(()=>{
        setProductList(products)
    },[products])
    useEffect(()=>{
      
    },[])
    const searchInput=useRef()


    const dispatch=useDispatch()

    const add_To_Cart=(item)=>{
        console.log(item);
        let cartItem={
          name:item.name,
          quantity:1,
          price:item.price,
          image:item.image,
          id:item.id,
          isChecker:false
        }
          const data={cart:cart, cartItem:cartItem}
           dispatch(addToCart(data))
          
    }
   
     const search=()=>{
        console.log(1111,loc_xoa_dau(searchInput.current.value));
        console.log(products);
        let filterProducts=[]
      /*  let filterProducts= products.includes(index=>loc_xoa_dau(index.name).toLowerCase()===loc_xoa_dau(searchInput.current.value).toLowerCase()) */
            for (let i = 0; i< products.length; i++) {
               if(loc_xoa_dau(products[i].name).toLowerCase().includes(loc_xoa_dau(searchInput.current.value).toLowerCase())){
                filterProducts.push(products[i])
               }
            }
       setProductList(filterProducts)
     }
    /*  console.log(numberWithCommas(products[3].price)); */
    return ( 
         <div className='products-list'>
      <Breadcrumb 
      items={[{ title:`Product`}]}
      />
          
      <div className='product-title'>
          <div className='title'>
            <p>Danh sách sản phẩm</p>
          </div>
          <div className='filter-search'>
            <input ref={searchInput} placeholder='Tìm kiếm theo tên sản phẩm' type="text" />
            <button onClick={search}>Tìm kiếm</button>
          <div className="product-list">
          <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#8c8c8c',
                },
              }}
            >
              <Row>
                {productList.length > 0 && productList.map((item) => {
                  return (
                    <Col className='product' xxl={4} xl={6} lg={8} md={8} sm={12} xs={24} >
                      <div key={item.id} className='product-box'>
                        <img src={item.image} alt="" />
                        <Link to ={`/products/product-detail/${item.id}`}> <p className='name'> { numberWithCommas(item.name)}</p></Link>
                        <div className='footer-product'>
                         <p className='price'> Giá: {numberWithCommas(item.price)}</p><br />
                          <Button onClick={() => add_To_Cart(item)} type='primary'> Thêm vào giỏ hàng </Button>

                        </div>
                      </div>
                    </Col>)
                })}
              </Row>
            </ConfigProvider>
          </div> 
          </div>
        </div>
    </div>);
}

export default ProductList;