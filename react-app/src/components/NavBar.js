
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

const NavBar = () => {
  const history = useHistory()

  const sessionUser = useSelector(state => state.session.user);

  const [showModal, setShowModal] = useState(false)
  const [showProfile, setShowProfile] = useState(false)


  const handleDeadBtn=()=>{
    history.push('/future')
  }


  let sessionLink;
  if(sessionUser){
    sessionLink = (
      <>
      <ul className='profile-shop-cart'>
      <li>
      <Link to={'/myproducts'}><i class="fa-solid fa-store"></i></Link>
      </li>
      <li className='profile-li'>
      {/* <button className='profile-button' onClick={()=>{setShowProfile(!showProfile)}} > */}
      <div onClick={()=>{setShowProfile(!showProfile)}} className='profile-button-div'>
      <i class="fa-solid fa-user"></i>
      </div>
      <i class="fa-solid fa-caret-down"></i>
      {/* </button> */}
      </li>
      {showProfile && 
        <ProfileMenu setShowProfile={setShowProfile}/>
      }
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
