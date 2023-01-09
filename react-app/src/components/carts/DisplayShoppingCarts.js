import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditProductInCart, productsInCart } from '../../store/cart'
import { deleteProductInCart } from '../../store/cart'
import { Link, useHistory } from 'react-router-dom'
import UpdateCart from './UpdateCart'
import { removeCart } from '../../store/cart'
import { deleteAllProducts } from '../../store/cart'
import { getAllProducts } from '../../store/products'

import "./Cart.css"


const DisplayShoppingCarts = () => {
  const dispatch = useDispatch()
  const history = useHistory()


  const userId = useSelector(state=>state.session.user.id)
  console.log("userIdddddddd",userId)

  let [quantity, setQuantity] = useState()
  let [productId, setProductId] = useState()
  let [cart, setCart] = useState([])
  let [cartId, setCartId] = useState()

  useEffect(()=>{
    dispatch(productsInCart())

  },[quantity])



  const handlingDelete=(cartId)=>{
  
    // const cartId = e.target.id
    console.log("cartId",cartId)
      dispatch(deleteProductInCart(cartId))
      // dispatch(productsInCart())
  
  }

  const changeQuantity=async(e)=>{
    quantity = e.target.value
    cartId = e.target.id
    console.log("cartId from changeQuantity function", cartId)
    console.log("quantity from changeQuantity function", quantity)
    
    let res = await dispatch(EditProductInCart({quantity,cartId}))
    .then(dispatch(productsInCart()))
    
  }

  const checkout=()=>{
    history.push("/success")
    dispatch(deleteAllProducts())
  
  }

  const clearOut=()=>{
    dispatch(deleteAllProducts())
  
  }




  const products = useSelector(state=>state.carts)
  console.log("products",products)
  const proList = Object.values(products)
  const total1 = proList.reduce((totalPrice,pro)=>totalPrice + pro.product.price * pro.cart.quantity ,0)
  const total = total1.toFixed(2)
  console.log("product list",proList)

  return (
  
    <div className='cart-container' >
      <h2>Shopping Cart</h2>
      {proList.length === 0 && 
      <div className='cart-empty'>
        <p>Your cart is current empty</p>
        <div className='start-shopping'>
          <Link className='cart-empty-link' to={''}>
            <i class="fa-solid fa-arrow-left"></i>
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
      }

      {proList.length !==0 &&
      <div>
        <div className='titles'>
          <h3 className='product-title'>Product</h3>
          <h3 className='price'>Price</h3>
          <h3 className='quantity'>Quantity</h3>
          <h3 className='total'>Total</h3>
        </div>

        <div className='cart-items'>
          {proList.map((pro)=>
            <div className='cart-item' key={pro.cart.id}>
            
              <div className='cart-product'>
                <Link to={`/products/${pro.product.id}`}>
                <img src={pro.product.img} alt={pro.product.name}></img>
                </Link>
                <div>
                    <h3>{pro.product.name}</h3>
                    <p>{pro.product.description}</p>
                    <button onClick={()=>((handlingDelete(pro.cart.id)))}>Remove</button>
                </div>
              </div>
                <div className='cart-product-price'> ${pro.product.price}</div>
                
                    <UpdateCart pro={pro}/>
                {/* <input type='number' min={1} max={100}  defaultValue={pro.cart.quantity} id={pro.cart.id} key={pro.product.price} onChange={(e)=>{changeQuantity(e)}}></input> */}
                
                
                
                

            </div>)}
        </div>

        <div className='cart-summary'>
          <button onClick={clearOut} className='clear-cart'>Clear Cart</button>
          <div className='cart-checkout'>
            <div className='subtotal'>
              <span>subtotal</span>
              <span className='amount'>${total}</span>
            </div>
            <button id='checkoutBtn' onClick={checkout}>Check out</button>
            <div className='continue-shopping'>
              <Link to={''}>
              {/* <i class="fa-solid fa-arrow-left"></i> */}
              <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      
      </div>}
      
    </div>
  )
}

export default DisplayShoppingCarts
