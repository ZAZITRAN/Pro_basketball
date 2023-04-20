import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import "./Header.scss";
import { useSelector, useDispatch } from 'react-redux';
import {getProducts} from "../../Feature/productSlice"
 import { getCart } from '../../Feature/cartSlice'; 


const menuList=[
  {
    link:"/home",
    name:"TRANG CHỦ",
    color:"gray",
    borderBottom: "none"
  },
  {
    link:"/products",
    name:"SẢN PHẨM",
    color:"gray",
    borderBottom: "none"
  },
  {
    link:"/post",
    name:"BÀI VIẾT",
    color:"gray",
    borderBottom: "none"
  },
  {
    link:"/about",
    name:"VỀ CHÚNG TÔI",
    color:"gray",
    borderBottom: "none"
  }
]

const rightnavMenu=[
  {
    link:"/register",
    name:"ĐĂNG KÝ",
    color:"gray",
    borderBottom: "none"
  },
  {
    link:"/login",
    name:"ĐĂNG NHẬP",
    color:"gray",
    borderBottom: "none"
  }
]


function Header(props) {
  let dispatch=useDispatch()
  const {cart} = useSelector((state)=>state.cart)
 

  let fetchMount = true;
    useEffect(() => {
        if(fetchMount){
            dispatch(getProducts())
            dispatch(getCart())
        }
        return ()=>{
            fetchMount = false;
        }
    }, [])

/*  useEffect(()=>{
    axios.get("http://localhost:8000/product")
    .then(res=>{
      console.log(res.data);
      dispatch(products.actions.saveProducts(res.data))
    })
 },[]) */

  let {pathName}=props
 let pathNameList=pathName.split("/")


  function filterPathName (x){
  for (let i = 0; i <x.length; i++) {
    if(x[i].link===`/${pathNameList[1]}`){
     x[i].color="black"
     x[i].borderBottom="3px solid black"
    }else{
     x[i].color="gray"
     x[i].borderBottom="none"

    }
    
  }
}
filterPathName (menuList)
filterPathName (rightnavMenu)


 /*  let menuFindIndex= menuList.findIndex((e,i)=>e.link===pathName)
  menuList[menuFindIndex].color="black" */

  const [menuDisplay, setMenuDisplay]=useState("none")
  

  

  

  const showMenuBar=()=>{
    if(menuDisplay==="none"){
      setMenuDisplay("flex")
    }else{
      setMenuDisplay("none")
    }
  }
  return (
    <div className='header'>
      <div className='navbar'>
        <div className='icon-bar' onClick={showMenuBar} >
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Hamburger_icon.svg" alt="" />
        </div>
       

        <div className="logo">
          <Link to="/home">
            <img src="https://res.cloudinary.com/dhknvtaq2/image/upload/v1680706193/Bong-ro/logo_usn6nc.png" alt="" />
          </Link>
        </div>

        <div className='topnav' >
        <ul className="left-nav-media" style={{display:`${menuDisplay}`}} >
          {menuList.map((item,i)=>{
            return(
              <li key={i}><Link to={item.link} style={{color:`${item.color}`}}> {item.name}</Link></li>
            )
          })}
        </ul>
        <div className="left-nav" >
        {menuList.map((item,i)=>{
            return(
              <Link  key={i} to={item.link} style={{color:`${item.color}`, borderBottom:`${item.borderBottom}`}}> {item.name}</Link>
            )
          })}
        </div>
        <div className="rightnav-not-user">
          {rightnavMenu.map((item,i)=>{
            <Link  key={i} to={item.link} style={{color:`${item.color}`, borderBottom:`${item.borderBottom}`}}> {item.name}</Link>
          })}
         
        </div>

        <div className="rightnav-user" >
          <div className='cart' >
           <Link to={"/cart"} > <p style={pathNameList[1]==="cart" ? {borderBottom:"3px solid black"}:{borderBottom:"none"}}>🛒</p></Link>
            <div className='number-cart'>
              <p className='number'>{cart.length}</p>
            </div>           
          </div>
          <div className="user-img">
              <img className='user-icon' src="https://res.cloudinary.com/dhknvtaq2/image/upload/v1680766831/Bong-ro/666201_bllgb8.png" alt="" />
          </div>
          <p className='username'>userName</p>
        </div>

        </div>
      </div>
    

      
    </div>);
}

export default Header;