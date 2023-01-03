import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../store/products'
import {Link} from 'react-router-dom'
import "./AllProducts.css" 

const AllProducts = () => {
    const dispatch = useDispatch()

    const products = useSelector((state)=>state.products)
    console.log("Alllllllllproducts at frontend", products)
    const productList = Object.values(products)
    console.log("produ Listtttttt",productList)
 useEffect(()=>{
    dispatch(getAllProducts())
 },[dispatch])

  return (
    <div className='home-container'>
    <div className='products'>
        {productList && productList.map((product)=>{
            return(
              <>
              <Link to = {`/products/${product.id}`}>
            <div className='product' key={product.id}>
              
             
                <img src={product.img} alt="product" />
              
              <div className='details'>
                {/* <h3>{product.name}</h3> */}
                <span>${product.price}</span>
              </div>
            </div>
            </Link>
            </>
            )})}
    </div>
    </div>
  )
}

export default AllProducts
