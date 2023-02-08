import React,{useState} from 'react'
import { addReview } from '../../store/review';
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';
import { editSingleReview } from '../../store/myreview';

import './EditReview.css'

const EditReview = (props) => {
    const dispatch = useDispatch() 
    const history = useHistory()
    const [rating, setRating] = useState(props.rating);
    const [review,setReview] = useState(props.content);
    
  
    // const content = props.content
    // console.log("content",content)
    console.log("img from review", props.img)
    console.log("productName", props.name)
    console.log("rating",props.rating)
    console.log("review-content", props.reviewId)
    let img = props.img
    let name = props.name
    let productId = props.productId
    let reviewImg = props.reviewImg
    let reviewId = props.reviewId   
  
  
    
    const handleEditReview=(e)=>{
    // e.preventDefault()
    console.log('got here')
    console.log("rating on handle function", rating)  
    dispatch(editSingleReview({reviewId,review,rating,productId,reviewImg}))
    // dispatch(addReview({productId, img, rating,review}))
    // history.push('/myreviews')
    
  
  
    }
  
  
  
    return (
      <div className='review-main-div'>
  
        <p className='review-title'>How do you like this product?</p>
  
        
        <div className='review-pic-name'>
        <img className='review-img' src={img} alt="product-img"/>
        <p>{name}</p>
        </div>
        
        <form onSubmit={handleEditReview}  >
        
        <div className="star-rating">
        {[...Array(5)].map((star,index) => {
          index +=1;        
          return (
            <button
            type='button'
            key={index}
            className ={index <= rating ? "on":"off"}
            onClick={()=>setRating(index)}>         
              <span className="star">&#9733;</span>  
            </button>    
          );
        })}
        </div>
  
        <div className='review-content-div'>
          <textarea minLength="5" name="review_content" id="content" cols="30" rows="10" onChange={(e)=> setReview(e.target.value)}>{review}</textarea>
        </div>
  
        <div className='review-btn-div'>
        <button className='review-submitbtn' type='submit'>Submit Review</button>
        </div>
  
      </form>  
      </div>
    )
  }

export default EditReview
