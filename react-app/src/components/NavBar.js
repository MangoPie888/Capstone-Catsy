
import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginForm from './auth/LoginForm';
import LogoutButton from './auth/LogoutButton';
import ProfileMenu from './auth/ProfileMenu';
import {Modal} from "./context/Modal"
import "./NavBar.css"

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  const [showModal, setShowModal] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  let sessionLink;
  if(sessionUser){
    sessionLink = (
      <>
      <button onClick={()=>{setShowProfile(!showProfile)}} >
      <i class="fa-solid fa-user"></i>
      </button>
      {showProfile && 
        <ProfileMenu setShowProfile={setShowProfile}/>
      }
      </>
    )
  } else {
    sessionLink = (
      <>
        <button onClick={()=>{setShowModal(true)}}>Sign in</button> 
          {showModal &&
            <Modal onClose={()=>{setShowModal(false)}}>
              <LoginForm setShowModal={setShowModal}/>
            </Modal>
          }
      </>
    )
  }

  return (
    <nav>
      
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
      
       
          {sessionLink}
      
      
          <LogoutButton />
      
        {/* <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
         */}
    
    </nav>
  );
}

export default NavBar;
