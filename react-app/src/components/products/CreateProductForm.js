import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addProduct } from '../../store/products'
import { getUserProduct } from '../../store/products'
import "./CreateProduct.css"
import listingCat from '../../assets/listing.png'

import UploadPicture from './AddImages'

const CreateProductForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [price, setPrice] = useState()
    const [description, setDescription] = useState("")
    // const [img, setImg] = useState("")
    const [category, setCategory] = useState("")
    const [inventory, setInventory] = useState()
    const [errors, setErrors] = useState([])


    //image
    const [image, setImage] = useState(null);
    // const [imageLoading, setImageLoading] = useState(false);
    const [preview, setPreview] = useState(1);
    // const [productId,setProductId] = useState();

    const productFormSubmission=async(e)=>{
        e.preventDefault()
        console.log(category)
        console.log(inventory)
        try{
          const data= await dispatch(addProduct({name,price,description,/*img,*/category,inventory}))
          console.log("data comeback", data)
          console.log("data.id",data.id)
          const productId = data.id
          console.log("productId after set it",productId)
          if(data.errors){
            setErrors(data.errors);
       
          } else{
            console.log("correcttttttttttt")
            // setProductId(data.id)
            console.log("productIdddddddddd",data.id)
            console.log("preview",preview)
            const formData = new FormData();
          formData.append("image", image);
          formData.append("productId",productId)
          formData.append("preview",preview)

      // setImageLoading(true);
          console.log("formdataaaaaa", formData)
          console.log("productid before send it to image fetch", productId)
      const res = await fetch("/api/images" ,{
          method:"POST",
          body:formData
      });

      if(res.ok) {
          await res.json();
          // setImageLoading(false);
          history.push("/myproducts");
          console.log("image ok part")
      }
      else{
          // setImageLoading(false)
          console.log("error")
      }
            // button.click()
            
            console.log("end of submit")
            
           
            // history.push("/myproducts")
          }
        } catch(error){
 
        }

        
        
        // dispatch(getUserProduct())
        
    }


  //   const handleSubmit = async(e) =>{
  //     e.preventDefault();
  //     console.log("preview",preview)
  //     const formData = new FormData();
  //     formData.append("image", image);
  //     formData.append("productId",productId)
  //     formData.append("preview",preview)

  //     // setImageLoading(true);

  //     const res = await fetch("/api/images" ,{
  //         method:"POST",
  //         body:formData
  //     });

  //     if(res.ok) {
  //         await res.json();
  //         // setImageLoading(false);
  //         // history.push("/images");
  //         console.log("image ok part")
  //     }
  //     else{
  //         // setImageLoading(false)
  //         console.log("error")
  //     }
  // }

  const updateImage = (e) =>{
      const file = e.target.files;
      console.log("e.target.files",e.target.files)
      console.log("file",file)
      setImage(file[0]);
      if(file.length > 0) {
        let fileReader = new FileReader();
        fileReader.onload = function(event){
          document.getElementById("preview").setAttribute("src",event.target.result)
        };
        fileReader.readAsDataURL(file[0])

      }
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
        <input placeholder='product name(limit 255 characters)' name='name' type='text' value={name} onChange={(e)=>setName(e.target.value)} required >    
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
        <label>Category<span>*</span>
        <p>Please choose a category </p>
        </label>
        <select placeholder='Please select a category' name='category' onChange={(e)=>{setCategory(e.target.value)}} required>
          <option value="" disabled selected hidden>Please select a category</option>
          <option value="Food">Food</option>
          <option value="Litter & Litter Boxes">Litter & Litter Boxes</option>
          <option value="Toys">Toys</option>
          <option value="Cat Furnitures">Cat Furnitures</option>
          <option value="Health">Health</option>
          <option value="Bowls & Feeders">Bowls & Feeders</option>
        </select>
        </div>


        <div className='product-info-div'>
        <label>Description<span>*</span>
        <p>Start with a brief overview that describes your product's great features. Shoppers will only see the first few lines of your description, so make it count!</p>
        </label>
        <textarea maxlength="500"  placeholder='description(limit:1000 characters)' name='description' type='text' value={description} onChange={(e)=>setDescription(e.target.value)} required >    
        </textarea>
        </div>

        <div className='product-info-div'>
        <label>Inventory<span>*</span>
        <p>How many products do you have for selling? Please enter a number below.</p>
        </label>
        <input placeholder='inventory' name='inventory' min={1} type='number' value={inventory} onChange={(e)=>setInventory(e.target.value)} required >    
        </input>
        </div>


        <div className='product-info-div'>
        <label>Image
        <p>Please enter the url for the product. A good image can make your listing more appealing!</p>
        </label>
        {/* <form id='imageForm' onSubmit={handleSubmit}> */}
            
            
            <input 
                type="file"
                name='file'
                id ="file"
                accept="image/*"
                // multiple="multiple"
                onChange={updateImage}
            />
            <div>
            <img id="preview" ></img>
            </div>
            {/* <button id='imageButton' type="submit" hidden>Submit</button> */}
            {/* {(imageLoading) && <p>Loading</p>} */}
        {/* </form> */}
        {/* <input placeholder='product image' name='img' type='url' value={img} onChange={(e)=>setImg(e.target.value)} required >    
        </input> */}
        </div>

        <button className='create-product-btn' type='submit'>Create</button>
      </form>
    </div>
  )
}

export default CreateProductForm

