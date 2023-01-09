import { getAllProducts } from "./products"
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


const UPDATE_CARTS = "carts/UPDATE_CARTS"
const updateCart = (id) =>{
    return {
        type:UPDATE_CARTS,
        id
    }
}

const REMOVE_CART = 'session/REMOVE_CART'
export const removeCart = ()=>({
    type:REMOVE_CART,
  })
  


const REMOVE_ALL_PRODUCTS = 'carts/REMOVE_ALL_PRODUCTS'
const clearPurchase = () =>{
    return {
        type:REMOVE_ALL_PRODUCTS
    }
}




// thunk
export const productsInCart=()=> async(dispatch)=>{
    const response = await fetch("/api/carts")

    if(response.ok) {
        const data = await response.json()
   
        dispatch(displaycarts(data.carts))
        return data.carts
        
    }
}


export const addProductInCart=(info)=>async(dispatch)=>{
   
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


export const EditProductInCart = (info) => async(dispatch)=>{

    const {cartId, quantity} = info
 
    const response = await fetch(`/api/carts/${cartId}`,{
        method:'put',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(info)
    })

    const updatedCart = await response.json()

    dispatch(productsInCart())
}

export const deleteProductInCart = (cardId)=> async(dispatch)=>{
    const response = await fetch(`/api/carts/${cardId}`, {
        method:'delete'
    })

    const data = await response.json()

    dispatch(deleteCart(cardId))

    
    
    return response
}

export const deleteAllProducts =() => async(dispatch)=>{
    const response = await fetch(`api/carts`, {
        method:'delete'
    })

    const data = await response.json()
 
    dispatch(clearPurchase())
    
    return data

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
    // case UPDATE_CARTS:
    //     return Object.assign({...state},{[action.carts.id]:action.cart})
    case REMOVE_CARTS:
        cartState = {...state};
  
        delete cartState[action.id]
     
        return cartState
    
    case REMOVE_CART:
        return initialState


    case REMOVE_ALL_PRODUCTS:
        return initialState
    default:
        return state
    }
}

export default cartReducer
