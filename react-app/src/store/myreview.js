//action

const USER_REVIEW = 'review/USER_REVIEW'
const singleUserReview = (data) =>{
    return{
        type:USER_REVIEW,
        data
        
    }
}


const REMOVE_REVIEW = "review/REMOVE_REVIEW"
const removeReview = (id) =>{
    return {
        type:REMOVE_REVIEW,
        id
    }
}

const UPDATED_REVIEW = "review/UPDATED_REVIEW"
const updateReview =(data) =>{
    return {
        type:UPDATED_REVIEW,
        data
    }
}

//thunk
export const userReview = ()=> async(dispatch) =>{
    const response = await fetch('/api/reviews/myreviews')

    if(response.ok) {
        const data = await response.json()
        const dataArray = Object.values(data)
        console.log("backend, received data user",data)
        console.log("Array user",dataArray[0])
        
        dispatch(singleUserReview(dataArray[0]))
        return dataArray
    }
}


//delete a review
export const deleteReview = (id)=> async(dispatch)=>{
    const response = await fetch(`/api/reviews/${id}`,{
        method:"delete"
    })
    const data = await response.json()
   
    dispatch(removeReview(id))
    return data
}



// update review
export const editSingleReview = (data) => async(dispatch)=>{
 
    const {reviewId,review,rating,productId,reviewImg} = data

    const response = await fetch(`/api/reviews/${reviewId}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            review,
            rating,
            productId,
            reviewImg
        })
    })
    
    if(response.ok){
        const updatedReview = await response.json();
  
        dispatch(updateReview(updatedReview))
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
const originalState = {}
const userReviewReducer =(state=originalState, action)=>{
    let userState
    switch(action.type){
        case USER_REVIEW:
            userState = Object.assign({},state)
            console.log("action.data",action.data)
            action.data.forEach((review)=>{
                userState[review.id] = review
            })
            return userState

        case REMOVE_REVIEW:
            userState ={...state};
            delete userState[action.id];
            return userState;

        case UPDATED_REVIEW:
            userState = Object.assign({...state},{[action.data.id]: action.data})
            return userState
        default:
            return state

    }
}


export default userReviewReducer