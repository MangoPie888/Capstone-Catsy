import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addProduct } from '../../store/products'
import { getUserProduct } from '../../store/products'
import "./CreateProduct.css"
import listingCat from '../../assets/listing.png'


const CreateProductForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [price, setPrice] = useState()
    const [description, setDescription] = useState("")
    const [img, setImg] = useState("")
    const [errors, setErrors] = useState([])

    const productFormSubmission=async(e)=>{
        console.log("all info for creating a product at frontend", "name:",name, "price:",price)
        e.preventDefault()
        try{
          const data= await dispatch(addProduct({name,price,description,img}))
          console.log("returned data from frontend", data)
          if(data){
            setErrors(data.errors);
            console.log("errorss from frontend",errors)
          } else{
            console.log("successed")
            history.push("/myproducts")
          }
        } catch(error){
            console.log(error)
        }

        
        
        // dispatch(getUserProduct())
        
    }

  return (
    <div >

      <div className='title-div'>
        <h3>Listing information</h3>
        <p>Tell the world all about your product and why they'll love it</p>
        <img src={listingCat} alt="listing-cat-img"/>
      </div>

      <div className='errors-edit-form'>
                {errors && (
                    <div className='errors-text'>
                    {errors.map((singleError) =><p>{singleError}</p>)}
                    </div>
                )}
        </div>

      <form className='create-product-form' onSubmit={productFormSubmission} >
        
        <div className='product-info-div'>
        <label>Name<span>*</span>
        <p>Naming your product, including keywords that buyers would use to search for your items</p>
        <input placeholder='product name' name='name' type='text' value={name} onChange={(e)=>setName(e.target.value)} required >    
        </input>
        </label>
        </div>

        <div className='product-info-div'>
        <label>Price<span>*</span>
        <p>Please set a decent listing price </p>
        </label>
        <input placeholder='product price' name='price' min={1} max={10000} type='number' value={price} onChange={(e)=>setPrice(e.target.value)} required >    
        </input>
        </div>

        <div className='product-info-div'>
        <label>Description<span>*</span>
        <p>Start with a brief overview that describes your product's great features. Shoppers will only see the first few lines of your description, so make it count!</p>
        </label>
        <textarea maxlength="500"  placeholder='description(limit:1000 characters)' name='description' type='text' value={description} onChange={(e)=>setDescription(e.target.value)} required >    
        </textarea>
        </div>

        <div className='product-info-div'>
        <label>Image
        <p>Please enter the url for the product. A good image can make your listing more appealing!</p>
        </label>
        <input placeholder='product image' name='img' type='url' value={img} onChange={(e)=>setImg(e.target.value)} required >    
        </input>
        </div>
        <button className='create-product-btn' type='submit'>Create</button>
      </form>
    </div>
  )
}

export default CreateProductForm

