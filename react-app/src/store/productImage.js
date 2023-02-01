


//product image thunk
export const createNewImage = (info)=> async()=>{
    console.log('info from createNewIamge thunk', info)
    const res = await fetch("/api/images" ,{
        method:"POST",
        body:JSON.stringify(info)
    });

    if(res.ok) {
        await res.json();
        // setImageLoading(false);
        // history.push("/images");
    }
    else{
        // setImageLoading(false)
        console.log("error")
    }
}


