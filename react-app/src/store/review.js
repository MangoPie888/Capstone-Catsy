//action
const ADD_REVIEW = 'review/ADD_REVIEW'
const createReview = (data) =>{
    return {
        type:ADD_REVIEW,
        data}
}

const DISPLAY_REVIEW ='review/DISPLAY_REVIEW'
const showReviews = (data) =>{
    return {
        type:DISPLAY_REVIEW,
        data
    }
}






//thunk


export const displayReview = (productId)=> async(dispatch) =>{
    const response = await fetch(`/api/reviews/${productId}`)

    if(response.ok) {
        const data = await response.json()
        const dataArray = Object.values(data)
        console.log("backend, received data",data)
        console.log("Array",dataArray[0])
        
        dispatch(showReviews(dataArray[0]))
        return dataArray
    }
}

export const addReview = (info)=> async(dispatch)=>{
    console.log("hitted thunk")
    console.log("info from thunk", info)
    const response = await fetch("/api/reviews",{
        method:"post",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(info)
    });

    if(response.ok) {
        const newReview = await response.json();
        dispatch(createReview(newReview))
        return newReview
    }else if(response.status < 500) {
        const data = await response.json()
        if(data.errors) {
            return data
        }

    }
    else{
        return {"error":"something just happened, please try again"}
    }
}






//reducer

const initialState ={}
const reviewsReducer = (state=initialState, action) =>{
    let reviewState
    switch(action.type){
        case DISPLAY_REVIEW:
            reviewState = Object.assign({},state)
            console.log("action.data",action.data)
            action.data.forEach((review)=>{
                reviewState[review.id] = review
            })
            return reviewState
        
        default:
            return initialState
    }
}
export default reviewsReducer