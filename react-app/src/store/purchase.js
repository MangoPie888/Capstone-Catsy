






//purchase thunk
export const addPurchasedItem =(items)=> async(disptach)=>{
    const response = await fetch('/api/purchases',{
        method:"post",
        headers:{
            'Content-Type':'applicationjson'
        },
        body:JSON.stringify(items)
    });

    if(response.ok) {
        const data = await response.json()
        console.log("data from thunk", data)
        return data
    }
}