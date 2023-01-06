import React from 'react'
import { Link } from 'react-router-dom'
import "./Future.css"
import coding from '../assets/coding.png'

const Future = () => {
  return (
    <div className='future-container'>
      <img src={coding} />
      <p>This feature will come soon ...</p>
      <Link to={''}>Go back to shopping</Link>
    </div>
  )
}

export default Future
