import React, { useState } from 'react'
import { useEffect } from 'react'
import { displayAllPurchases } from '../../store/purchase'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {Modal} from '../context/Modal'
import Review from '../reviews/Review'

import "./MyOrder.css"


const MyOrder = () => {
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    let [productId, setProductId] = useState()
    let [img, setImg] = useState("")
    let [productName, setProductName] = useState("")
    

    useEffect(()=>{
        let data = dispatch(displayAllPurchases())
        console.log("data from myorder", data)
        
    },[dispatch])

    const myPurchases = useSelector(state=> state.purchases)
    console.log("mypurchases", myPurchases)

    const myPurchasesList = Object.values(myPurchases)

    
    const handleReview=(e)=>{
      console.log("purchaseeeeeee",e.target.value)
      let infoArray = e.target.value
      console.log("info",infoArray.split(","))
      let array = infoArray.split(",")
      console.log("array[1]",array[1])
      let array1 = array[1]
      setImg(array1)
      console.log("img",img)
      setProductName(array[0])
      console.log("name",productName)
      console.log("e.target.id", e.target.id)
      setProductId(e.target.id)
      console.log("productIdddddddd",productId)
      setOpenModal(true)
        
    }

  return (
    <div className='main-container'>
      <p className='title'>Your Orders</p>

      {myPurchasesList.length && myPurchasesList.map((purchase=>{
        return(
          <div className='item-main-div'>
        <div className='info-price'>
          <div className='shop-price'>
            <p>Purchased on {purchase.purchase_time}</p><p>$ {purchase.price}</p>
          </div>
        </div>

        <div className='name-picture'>
          <img src={purchase.img} alt="purchased item photo" />
          <p>{purchase.name}</p>
        </div>

        <div className='review-div'>
          <button id={purchase.id} value={[purchase.name, purchase.img]} className='reviewBtn' onClick={handleReview}>Review this product</button>
          {openModal &&
            <Modal onClose={()=>{setOpenModal(false)}} >
              <Review productId={productId} img={img} productName={productName}/>
            </Modal>
          }  
        </div>

        

      </div>
        )
      }))
      }
      

    </div>
  )
}

export default MyOrder
