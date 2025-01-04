// const {configureStore} = require('@reduxjs/toolkit')
// const cartReducer = require('./slices/cartSlice')
import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./slices/cartSlice"
import folderReducer from "./slices/folderSlice"

const store = configureStore({
    reducer: {
        cart: cartReducer,
        folder: folderReducer
    }
})

// console.log('oncreate store : ', store.getState())

store.subscribe(() => {
    // console.log('store changed : ', store.getState())
})

export default store