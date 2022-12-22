import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../store/products'

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
    <div>
        {productList && productList.map((product)=>{
            return(
            <div>
                <img src={product.img} />
                <p>{product.name}</p>
                <p>{product.description}</p>

            </div>)})}
      <p>hello</p>
    </div>
  )
}

export default AllProducts
