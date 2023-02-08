import React from "react"
import {useLocation} from 'react-router-dom';
import { searchItems } from "../store/search";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./SearchResult.css"

const SearchResult = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()
    console.log("state",location.state)
    let searchContent = (location.state).toLowerCase()
    console.log("serachContent",searchContent)

useEffect(()=>{
    dispatch(searchItems(searchContent))
},[searchContent,dispatch])

const searchedItems = useSelector(state=>state.searchItems)
console.log("searchedItems",searchedItems)
const itemArray = Object.values(searchedItems)
console.log("itemArray",itemArray)

  return (
  <>
   <div className='home-container'>

<div className='products'>
  
  {itemArray && itemArray.map((product)=>{
      return(
        <>
        <Link key={product.id} className='Link' to = {`/products/${product.id}`}>
      <div className='product' >
        

          <img src={product.img} alt="product" 
            onError={e=>{e.currentTarget.src ='https://cdn.xxl.thumbs.canstockphoto.com/image-not-available-written-in-chalk-on-a-blackboard-stock-image_csp8317846.jpg'}}
          />
        
        
          {/* <h3>{product.name}</h3> */}
          <span className='price-span'>${product.price.toFixed(2)}</span>
        
      </div>
      
      </Link>
      </>
      )})}
      </div>
</div>
  </> 
  )
  
};

export default SearchResult;
