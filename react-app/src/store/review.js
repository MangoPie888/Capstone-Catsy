//action
const ADD_REVIEW = 'review/ADD_REVIEW'
const createReview = (data) =>{
    return {
        type:ADD_REVIEW,
        data}
}





//thunk
export const addReview = (info)=> async(dispatch)=>{
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
    
