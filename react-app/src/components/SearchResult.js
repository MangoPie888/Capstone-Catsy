import React from "react"
import {useLocation} from 'react-router-dom';
import { searchItems } from "../store/search";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const SearchResult = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()
    console.log("state",location.state)
    let searchContent = (location.state).toLowerCase()
    console.log("serachContent",searchContent)

useEffect(()=>{
    dispatch(searchItems(searchContent))
})

  return (
    <div>
      <p>This is search result page</p>
    </div>
  )
};

export default SearchResult;
