import React, { useState } from 'react'
import './CreateShop.css'
import {Modal} from "../context/Modal"
import { useDispatch } from 'react-redux'
import {createNewStore} from '../../store/shop'
import { useHistory } from 'react-router-dom'



const CreateShop = () => {
    const dispatch= useDispatch()
    const history = useHistory()

    const [clickModal, setClickModal] = useState(false)
    const [name, setName] = useState()
    const [description, setDescription] =useState()
    const [img, setImg] = useState()
    const [errors, setErrors] = useState([])

    const handleCreateStore=async(e)=>{
        e.preventDefault()
        try{
        const data = await dispatch(createNewStore({name, description,img}))
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

    }
    

  return (
    <div className='create-shop-container'>
      <p>Want to sell your amazing products on catsy?</p>
      <button onClick={()=>{setClickModal(true)}}>Create a store now!</button>
      {clickModal &&
         <Modal onClose={()=>{setClickModal(false)}}>

            <div className='Create-in-sign'>
                Create your store
            </div>

            <div className='errors-edit-form'>
                {errors && (
                    <div className='errors-text'>
                    {errors.map((singleError) =><p>{singleError}</p>)}
                    </div>
                )}
            </div>

            <form onSubmit={handleCreateStore} className='create-store-form'>
                <label>Store Name</label>
                <input placeholder='store name(limit 255 characters)' name='name' type='text' value={name} onChange={(e)=>setName(e.target.value)} required >
                </input>

                <label>Description</label>
                <textarea maxlength="500"  placeholder='describe your store here(limit:1000 characters)' name='description' type='text' value={description} onChange={(e)=>setDescription(e.target.value)} required >    
                </textarea>

                <label>Image</label>
                <input placeholder='store profile image' name='img' type='url' value={img} onChange={(e)=>setImg(e.target.value)} required >    
        </input>

            <div>
            <button type='submit'>Create!</button>
            </div>

            </form>
         </Modal>
        }
    </div>
  )
}

export default CreateShop
