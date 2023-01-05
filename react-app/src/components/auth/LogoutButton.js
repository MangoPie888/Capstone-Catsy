import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import {useHistory} from "react-router-dom";
import "./LogoutBtn.css"


const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push("")
  };

  return <button className='logout-button-nav' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
