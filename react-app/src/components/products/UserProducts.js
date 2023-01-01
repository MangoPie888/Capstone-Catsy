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

    const products = useSelector(state=>state.userProducts)
    // console.log("userProducts",products)
    const myProducts = Object.values(products)
    // console.log("myproductslist",myProducts)


    const handleDelete=(e)=>{
        console.log("buttonid",e.target.id)
        const productId = e.target.id
        dispatch(deleteProduct(productId))
    }


    const handleEdit=(e)=>{
        const productId = e.target.id
        



        
    }


    return (
    <div className='listing-container'>
        {/* <CreateProductForm /> */}
        <div>
            <Link to={'/products/new'}>
            <p>+</p>
            <p>Add a listing</p>
            </Link>
        </div>
        {myProducts && 
            myProducts.map(product=>(
            <div key={product.id}>
            <img src={product.img}/>
            <p>{product.name}</p>
            <div>
            <Link to={{
            pathname:'/products/edit',
            state: {
            productId: product.id
                    }
            }}
            >
            <button id={product.id} onClick={handleEdit}>Edit</button>
            </Link>
            <button onClick={handleDelete} id={product.id}>Delete</button>
            </div>
            </div>
        ))
        }



    </div>
    )
}

export default UserProducts
