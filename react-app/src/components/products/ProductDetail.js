import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom';
import {getProductDetail} from "../../store/products" 
import {Modal} from "../context/Modal"
import {productsInCart} from "../../store/cart"
import LoginForm from '../auth/LoginForm';
import { Link } from 'react-router-dom';
import { addProductInCart } from '../../store/cart';

import "./ProductDetail.css"

const ProductDetail = () => {
    const dispatch = useDispatch()
    const {productId} = useParams()
    console.log("productId from frontend",productId)

    const [quantity, setQuantity] = useState(1)
    console.log("quantity after create state",quantity)

    const [showModal, setShowModal] = useState(false)

    const sessionUser = useSelector(state=>state.session.user)
    const product = useSelector(state => state.productDetail[productId])
    console.log("product",product)

    const cartProducts = useSelector(state=>state.carts)
    console.log("cartProducts",cartProducts)
    // console.log(product.productId)
    


    useEffect(()=>{
        console.log("useEffect productId", productId)
        dispatch(getProductDetail(productId))
    },[])

    
 
    const addCartButton =(e)=>{
        e.preventDefault()

        console.log("productId before dispatch at frontend",productId)
        console.log("product quantity",quantity)
        dispatch(addProductInCart({productId, quantity}))
        dispatch(productsInCart())
        setShowModal(true)

        // dispatch(productsInCart(productId))


    }

    return (
        <div className='main-container'>
        <div className='product-detail-container'>
            
            {product && 
            <div className='detail-info'>
                
                
                <img className='product-detail-img' src={product.img} alt="product"/>
             


                <div className='text-info'>
                <p>Seller: {product.Owner.firstName}</p>
                <p>{product.name}</p>
                <p className='description'>Description:</p>
                <p className='detail-description'>{product.description}</p>
                <p className='price'>$ {product.price}</p>

                <form className='add-to-cart-form' onSubmit={addCartButton}>
                <input type='hidden' name='productId' value={productId} required></input>
                <label >Quantity</label>
                <input className='quantity-input' required type='number' name='quantity' min={1} max={100} value={quantity} onChange={(e)=>setQuantity(e.target.value)} ></input>
                
                <button className='add-to-cart-btn' type='submit'>Add to cart</button>
                </form>
                {showModal && sessionUser &&
                    <Modal onClose={()=>{setShowModal(false)}}>
                     <div className='pop-up-div'>
                        <img src={product.img} className='pop-up-modal-img'/>
                        <p className='product-name'>{product.name}</p>
                        <p> is added to your shopping cart</p>
                        <Link to={'/carts'}>
                        <button className='go-to-cart-btn'>Go to cart</button>
                        </Link>

                        <div className='continue-shopping-div'>
                        <i className="fa-solid fa-arrow-left"></i>
                        <Link className='continue-link' to={""} >continue shopping</Link>
                        </div>

                    </div>
                    </Modal>
                }

                {showModal && sessionUser === null && 
                    <Modal onClose={()=>{setShowModal(false)}}>
                        <LoginForm/>
                    </Modal>
                }
                </div>
            
            </div>
            }   
        </div>


        
        
                
        </div>
    )
}

export default ProductDetail
