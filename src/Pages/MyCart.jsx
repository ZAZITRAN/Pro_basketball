import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, ConfigProvider, List } from 'antd';
import { numberWithCommas } from '../Feature/FuncionNumberWithComat';
import { Link } from 'react-router-dom';
import cartReducer from '../Feature/cartSlice';
import { increase, decrease, remove} from "../Feature/cartSlice";

import "./MyCart.scss"

const Checkbox = ({ id, type, name, handleClick, isChecked }) => {
    return (
        <input
            style={{ fontSize: "20px" }}
            id={id}
            name={name}
            type={type}
            onChange={handleClick}
            checked={isChecked}
        />
    );
};
function MyCart() {



    let { cart } = useSelector((state) => state.cart)
    let state=useSelector((state) => state)
    console.log(state);
    let dispatch = useDispatch()

    const [isCheckAll, setIsCheckAll] = useState(false)

    const handleSelectAll = e => {
        let newCart=[]
        if(isCheckAll===false){
            setIsCheckAll(true)
            for (let i = 0; i < cart.length; i++) {
                newCart.push(
                 { 
                     name:cart[i].name,
                     quantity:cart[i].quantity,
                     price:cart[i].price,
                     image:cart[i].image,
                     id:cart[i].id,
                     isChecker: true
                 }
                )
             }
        }else{    
            setIsCheckAll(false)
            for (let i = 0; i < cart.length; i++) {
               newCart.push(
                { 
                    name:cart[i].name,
                    quantity:cart[i].quantity,
                    price:cart[i].price,
                    image:cart[i].image,
                    id:cart[i].id,
                    isChecker:false
                }
               )
            }
            console.log (66,newCart);
           
            
        }
        dispatch(cartReducer.actions.checkAll(newCart))

    };


    const handleClick = (item) => {
        let newCart=[...cart]
        let findIndex=newCart.findIndex(index=> index.id===item.id)
        console.log(newCart[findIndex].isChecker);
        if(newCart[findIndex].isChecker===true){
            newCart[findIndex]={
                ...item, isChecker:false
            }
        }else{
            newCart[findIndex]={
                ...item, isChecker:true
            }
        }
        
        dispatch(cartReducer.actions.checkBox(newCart))
    }
    const handleIncrease = (item) => {
        console.log(1111111);
       /*  let newCart=[...cart]
        let findIndex=newCart.findIndex(index=> index.id===item.id)
        newCart[findIndex]={
            ...item, quantity: item.quantity+1
        } */
        dispatch(increase(item))
    }

    const handleDecrease = (item) => {
        dispatch(decrease(item))

    }
    const  handleRemove = (id) => {
       dispatch(remove(id))
    }

    let totalPrice = 0
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].isChecker === true) {
            totalPrice += cart[i].quantity * cart[i].price
        }

    }
    console.log(totalPrice)

    return (

        <div className="cart">
            <Breadcrumb
            items={[{title: "Giỏ hàng"}]}/>
                <div className='cart-title'>
                    <p>Giỏ hàng</p>
                </div>
                <div className="cart-info">
                    <div className="cart-list">
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#8c8c8c',
                                },
                            }}
                        >
                            <div className="select-all">
                                <Checkbox
                                    type="checkbox"
                                    name="selectAll"
                                    id="selectAll"
                                    handleClick={handleSelectAll}
                                    isChecked={isCheckAll}
                                />
                                <p>Select All</p>
                            </div>


                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={{
                                    onChange: (page) => {
                                        console.log(page);
                                    },
                                    pageSize: 3,
                                }}
                                dataSource={cart}

                                renderItem={(item, index) => (
                                    <List.Item  >
                                        <div className="product-cart">
                                            <Checkbox
                                                key={item.id}
                                                type="checkbox"
                                                name={item.name}
                                                id={item.id}
                                                handleClick={() => handleClick(item)}
                                                isChecked={item.isChecker}

                                            />
                                            <div className="product-info">
                                                <div className="img-product">
                                                        <img src= {item.image} alt="" />
                                                </div>
                                                <div className="right-list">
                                                    <div className="bill-product">
                                                        <p className="name">{item.name}</p>
                                                        <p className="price"> VND {numberWithCommas(item.price)}</p>
                                                        <div className="quantity">
                                                            <button onClick={() => handleDecrease(item)} disabled={item.quantity === 0 ? true : false} className="img-decrease">
                                                                <img src="https://res.cloudinary.com/dhknvtaq2/image/upload/v1681921027/Bong-ro/-_sfeq2q.png" alt="" />
                                                            </button>

                                                            <p>{item.quantity}</p>
                                                            <button onClick={() => handleIncrease(item)} className="img-increase">
                                                                <img src="https://res.cloudinary.com/dhknvtaq2/image/upload/v1681921039/Bong-ro/yoqqtq5awc2bufnhhjiv.png" alt="" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div onClick={() => { handleRemove(item.id) }} className="remove">
                                                        <img src="https://res.cloudinary.com/dhknvtaq2/image/upload/v1681921492/Bong-ro/pngwing.com_n7nnnm.png" alt="" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </ConfigProvider>

                    </div>
                    <div className="pay-box">
                        <div className="summary-box">
                            <p className="summary">Thanh toán</p>
                            <div className="total-box">
                                <p className="text">Tổng cộng   </p>
                                <p className='price'> {numberWithCommas(totalPrice)}</p>
                            </div>
                            <button>Thanh toán</button>
                            <p className="continue">Tiếp tục mua sắm</p>
                        </div>
                    </div>
                    <div className='pay-box-media'>
                        <div className="pay-center">
                            <div className='summary-box'>
                                <p className="summary">Thanh toán</p>
                                <div className="total-box">
                                    <p className="text">Tổng</p>
                                    <p className='price'> {numberWithCommas(totalPrice)}</p>
                                </div>
                            </div>

                            <div className='pay-button'>
                                <button>Thanh toán</button>
                                <p className="continue">Tiếp tục mua sắm</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    );
}


export default MyCart;