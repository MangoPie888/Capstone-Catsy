

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


const ADD_PRODUCT = "products/ADD_PRODUCT"
const createProduct = (productInfo)=>{
    return {
        type:ADD_PRODUCT,
        productInfo
    }
}


const USER_PRODUCT = "products/USER_PRODUCT"
const ownerProduct = (info) =>{
    return {
        type:USER_PRODUCT,
        info
    }
}  


const UPDATED_PRODUCT = "products/UPDATED_PRODUCT"
const updateProduct =(data) =>{
    return {
        type:UPDATED_PRODUCT,
        data
    }
}

const REMOVE_PRODUCT = "products/REMOVE_PRODUCT"
const removeProduct = (id) =>{
    return {
        type:REMOVE_PRODUCT,
        id
    }
}

const REMOVE_PRODUCTS = 'session/REMOVE_PRODUCTS'
export const removeUserProducts=()=>({
    type:REMOVE_PRODUCTS,
  })




// thunk 
export const getAllProducts = ()=> async(dispatch) => {
    const response = await fetch("/api/products")

    if(response.ok) {
        const data = await response.json();
      
        dispatch(displayAllProducts(data.allProducts))
    }
}


export const getProductDetail = (id)=> async(dispatch) =>{
   
    const response = await fetch(`/api/products/${id}`)

    if(response.ok) {
        const info = await response.json();
      
        dispatch(productDetail(info))
    }
}


export const addProduct = (info)=> async(dispatch)=>{
   
    const response = await fetch("/api/products",{
        method:"post",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(info)
    });

    if(response.ok){
  
        const newProduct = await response.json();
        dispatch(createProduct(newProduct))
        return null
    }else if(response.status < 500){
        const data = await response.json()
        if(data.errors){
  
            return data;
        }
    }
    else{
        return {"error":"something just happened, please try again"}
    }
    
}


export const getUserProduct = () => async(dispatch)=>{
    const response = await fetch("/api/products/current")

    if(response.ok) {
        const data = await response.json()
     
        dispatch(ownerProduct(data.currentUserProducts))
    }
}



export const editSingleProduct = (data) => async(dispatch)=>{
 
    const {productId,name,price,description,img,inventory, category} = data

    const response = await fetch(`/api/products/${productId}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            productId,
            name,
            price,
            description,
            img,
            inventory,
            category
        })
    })
    
    if(response.ok){
        const updatedProduct = await response.json();
  
        dispatch(updateProduct(updatedProduct))
        return null
    }else if(response.status < 500){
        const data = await response.json()
        if(data.errors){
 
            return data;
        }
    }
    else{
        return {"error":"something just happened, please try again"}
    }
    
}

export const deleteProduct = (id)=> async(dispatch)=>{
    const response = await fetch(`/api/products/${id}`,{
        method:"delete"
    })
    const data = await response.json()
   
    dispatch(removeProduct(id))
    return response
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
        case ADD_PRODUCT:
            productsState = {
                ...state,
                [action.productInfo.id]:action.productInfo
            }
            return productsState
        case UPDATED_PRODUCT:
            productsState = Object.assign({...state},{[action.data.id]: action.data})
            return productDetail
        case REMOVE_PRODUCT:
            productsState ={...state};
            delete productsState[action.id];
            return productsState;
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

export const userProductReducer = (state = initialState, action)=> {
    let newState
    switch(action.type) {
        case USER_PRODUCT:
            newState = Object.assign({},state);
            action.info.forEach((product)=>{
                newState[product.id] = product
            })
            return newState
        case REMOVE_PRODUCT:
            newState = {...state};
            delete newState[action.id];
            return newState;
        case REMOVE_PRODUCTS:
            return initialState
        default:
            return state
    }
}

export default productsReducer