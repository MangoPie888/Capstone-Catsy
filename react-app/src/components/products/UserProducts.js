import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateProductForm from "./CreateProductForm"
import { getUserProduct } from '../../store/products'
import { deleteProduct } from '../../store/products'

const UserProducts = () => {
    const dispatch = useDispatch()
    
    let userId
    const sessionUser = useSelector(state => state.session.user);
    console.log("SESSION user",sessionUser)
    if(sessionUser){
        userId = sessionUser.id
        console.log("userId",userId)
    }
    

    const userProducts = useSelector(state=>state.userProducts)
    console.log("userProducts",userProducts)
    const productList = Object.values(userProducts)
    console.log("productList",productList)
    const myProducts = productList.filter((product)=>product.seller_id === userId)
    console.log("myProducts",myProducts)
    useEffect(()=>{
        dispatch(getUserProduct())
    },[])

    const handleDelete=(e)=>{
        console.log("buttonid",e.target.id)
        const productId = e.target.id
        dispatch(deleteProduct(productId))
    }




    return (
    <div>
        <CreateProductForm />

        {myProducts && 
            myProducts.map(product=>(
            <div key={product.id}>
            <img src={product.img}/>
            <p>{product.name}</p>
            <button id={product.id}>Edit</button>
            <button onClick={handleDelete} id={product.id}>Delete</button>
            </div>
        ))
        }


    </div>
    )
}

export default UserProducts
