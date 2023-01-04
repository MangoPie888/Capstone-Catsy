import React from 'react'
import { Link } from 'react-router-dom'
import "./Future.css"

const Future = () => {
  return (
    <div className='future-container'>
      <p>This feature will come soon ...</p>
      <Link to={''}>Go back to shopping</Link>
    </div>
  )
}

export default Future
