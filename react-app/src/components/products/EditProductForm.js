import React from 'react'
import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editSingleProduct } from '../../store/products'
import listingCat from '../../assets/listing.png'
import "./EditProduct.css"


const EditProductForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const location= useLocation();

    const state = location.state

    const productId = state.productId



    const product = useSelector(state=>state.userProducts)
    const singleProduct = product[productId]
 
   
    let [name, setName] = useState(singleProduct.name)
    let [price, setPrice] = useState(singleProduct.price)
    let [description, setDescription] = useState(singleProduct.description)
    let [img, setImg] = useState(singleProduct.img)
    let [errors, setErrors] = useState([])

    const handleEdit=async(e)=>{
        e.preventDefault()
       
        try{
          const data= await dispatch(editSingleProduct({productId,name,price,description,img}))
       
          if(data){
            setErrors(data.errors);
        
          } else{
          
            history.push('/myproducts')
          }
        } catch(error){
            console.log(error)
        }
        
        
    }
    return (
        <div>
            

            <div className='title-div'>
                <h3>Listing information</h3>
                <p>Edit your product anytime, anywhere</p>
                <img src={listingCat} alt="listing-cat-img"/>
        </div>

        <div className='errors-edit-form'>
                {errors && (
                    <div className='errors-text'>
                    {errors.map((singleError) =><p>{singleError}</p>)}
                    </div>
                )}
        </div>

        <form className='create-product-form' onSubmit={handleEdit} >

        <div className='product-info-div'>
            <label>Name<span>*</span>
            <p>Naming your product information, including keywords that buyers would use to search for your items</p>
            <input placeholder={name} name='name' type='text' value={name} onChange={(e)=>setName(e.target.value)}  >    
            </input>
            </label>
        </div>


        <div className='product-info-div'>
            <label>Price<span>*</span>
            <p>Please set a decent listing price </p>
            </label>
            <input onKeyDown="return false"  placeholder={price} name='price' min={1} type='number' value={price} onChange={(e)=>setPrice(e.target.value)} required >    
            </input>
        </div>


        <div className='product-info-div'>
            <label>Description<span>*</span>
            <p>Start with a brief overview that describes your product's great features. Shoppers will only see the first few lines of your description, so make it count!</p>
            </label>
            <textarea placeholder={description} name='description' type='text' value={description} onChange={(e)=>setDescription(e.target.value)} required >    
            </textarea>
        </div>


        <div className='product-info-div'>
            <label>Image
            <p>Please enter the url for the product. A good image can make your listing more appealing!</p>
            </label>
            <input placeholder={img} name='img' type='url' value={img} onChange={(e)=>setImg(e.target.value)} required >    
            </input>
        </div>
            <button className='create-product-btn' type='submit'>Submit</button>
        </form>
        </div>
    )
}

export default EditProductForm
