import {configureStore} from "@reduxjs/toolkit"
import folderReducer from "./slices/folderSlice"

const store = configureStore({
    reducer: {
        folder: folderReducer
    }
})

// console.log('oncreate store : ', store.getState())

store.subscribe(() => {
    // console.log('store changed : ', store.getState())
})

export default store