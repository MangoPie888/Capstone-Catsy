import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditProductInCart, productsInCart } from '../../store/cart'
import { deleteProductInCart } from '../../store/cart'
import { Link } from 'react-router-dom'
import { decreseCart } from '../../store/cart'
import "./Cart.css"

const DisplayShoppingCarts = () => {
  const dispatch = useDispatch()

  let [quantity, setQuantity] = useState()
  let [productId, setProductId] = useState()
  let [cardId, setCardId] = useState()

  useEffect(()=>{
    dispatch(productsInCart())
  },[])


  const handlingDelete=(cartId)=>{
  
    // const cartId = e.target.id
    console.log("cartId",cartId)
      dispatch(deleteProductInCart(cartId))
      // dispatch(productsInCart())
  
  }

  const changeQuantity=(e)=>{
    quantity = e.target.value
    productId = e.target.id
 
    console.log("productId from changeQuantity function", productId)
    console.log("quantity from changeQuantity function", quantity)
  
    let submitBtn = document.getElementById("submitBtn")
    submitBtn.click()
    console.log("cardId",cardId)

  

  }

  const submitForm =(e) =>{
    console.log("hitted submitForm fucntion")
    e.preventDefault()
    cardId = e.target.id
    console.log("cartId from changeQuantity function", cardId)
    dispatch(EditProductInCart({productId,quantity,cardId}))
  }

  const handleDecreaseCart=(id)=>{
      dispatch(decreseCart(id))

  }
  const products = useSelector(state=>state.carts)
  console.log("products",products)
  const proList = Object.values(products)
  console.log("product list",proList)

  return (
  
    <div className='cart-container' >
      <h2>Shopping Cart</h2>
      {proList.length === 0 && 
      <div className='cart-empty'>
        <p>Your cart is current empty</p>
        <div className='start-shopping'>
          <Link to={''}>
            <i class="fa-solid fa-arrow-left"></i>
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
      }

      {proList &&
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
                <img src={pro.product.img} alt={pro.product.name}></img>
                <div>
                    <h3>{pro.product.name}</h3>
                    <p>{pro.product.description}</p>
                    <button onClick={()=>((handlingDelete(pro.cart.id)))}>Remove</button>
                </div>
              </div>
                <div className='cart-product-price'> ${pro.product.price}</div>
                <div className='cart-product-quantity'>
                  <button onClick={()=>{handleDecreaseCart(pro.cart.id)}}>-</button>
                  <div className='count'>{pro.cart.quantity}</div>
                  <button>+</button>
                </div>

                <div className='cart-product-total-price'>
                  ${pro.product.price * pro.cart.quantity}
                </div>

            </div>)}
        </div>

        <div className='cart-summary'>
          <button className='clear-cart'>Clear Cart</button>
          <div className='cart-checkout'>
            <div className='subtotal'>
              <span>subtotal</span>
              <span className='amount'>$11</span>
            </div>
            <button>Check out</button>
            <div className='continue-shopping'>
              <Link to={''}>
              <i class="fa-solid fa-arrow-left"></i>
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
