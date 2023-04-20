import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (thunkAPI) => {
        //call api
        const res = await axios.get('http://localhost:8000/product')
        return res.data
    }
)


export const getProductId = createAsyncThunk(
    'products/getProductId',
    async (productId, { dispatch }) => {
        
        const response = await axios.get(`http://localhost:8000/product/${productId}`)
        
        //dispatch(someOtherAction())
        return response.data; // will dispatch `fulfilled` action
       }
)



const products=createSlice(
    {
        name: "products",
        initialState:{
            value:[],
            loading:false,
            products:[],
            isFetchProductID:false,
            product:{}

        },
        reducers:{},        
        extraReducers: {

            //getAllProduct
            [getProducts.pending]: (state) => {
                state.loading = true
            },
            [getProducts.fulfilled]: (state, { payload }) => {
                state.loading = false
                state.products = payload
            },
            [getProducts.rejected]: (state) => {
                state.loading = false
            },

            //set get product Id
            [getProductId.pending]: (state) => {
                state.isFetchProductID = true
              },
              [getProductId.fulfilled]: (state, { payload }) => {
                state.isFetchProductID = false
                state.product = payload
              },
              [getProductId.rejected]: (state) => {
                state.isFetchProductID = false
              },
        }
        
    }
)
const {reducer, actions}=products
export default products