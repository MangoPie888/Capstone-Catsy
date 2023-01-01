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
        dispatch(displaycarts(data.product))
    }
}




// reducer
let initialState = {}
const cartReducer = (state=initialState, action)=>{
    let cartState
    switch(action.type){
    case DISPLAY_CARTS:
        return action.data
    default:
        return state
    }
}

export default cartReducer
