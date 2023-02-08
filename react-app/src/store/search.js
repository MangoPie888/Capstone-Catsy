//action
const DISPLAY_SEARCH = 'search/DISPLAY_SEARCH'
const newSearch = (data) =>{
    return {
        type:DISPLAY_SEARCH,
        data
    }
}




//thunk
export const searchItems = (info)=> async(dispatch)=>{
    console.log("infor hit thunk",info)
    const response = await fetch("/api/search",{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(info)
    });
    console.log("in between response")
    console.log("response",response)
    if(response.ok) {
        const items = await response.json();
        console.log("returned items",items.allProducts)
        dispatch(newSearch(items.allProducts))
        return items
    }
}



//reducer
const initialState = {}
const searchReducer = (state = initialState, action)=> {
    let searchState
    switch(action.type) {
        case DISPLAY_SEARCH:
            searchState = Object.assign({},state);
            action.data.forEach((product)=>{
                searchState[product.id] = product
            })
            return searchState
        default:
            return initialState
        }
}

export default searchReducer