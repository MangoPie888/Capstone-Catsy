
import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import LoginForm from './auth/LoginForm';
import LogoutButton from './auth/LogoutButton';
import ProfileMenu from './auth/ProfileMenu';
import {Modal} from "./context/Modal"
import "./NavBar.css"
import logo from '../assets/catsyLogo.png'
import { useHistory } from 'react-router-dom';
import { displayStore } from '../store/shop';

const NavBar = () => {
  const history = useHistory()

  const sessionUser = useSelector(state => state.session.user);
  const userStore = useSelector(state =>state.shop)
  
  const [showModal, setShowModal] = useState(false)
  const [showProfile, setShowProfile] = useState(false)



  const handleDeadBtn=()=>{
    history.push('/future')
  }

  const checkStore=()=>{
    if(Object.keys(userStore).length === 0) {
      history.push('/createShop')
    }
    else{
      history.push('/myproducts')
    }
  }

  let sessionLink;
  if(sessionUser){
    sessionLink = (
      <>
      <ul className='profile-shop-cart'>
      <li>
      <button onClick={checkStore} className="shop-button"><i class="fa-solid fa-store"></i></button>
      </li>

      <li >
      {/* <button className='profile-button' onClick={()=>{setShowProfile(!showProfile)}} > */}
      <div className="dropdown">
      <button className="dropdown-button" >
      <i class="fa-solid fa-user"></i>
      <i class="fa-solid fa-caret-down"></i>
      </button>

      <div className="dropdown-menu">
      <ul>
        <p>First Name:</p>
        <li>{sessionUser.first_name}</li>
        <p>Email address:</p>
        <li>{sessionUser.email}</li>
        <LogoutButton />
      </ul>
      </div>

      </div>
      {/* </button> */}
      </li>
   
  
      
      <li>
      <Link to={'/carts'}>
      <i class="fa-solid fa-cart-shopping"></i>
      </Link>
      </li>
      </ul>
      </>
    )
  } else {
    sessionLink = (
      <>
        <ul className='signin-shopping-list'>
        <li>
        <button className='signin-button' onClick={()=>{setShowModal(true)}}>Sign in</button>
        </li>
        {/* <li>
        <i class="fa-solid fa-cart-shopping"></i>
        </li> */}
        </ul>
          {showModal &&
            <Modal onClose={()=>{setShowModal(false)}}>
              <LoginForm setShowModal={setShowModal}/>
            </Modal>
          }
      </>
    )
  }

  return (
    <>
    <nav>

          <NavLink to='/' exact={true} activeClassName='active'>
            <img className='logo' src={logo} alt="logo"/>
          </NavLink>
          
          <div className="search">
            <input type="text" className="searchTerm" placeholder="Search for anything" />
            <button type="submit" className="searchButton" onClick={handleDeadBtn}>
            <i class="fa fa-search"></i>
            </button>
          </div>
          {sessionLink}

          
    </nav>
    {/* <div className='top-categry-list'>
            <ul>
              <li>Cat Favorites</li>
              <li></li>
            </ul>
          </div> */}
    </>
  );
}

export default NavBar;
