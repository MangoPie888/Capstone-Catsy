import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { productsInCart } from '../../store/cart'
import {Modal} from "../context/Modal"
import SignUpForm from './SignUpForm';
import "./LoginForm.css"
import demoImg from '../../assets/demo.png'
import { displayStore } from '../../store/shop';


const LoginForm = ({setShowModal}) => {
  const [openModal, setOpenModal] = useState(false)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  





  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    else{
      
      dispatch(productsInCart())
      dispatch(displayStore())
      setShowModal(false)
    }
    
    
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    setShowModal(false)
    return <Redirect to='/' />;
  }

  const demonLogin=()=>{
    setEmail("demo@aa.io");
    setPassword("password");
  }

  const handleRegisterBtn=()=>{
    setOpenModal(true)
   
  
  }

  return (
  <>
  
    <form className='sign-in-form' onSubmit={onLogin}>
        {errors.map((error, ind) => (
          <div key={ind} className="login-error-container">{error}</div>
        ))}
      
 
      <div className='top-line-sign-in'>
        <div className='Sign-in-sign'>Sign in</div>
        <button className='register-btn' onClick={handleRegisterBtn}>Register</button>
      </div>

      {openModal &&
      <Modal onClose={()=>{setShowModal(false)}}>
        <SignUpForm />
      </Modal>
    }
      
    
      
      <div className='login-form-div'>
        <div className='email-div'>
          <label htmlFor='email'>Email address</label>
            <input
            required
            name='email'
            type='text'
            value={email}
            size={30}
            onChange={updateEmail}
            />
          </div>
        
        
          <div className='password-div'>
          <label htmlFor='password'>Password</label>
            <input
              required
              name='password'
              type='password'
              value={password}
              size={30} 
              onChange={updatePassword}
            />
          </div>
        
      </div>


     
      <div className='sign-in-btn-div'>
      <button type='submit'>Sign in</button>
      </div>
      
      <div className='trouble-sign-in-div'>
        <a href="https://help.etsy.com/hc/en-us/articles/115015410188">Trouble signing in?</a>
      </div>

      <div className='divider'>OR</div>

      <div className='demo-user-div'>
      
        <button type='submit' onClick={demonLogin}>
        <div>
        <img src={demoImg} alt="demo img"/>
        </div>
        <div>
        Demo User
        </div>
        </button>
      </div>

      <div>

      </div>
    </form>
 
    

    
  </>
  );
};

export default LoginForm;
