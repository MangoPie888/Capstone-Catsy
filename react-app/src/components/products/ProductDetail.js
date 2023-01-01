import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom';
import {getProductDetail} from "../../store/products" 
import {Modal} from "../context/Modal"
import {productsInCart} from "../../store/cart"



const ProductDetail = () => {
    const dispatch = useDispatch()
    const {productId} = useParams()
    console.log("productId from frontend",productId)

    const [showModal, setShowModal] = useState(false)

    const product = useSelector(state => state.productDetail[productId])
    console.log("product",product)
    // console.log(product.productId)
    

    useEffect(()=>{
        console.log("useEffect productId", productId)
        dispatch(getProductDetail(productId))
    },[])


    // const handleCartButton =()=>{
    //    return(
    //     <div>
    //     <Modal>
    //         <p>Product added to the cart</p>
    //     </Modal>
    //     </div>
    //    ) 
    // }
    const addCartButton =(e)=>{
        setShowModal(true)
        dispatch(productsInCart(productId))


    }

    return (
        <div>
            {product && 
            <>
                <img src={product.img} alt="product"/>
                <p>{product.name}</p>
                <p>{product.description}</p>
            </>
            }
            <div>
                <label>Quantity
                <input required type='number' min={1} max={100} defaultValue={1} ></input>
                </label>
                <button onClick={addCartButton}>Add to cart</button>
                {showModal &&
            <Modal onClose={()=>{setShowModal(false)}}>
                <p>Added to cart</p>
                <button>Go to cart</button>
         </Modal>
          }
            </div>
        </div>
    )
}

export default ProductDetail
