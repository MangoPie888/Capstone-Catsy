import React from 'react'
import { useEffect } from 'react'
import { displayAllPurchases } from '../../store/purchase'
import { useDispatch } from 'react-redux'


const MyOrder = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(displayAllPurchases())
    },[dispatch])

  return (
    <div>
      <p>This is my order page</p>
    </div>
  )
}

export default MyOrder
