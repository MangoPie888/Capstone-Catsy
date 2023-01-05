import React from 'react'
import { Link } from 'react-router-dom'
import checkmark from '../../assets/checkmark.png'
import "./Checkout.css"

const Checkout = () => {
  return (
    <div className='checkout-div'>
      <img src={checkmark} alt="checkmark pic"/>
      <p>Your purchase is successful!</p>
      <Link to={""}>Go back to Shopping</Link>
    </div>
  )
}

export default Checkout
