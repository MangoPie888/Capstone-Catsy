

// action
const ALL_PRODUCTS = "products/ALL_PRODUCTS"
const displayAllProducts=(data)=>{
    return {
        type:ALL_PRODUCTS,
        data
    }
}










// thunk 
export const getAllProducts = ()=> async(dispatch) => {
    const response = await fetch("/api/products")

    if(response.ok) {
        const data = await response.json();
        console.log("DATAAAAAAAAA from thunk", data.allProducts)
        dispatch(displayAllProducts(data.allProducts))
    }
}







// Reducer
const initialState = {}
const productsReducer = (state = initialState, action)=> {
    let productsState
    switch(action.type) {
        case ALL_PRODUCTS:
            productsState = Object.assign({},state);
            action.data.forEach((product)=>{
                productsState[product.id] = product
            })

            return productsState

            return state
        default:
            return state
    }
}


export default productsReducer