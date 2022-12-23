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
    <div className='product-container'>
        {productList && productList.map((product)=>{
            return(
        
            <div className='product-div' key={product.id}>
              <Link to = {`/products/${product.id}`}>
                <img src={product.img} alt="product" />
                {/* <p>{product.name}</p> */}
                <p>{product.price}</p>
              </Link>
            </div>

            )})}
      <p>hello</p>
    </div>
  )
}

export default AllProducts
