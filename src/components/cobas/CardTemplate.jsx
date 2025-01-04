import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice'

const CardTemplate = () => {
    // const [cart, setCart] = useState([])
    const [qty, setQty] = useState('')
    const dispacth = useDispatch()
    const cart = useSelector((state) => state.cart.data)


    const handleChange = (e) => {
        setQty(e.target.value)
    }



    return (
        <div>
            <p>Ini adalah data Cart</p>
            <div className='p-4 flex gap-4 ring-1 ring-sky-600 rounded-md w-fit'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>QTY</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        cart.length > 0 &&
                        cart.map((val, i) => {
                                return (
                                    <tr key={i}>
                                        <td>ID : {val.id}</td>
                                        <td>QTY : {val.qty}</td>
                                    </tr>
                                )
                            })
                    }
                    </tbody>
                </table>
                
            </div>
            <div className='p-4 flex gap-4 ring-1 ring-sky-600 rounded-md w-fit'>
                <div>
                    <p>Name</p>
                    <p>Baju Skena</p>
                </div>
                <div>
                    <p>Qty</p>
                    <input type='text' value={qty} onChange={handleChange} className='ring-1 ring-slate-200'/>
                </div>
                <div>
                    <button 
                        onClick={() => dispacth(addToCart({id:1, qty }))}
                        className='p-2 bg-blue-400 text-zinc-50'>
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardTemplate
