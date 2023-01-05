import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateProductForm from "./CreateProductForm"
import { getUserProduct } from '../../store/products'
import { deleteProduct } from '../../store/products'
import "./UserProducts.css" 
import { Link } from 'react-router-dom'

const UserProducts = () => {
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getUserProduct())
    },[])

        const [productId, setProductId] =useState()

    const products = useSelector(state=>state.userProducts)
    // console.log("userProducts",products)
    const myProducts = Object.values(products)
    // console.log("myproductslist",myProducts)


    const handleDelete=(e)=>{
        e.preventDefault()
        console.log("buttonid",productId)
        
        dispatch(deleteProduct(productId))
    }


    const handleEdit=(e)=>{
        const productId = e.target.id
        



        
    }


    return (
        <>
        <div className='add-listing-link-div'>
            <Link className='Link-Link' to={'/products/new'}>
            + Add a listing
            </Link>
        </div>


        <div className='listing-container'>
        {/* <CreateProductForm /> */}
       
        {myProducts && 
            myProducts.map(product=>(
            
            <div key={product.id} className="my-product">

            <Link className='go-to-detail-link' to={`/products/${product.id}`}>
            <div className='go-to-detail-div'>
            <img src={product.img}/>
            <p>{product.name}</p>
            <p>$ {product.price}</p>
            </div>
            </Link>


            <div>

            <div className='edit-delete-btn-div'>
            <Link to={{
            pathname:'/products/edit',
            state: {
            productId: product.id
                    }
            }}
            >
            <button className='listing-edit-button' id={product.id} onClick={handleEdit}>
            <i class="fa-solid fa-pen"></i>
            </button>
            </Link>

            <form onSubmit={handleDelete}>
            <button type='submit' className='listing-delete-button' onClick={()=>{setProductId(product.id)}} >
            <i class="fa-solid fa-x"></i>
            </button>
            </form>
            </div>

            </div>
            </div>
        ))
        }



    </div>
    </>
    )
}

export default UserProducts
