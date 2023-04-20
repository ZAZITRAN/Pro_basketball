import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Feature/cartSlice"
import products from "../Feature/productSlice"

/* import cartReducer from "../Feature/cartSlice"
export const store = configureStore(
    {
        reduce: {},
        cart: cartReducer
    }
); */
const rootReducer={
    cart: cartReducer.reducer,
    products: products.reducer
}
export const store= configureStore(
    {
        reducer:rootReducer
    }
)