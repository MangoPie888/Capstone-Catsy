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


    const [quantity, setQuantity] = useState(1)
  

    const [showModal, setShowModal] = useState(false)

    const sessionUser = useSelector(state=>state.session.user)
    const product = useSelector(state => state.productDetail[productId])
 

    const cartProducts = useSelector(state=>state.carts)

    


    useEffect(()=>{
      
        dispatch(getProductDetail(productId))
    },[dispatch])

    
    const shoppingCarts = useSelector(state=>state.carts)

    const carts = Object.values(shoppingCarts)
   

    const isExist = carts.find(singleCart => singleCart.product.id == productId)
   
   
    const addCartButton =async(e)=>{
        e.preventDefault()
        if(!isExist){
         
            dispatch(addProductInCart({productId, quantity}))
            dispatch(productsInCart())}
            else{
                const totalQuantity = (Number(quantity)+isExist.cart.quantity)
               
                if(totalQuantity > 10) {
                    return alert("limited quantities for purchasing is 10 ")
            }
                else {
                dispatch(addProductInCart({productId, quantity}))
                dispatch(productsInCart())
            }
        }
        setShowModal(true)
    
        
        

        // dispatch(productsInCart(productId))


    }

    return (
        <div className='main-container'>
        <div className='product-detail-container'>
            
            {product && 
            <div className='detail-info'>
                
                
                <img className='product-detail-img' src={product.img} alt="product"
                    onError={e=>{e.currentTarget.src ='https://cdn.xxl.thumbs.canstockphoto.com/image-not-available-written-in-chalk-on-a-blackboard-stock-image_csp8317846.jpg'}}
                />
             


                <div className='text-info'>
                <p>Seller: {product.Owner.firstName}</p>
                <p>{product.name}</p>
                <p className='description'>Description:</p>
                <p className='detail-description'>{product.description}</p>
                <p className='price'>$ {product.price}</p>

            <form className='add-to-cart-form' > 
                <input type='hidden' name='productId' value={productId} required></input>
                <label >Quantity</label>
                <select className='quantity-input' name="quantity" onChange={(e)=>setQuantity(e.target.value)}
                value={quantity} 
            >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            </select>

                

            <button className='add-to-cart-btn' onClick={addCartButton}>Add to cart</button>
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
                        <LoginForm setShowModal={setShowModal}/>
                    </Modal>
                }

                </form>
                
                </div>
            
            </div>
            }   
        </div>


        
        
                
        </div>
    )
}

export default ProductDetail
