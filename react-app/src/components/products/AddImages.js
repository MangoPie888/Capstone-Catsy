import React, {useState} from "react";
import {useHistory} from "react-router-dom";


const UploadPicture = ()=>{
    const history = useHistory();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [preview, setPreview] = useState(0);
    const [productId,setProductId] = useState(3);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log("preview",preview)
        const formData = new FormData();
        formData.append("image", image);
        formData.append("productId",productId)
        formData.append("preview",preview)

        setImageLoading(true);

        const res = await fetch("/api/images" ,{
            method:"POST",
            body:formData
        });

        if(res.ok) {
            await res.json();
            setImageLoading(false);
            history.push("/images");
        }
        else{
            setImageLoading(false)
            console.log("error")
        }
    }

    const updateImage = (e) =>{
        const file = e.target.files[0];
        console.log("e.target.files",e.target.files)
        console.log("file",file)
        setImage(file);
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="file"
                accept="image/*"
                onChange={updateImage}
            />

            {/* <p>Is this picture a preview picture?</p>
            
            <input
                type="radio"
                value={1}
                name="preview"
                key={preview}
                onClick={(e)=>setPreview(e.target.value)}
                

            />
            <label>Yes</label>
            <input
                type="radio"
                value={0}
                name="preview"
                key={preview}
                checked

            />
            <label>No</label> */}

            <input type="number"
                hidden
                value={productId}
            />

            <button type="submit">Submit</button>
            {(imageLoading) && <p>Loading</p>}
        </form>
    )
}


export default UploadPicture;