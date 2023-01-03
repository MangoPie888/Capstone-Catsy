// action
const DISPLAY_CARTS = "carts/DISPLAY_CARTS"
const displaycarts = (data) =>{
    return {
        type:DISPLAY_CARTS,
        data
    }
}


const REMOVE_CARTS="carts/REMOVE_CARTS"
const deleteCart = (id) =>{
    return {
        type:REMOVE_CARTS,
        id
    }
}


const DECREASE_CART='carts/DECREASE_CARTS'
export const decreseCart = (id) =>{
    return {
        type:DECREASE_CART,
        id
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
    console.log("addproduct data from thunk",data)
    // if(data){
    //     dispatch(productsInCart())
    // }
}



export const EditProductInCart = (info) => async(dispatch)=>{
    console.log("info from editproduct thunk")
    const {cardId, quantity} = info
    console.log("cardId from thunk", cardId)
    const response = await fetch(`/api/carts/${cardId}`,{
        method:'put',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(info)
    })

    const updatedCart = await response.json()
    console.log("updated cart from thunk", updatedCart)
    
}

export const deleteProductInCart = (cardId)=> async(dispatch)=>{
    const response = await fetch(`/api/carts/${cardId}`, {
        method:'delete'
    })

    const data = await response.json()
    console.log("deleted data from thunk",data)
    console.log("product Id at thunk", cardId)
    dispatch(deleteCart(cardId))

    
    
    return response
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
    case REMOVE_CARTS:
        cartState = {...state};
        console.log("Cartstate at reducer", cartState)
        console.log("cartState with id item",cartState[action.id])
        delete cartState[action.id]
        console.log("after delete the item from cart, cart reducer", cartState)
        return cartState
    case DECREASE_CART:
        // const itemIndex = state.carts.findIndex(
        //     cartItem => cartItem.cart.id === action.id
        // )

        // if(state.carts[itemIndex].quantity > 1){
        //     state.cartItem[itemIndex].quantity -= 1

        // } else if(state.carts[itemIndex].quantity === 1){
        //     state.cartItem[itemIndex].quantity = 1
        // }
    default:
        return state
    }
}

export default cartReducer
