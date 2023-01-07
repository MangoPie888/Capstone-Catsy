import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { EditProductInCart, productsInCart } from '../../store/cart'


const UpdateCart = ({pro}) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(pro.cart.quantity)
    console.log(quantity)
    const [cartId, setCartId] = useState(pro.cart.id)
    console.log("cartId",cartId)

useEffect(()=>{
    console.log("cartId from useEffect", cartId)
    dispatch(EditProductInCart({cartId,quantity}))

},[quantity])

    return (
        <>
        <div className='update-cart-container'>
            <select name="quantity" onChange={(e)=>setQuantity(e.target.value)}
            value={quantity} 
            >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            </select>

            
            
            
        
        </div>

        <div className='cart-product-total-price'>
                  <p id='total-price'>${(pro.product.price * quantity).toFixed(2)}</p>
                </div> 
   
        </>
    )
}

export default UpdateCart
