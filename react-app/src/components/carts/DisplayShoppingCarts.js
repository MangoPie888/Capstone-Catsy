import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productsInCart } from '../../store/cart'

const DisplayShoppingCarts = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(productsInCart())
  },[])

  const products = useSelector(state=>state.carts)
  const proList = Object.values(products)
  console.log("product list",proList)

  return (
    <div>
      {proList && proList.map((pro)=><div><img src={pro.product.img}></img>
      <p>{pro.product.name}</p>
      <label>Quantity
      <input type='number' min={1} placeholder={pro.cart.quantity}></input>
      </label>
      <p>Price: ${pro.product.price}</p>
      <button>Remove</button>
      </div>) }
      <p>This is shopping cart page</p>


      <div>
        <button>Proceed to checkout</button>
      </div>
    </div>
  )
}

export default DisplayShoppingCarts
