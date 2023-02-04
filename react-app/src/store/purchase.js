//action
const ALL_PURCHASES = 'purchases/ALL_PURCHASES'
const showAllPurchases = (data) => {
    return {
        type:ALL_PURCHASES,
        data
    }
}






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



export const displayAllPurchases=()=> async(disptach)=>{
    const response = await fetch("/api/purchases")

    if(response.ok) {
        const data = await response.json()
        console.log("data from thunk",data)
        disptach(showAllPurchases(data.purchased_item))
        return data
    }
}






//reducer
const initialState = {}
const purchasesReducer = (state = initialState, action)=>{
    let purchaseState
    switch(action.type) {
        case ALL_PURCHASES:
            purchaseState = Object.assign({},state);
            action.data.forEach((item)=>{
                purchaseState[item.id] = item
            })
            return purchaseState
        default:
            return initialState
    }
}

export default purchasesReducer