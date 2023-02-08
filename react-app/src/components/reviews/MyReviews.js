import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {userReview} from '../../store/myreview'
import { useSelector } from 'react-redux'
import { deleteReview } from '../../store/myreview'
import { Modal } from '../context/Modal'
import EditReview from './EditReview'

import "./MyReview.css"

const MyReviews = () => {
    const dispatch = useDispatch()

    const [openModal, setOpenModal] = useState(false)
    const [content, setContent] = useState()
    const [productImg, setProductImg] = useState()
    const [rating, setRating] = useState()
    const [productName, setProductName] = useState()
    const [reviewId, setReviewId] = useState()
    const [reviewImg, setReviewImg] = useState()
    const [productId, setProductId] = useState()

    const myReviews = useSelector(state=>state.userReviews)
    console.log("myReviews frontend", myReviews)
    const reviewArray = Object.values(myReviews)
    console.log("reviewArray",reviewArray)

    useEffect(()=>{
        dispatch(userReview())
    },[])

    const handleDelete=(e)=>{
      const reviewId = e.target.id
      console.log("reviewId",e.target.id)
      dispatch(deleteReview(reviewId))

    }

    const handleEdit=(e) =>{
      setOpenModal(true)
      console.log("viewwwwwwwwwwww",e.target.value)
      let infoArray = e.target.value
      let array = infoArray.split(",")
      console.log("array",array)
      setContent(array[0])
      console.log("content",content)
      setProductImg(array[1])
      console.log("productimgggg",productImg)
      setRating(array[2])
      console.log("ratingddddd",rating)
      setProductName(array[3])
      console.log("productName",productName)
      setReviewId(e.target.id)
      console.log('reviewIddddd',reviewId)
      setReviewImg(array[4])
      setProductId(array[5])
    }

  return (
    <div className='myreview-container'>
      <h2 className='myreview-title'>My Reviews</h2>
      {reviewArray && reviewArray.map((review)=>{
        return(
          <>
          <div className='review_container'>
          <div className='img-picture-div'>
          <img src={review.product_img} />
          <p>{review.product_name}</p>
          </div>

          {/* <div className='rating-title'>
          
          
          </div> */}

          <div className='myreview-content-div'>
          <p>Rating: {review.rating}</p>
          <p className='rev-content1'>Review Content:</p>
          <p className='rev-content2'>{review.content}</p>
          </div>

          <div className='delete-edit-btn-div'>
          <button className='rev-edit-btn' id={review.id} value={[review.content,review.product_img,review.rating,review.product_name,review.image,review.product_id]} onClick={handleEdit}>Edit</button>
          {openModal &&
            <Modal onClose={()=>{setOpenModal(false)}} >
              <EditReview content={content} img={productImg} name={productName} rating={rating} reviewId={reviewId} reviewImg={reviewImg} productId={productId} />
            </Modal>
          }  
          <button className='rev-delete-btn' id={review.id} onClick={handleDelete}>Delete</button>
          </div>

          </div>
        </>)
      })}

    </div>

    
  )
}

export default MyReviews
