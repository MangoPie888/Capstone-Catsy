import React,{useState} from 'react'
import { addReview } from '../../store/review';
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';


import "./Review.css"

const Review = (props) => {
  const dispatch = useDispatch() 
  const history = useHistory()
  const [rating, setRating] = useState(0);
  const [review,setReview] = useState('');

  const productId = props.productId
  console.log("productId",productId)
  console.log("img from review", props.img)
  console.log("productName", props.productName)
  console.log("rating",rating)
  console.log("review-content", review)
  const img = props.img
  const name = props.productName


  
  const handleReview=(e)=>{
  // e.preventDefault()
  console.log('got here')
    
  dispatch(addReview({productId, img, rating,review}))
  history.push('/myreviews')
  


  }



  return (
    <div className='review-main-div'>

      <p className='review-title'>How do you like this product?</p>

      
      <div className='review-pic-name'>
      <img className='review-img' src={img} alt="product-img"/>
      <p>{name}</p>
      </div>
      
      <form onSubmit={handleReview} >
      
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
        <textarea minLength="5" maxLength="1000" name="review_content" id="content" cols="30" rows="10" placeholder='Share your experience here (5 to 1000 characters)' onChange={(e)=> setReview(e.target.value)}></textarea>
      </div>

      <div className='review-btn-div'>
      <button className='review-submitbtn' type='submit'>Submit Review</button>
      </div>

    </form>  
    </div>
  )
}

export default Review
