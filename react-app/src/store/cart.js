// action
const DISPLAY_CARTS = "carts/DISPLAY_CARTS"
const displaycarts = (data) =>{
    return {
        type:DISPLAY_CARTS,
        data
    }
}







// thunk
export const productsInCart=()=> async(dispatch)=>{
    const response = await fetch("/api/carts")

    if(response.ok) {
        const data = await response.json()
        console.log("data.carts from thunk", data.carts)
        dispatch(displaycarts(data.carts))
        
    }
}


export const addProductInCart=(info)=>async(dispatch)=>{
    console.log("productId from thunk", info)
    const response = await fetch("/api/carts",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(info)
    })

    const data = await response.json()
    if(data){
        dispatch(productsInCart())
    }
}



// reducer
let initialState = {}
const cartReducer = (state=initialState, action)=>{
    let cartState
    switch(action.type){
    case DISPLAY_CARTS:
        cartState = Object.assign({},state)
        action.data.forEach((product)=>{
            cartState[product.cart.id]=product
        })
        return cartState
    default:
        return state
    }
}

export default cartReducer
