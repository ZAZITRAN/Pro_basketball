
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";


export const getCart = createAsyncThunk(
    "cart/getCart",
    async (thunkAPI) => {
        const res = await axios.get("http://localhost:8000/cart")
        return res.data
    }
)
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (data, { dispatch }) => {
        let { cart, cartItem } = data
        console.log("cartItem", cartItem);
        console.log("cart", cart);

        let findIndex = cart.findIndex(e => e.id == cartItem.id)
        console.log(findIndex);
        if (findIndex === -1) {
            const response = await axios.post("http://localhost:8000/cart", cartItem)

                .then(res => {
                    console.log(res.data);
                    return res.data
                })
                .catch(err => {
                    console.log(err);
                    alert("Error")
                })

            return response
        } else {
            const data={ ...cart[findIndex], quantity: cart[findIndex].quantity + 1, isChecker: true }
            console.log(data);
            const response = await axios.put(`http://localhost:8000/cart/${cartItem.id}`,data
                )
                .then(res => {
                    return res.data
                })
                .catch(err => {
                    console.log(err);
                    alert("Error")
                })
            return response
        }

    }
)

export const increase =createAsyncThunk(
    "cart/increase",
    async (item, { dispatch }) => {
        console.log(item);
        const response = await axios.put(`http://localhost:8000/cart/${item.id}`, { ...item, quantity: item.quantity+1})

        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            alert("Error")
        })

    return response
    }
)
export const decrease =createAsyncThunk(
    "cart/decrease",
    async (item, { dispatch }) => {
        console.log(item);
        const response = await axios.put(`http://localhost:8000/cart/${item.id}`, { ...item, quantity: item.quantity-1})

        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            alert("Error")
        })

    return response
    }
)
export const remove =createAsyncThunk(
    "cart/remove",
    async (id, { dispatch }) => {
    console.log(id);
        const response = await axios.delete(`http://localhost:8000/cart/${id}`)

        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
            alert("Error")
        })

    return response
    }
)
/* export const removeCheckAll=createAsyncThunk(
    "cart/checkAll",
    
    async(cart,{dispatch})=>{
        console.log(1);
            const users=[]
            const promises=[]
            for (let i = 0; i < cart.length; i++) {
               
                promises.push(
                  await axios.put(`http://localhost:8000/cart/`,
                        {
                            id: cart[i].id,
                            quantity: cart[i].quantity,
                            name: cart[i].name,
                            exportPrice: cart[i].exportPrice,
                            isChecker: false,
                            image:cart[i].image,
                            price:cart[i].price
                        })
                        .then(response => {
                            // do something with response
                            users.push(response.data);

                        })
                        .catch(err => {
                            console.log(err);
                            
                        })
                )
            }
            Promise.all(promises).then(() => {console.log(users);});
        }
            
        
    
)

 */

const cartReducer = createSlice(

    {
        name: "cart",
        initialState: {
            value: [],
            loading: false,
            cart: [],
            
        },
        reducers: {

           /*  increase: (state,action)=>{
                const {cart, item}= action.payload
                console.log(cart);
                let findIndex=cart.findIndex(index=> index.id===item.id)
                cart[findIndex]={...item, quantity: item.quantity+1}
                state.cart=cart
            }, */
            checkBox:(state,action)=>{

                state.cart=action.payload 
            },
           checkAll:(state,action) =>{
               state.cart=action.payload
            }
            /*  'add-to-card':(sates)=> {
                 console.log(sates);
             } */
            /*   addToCart: (state,action)=>{
                  let checkExist = state.value.findIndex((item)=> item.id===action.payload.id)
                  
                  if(checkExist===-1){
                      let data={
                          ...action.payload,quantity:1, isChecked:true
          
                      }
                       state.value = [...state.value,data]
                  }else{
                      state.value[checkExist].quantity+=1
                  }
              }, */
        },
        extraReducers: {

            //getCart from API
            [getCart.pending]: (state) => {
                state.loading = true
            },
            [getCart.fulfilled]: (state, { payload }) => {
                state.loading = false
                state.cart = payload
            },
            [getCart.rejected]: (state) => {
                state.loading = false
            },

            //addTocart
            [addToCart.fulfilled]: (state, { payload }) => {
                console.log('aaaaaa', payload);
                let index = state.cart.findIndex(e => e.id === payload.id)
                if (index === -1) {
                    state.cart.push(payload)
                } else {
                    state.cart[index].quantity += 1
                }
            },
            [increase.fulfilled]:(state,{payload}) =>{
                let index = state.cart.findIndex(e => e.id === payload.id)
                state.cart[index].quantity += 1
            },
            [decrease.fulfilled]:(state,{payload}) =>{
                let index = state.cart.findIndex(e => e.id === payload.id)
                state.cart[index].quantity -= 1
            },
            [remove.fulfilled]:(state,{payload}) =>{
                console.log(payload);
                let index = state.cart.findIndex(e => e.id === payload.id)
                console.log(index);
                state.cart.splice(index, 1)
            }
           /*  [removeCheckAll.fulfilled] : (state,{payload})=>{
                for(i=0;i<state.cart.length;i++){
                    state.cart[i].isChecker=false
                }
            } */
        }
    }
)
const { reducer, actions } = cartReducer
console.log(actions);
export default cartReducer;