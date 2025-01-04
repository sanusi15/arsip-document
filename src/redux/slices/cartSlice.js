import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: [{
            id: 1, qty: 10
        }]
    },
    reducers: {
        addToCart: (state, action) => {
            // state.data.push(action.payload)
            state.data.fill(action.payload)
        }
    }
})

export const {addToCart} = cartSlice.actions
export default cartSlice.reducer