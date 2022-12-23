

// action
const ALL_PRODUCTS = "products/ALL_PRODUCTS"
const displayAllProducts=(data)=>{
    return {
        type:ALL_PRODUCTS,
        data
    }
}


const PRODUCT_DETAIL = "products/PRODUCT_DETAIL"
const productDetail = (info)=>{
    return {
        type:PRODUCT_DETAIL,
        info
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


export const getProductDetail = (id)=> async(dispatch) =>{
    console.log("productiddddd from thunk", id)
    const response = await fetch(`/api/products/${id}`)

    if(response.ok) {
        const info = await response.json();
        console.log("inforrrrr from thunk", info)
        dispatch(productDetail(info))
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


export const productDetailReducer = (state = initialState, action) =>{
    let detailState
    switch(action.type) {
        case PRODUCT_DETAIL:
            detailState = Object.assign({},state);
            detailState[action.info.id] = action.info
            return detailState
        default:
            return state
    }
}

export default productsReducer