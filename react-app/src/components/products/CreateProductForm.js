import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addProduct } from '../../store/products'


const CreateProductForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [price, setPrice] = useState()
    const [description, setDescription] = useState("")
    const [img, setImg] = useState("")

    const productFormSubmission=(e)=>{
        console.log("all info for creating a product at frontend", "name:",name, "price:",price)
        e.preventDefault()
        dispatch(addProduct({name,price,description,img}))
        history.push("/myproducts")
    }

  return (
    <div>
      <form onSubmit={productFormSubmission} >
        <input placeholder='product name' name='name' type='text' value={name} onChange={(e)=>setName(e.target.value)} required >    
        </input>
        <input placeholder='product price' name='price' min={1} type='number' value={price} onChange={(e)=>setPrice(e.target.value)} required >    
        </input>
        <input placeholder='description' name='description' type='text' value={description} onChange={(e)=>setDescription(e.target.value)} required >    
        </input>
        <input placeholder='product image' name='img' type='url' value={img} onChange={(e)=>setImg(e.target.value)} required >    
        </input>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default CreateProductForm

