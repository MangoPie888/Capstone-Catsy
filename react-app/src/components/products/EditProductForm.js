import React from 'react'
import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editSingleProduct } from '../../store/products'

const EditProductForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const location= useLocation();
    console.log("location",location)
    const state = location.state
    console.log("state",state)
    const productId = state.productId
    console.log("productId",productId)


    const product = useSelector(state=>state.userProducts)
    const singleProduct = product[productId]
    console.log("product",product)
    console.log("singleProduct",singleProduct)
   
    let [name, setName] = useState(singleProduct.name)
    let [price, setPrice] = useState(singleProduct.price)
    let [description, setDescription] = useState(singleProduct.description)
    let [img, setImg] = useState(singleProduct.img)

    const handleEdit=(e)=>{
        e.preventDefault()
        console.log("all infor from the edit form","productId",productId,"name",name,"price",price)
        dispatch(editSingleProduct({productId,name,price,description,img}))
        history.push('/myproducts')
    }
    return (
        <div>
        <form onSubmit={handleEdit} >
            <input placeholder={name} name='name' type='text' value={name} onChange={(e)=>setName(e.target.value)} required >    
            </input>
            <input placeholder={price} name='price' min={1} type='number' value={price} onChange={(e)=>setPrice(e.target.value)} required >    
            </input>
            <input placeholder={description} name='description' type='text' value={description} onChange={(e)=>setDescription(e.target.value)} required >    
            </input>
            <input placeholder={img} name='img' type='url' value={img} onChange={(e)=>setImg(e.target.value)} required >    
            </input>
            <button type='submit'>Submit</button>
        </form>
        </div>
    )
}

export default EditProductForm
