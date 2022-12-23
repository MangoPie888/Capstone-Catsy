import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom';
import {getProductDetail} from "../../store/products" 

const ProductDetail = () => {
    const dispatch = useDispatch()
    const {productId} = useParams()
    console.log("productId from frontend",productId)

    const product = useSelector(state => state.productDetail[productId])
    console.log("product",product)
    // console.log(product.productId)
    

    useEffect(()=>{
        console.log("useEffect productId", productId)
        dispatch(getProductDetail(productId))
    },[])

    return (
        <div>
            {product && 
            <>
                <img src={product.img} alt="product"/>
                <p>{product.name}</p>
                <p>{product.description}</p>
            </>
            }
        </div>
    )
}

export default ProductDetail
