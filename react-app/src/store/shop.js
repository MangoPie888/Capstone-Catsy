//action
const CREATE_STORE = 'shop/CREATE_STORE'
const addStore = (data) =>{
    return {
        type:CREATE_STORE,
        data
    }
}


const CLEAR_STORE = 'session/CLEAR_STORE'
export const cleanStore = () =>{
    return{
        type:CLEAR_STORE
    }
}


// const ADD_STORE ="shop/ADD_STORE"
// const addedNewStore =()=>{}


//thunk
export const displayStore = ()=>async(dispatch)=>{
    const response = await fetch('/api/shop')

    if(response.ok) {
        const data = await response.json()
   
        dispatch(addStore(data))
    }
}

export const createNewStore = (info)=> async(dispatch)=>{


    const response = await fetch('/api/shop',{
    method:"post",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(info)

    })

    if(response.ok){
 
        const newStore = await response.json();
        dispatch(displayStore())
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




//reducer
const initialState = {}
const shopReducer = (state = initialState, action)=>{
    let shopState

    switch(action.type){
        case CREATE_STORE:
            return shopState = action.data
        case CLEAR_STORE:
            return initialState
        default:
            return state
    }
}

export default shopReducer