import React,{useState, useEffect} from 'react'
import Header from "../Components/Component-recyle/Header"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Autoplay, Pagination, Navigation } from "swiper";

import { Row,Col, ConfigProvider, Button, } from 'antd';

import "./Homepage.scss"

import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import {addToCart} from "../Feature/cartSlice"

import { numberWithCommas } from '../Feature/FuncionNumberWithComat';

const banner=[
    "https://res.cloudinary.com/dhknvtaq2/image/upload/v1681118523/Bong-ro/slideshow_5_f5uxoe.webp",
    "https://res.cloudinary.com/dhknvtaq2/image/upload/v1681118517/Bong-ro/slideshow_3_rmwjxh.webp",
    "https://res.cloudinary.com/dhknvtaq2/image/upload/v1681118501/Bong-ro/slideshow_4_kvav7p.webp",
    "https://res.cloudinary.com/dhknvtaq2/image/upload/v1681118494/Bong-ro/slideshow_7_au6dlk.webp"
]
function Homepage() {
    
    const [hotProduct, setHotProduct]= useState([])
    const { cart } = useSelector((state) => state.cart)
    console.log(cart);
   
    
    useEffect(()=>{
      axios.get("http://localhost:8000/hot-product")
      .then(res=>{
        setHotProduct(res.data)
      })
      .catch(err=>{
        console.log(err);
      })
    },[])

    const dispatch= useDispatch()
    const add_To_Cart=  (item)=>{
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

    let pathName = window.location.pathname
   

    return (
    <>
          

     <div className='home'>
     <Header pathName={pathName} />
            <div className='slider'>
            <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banner.map((item,i)=>{
            return(
        <SwiperSlide className='banner' >
            <img className='img-slice' key={i} src={item} alt="" />           
        </SwiperSlide>) 

        })}
       
      </Swiper>
            </div>
           <div className='hot-product'>
                <div className="title-hot">
                    <p>Bán chạy</p>
                </div>
                <div className='hot-list'> 
                <ConfigProvider
                   theme={{
                    token: {
                        colorPrimary: '#8c8c8c',
                    },
                }}
                >
                  <Row>
                    {hotProduct.map((item)=>{
                      return(
                      <Col className='product' xxl={4} xl={6} lg={8} md={8} sm={12} xs={24} >
                        <div  key={item.id} className='product-box'>
                            <img src={item.image} alt=""/>
                            <Link to ={`/products/product-detail/${item.id}`}> <p className='name'> { numberWithCommas(item.name)}</p></Link>
                            <div className='footer-product'>
                              <p className='price'> Giá: {numberWithCommas(item.price)}</p><br />
                              <Button onClick={()=>add_To_Cart(item)} type='primary'> Thêm vào giỏ hàng </Button>
                              
                            </div>
                        </div>
                      </Col>)
                    })}
                  </Row>
                </ConfigProvider>
                   
                </div>
           </div>
        </div>
    </>
       
        );
}

export default Homepage;