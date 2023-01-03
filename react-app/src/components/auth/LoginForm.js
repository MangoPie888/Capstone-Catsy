import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { productsInCart } from '../../store/cart'
import {Modal} from "../context/Modal"
import SignUpForm from './SignUpForm';


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
    dispatch(productsInCart())
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

  // const handleRegister=()=>{
  //   setOpenModal(true)
  //   return(
  //   <>
  //   {openModal &&
  //     <Modal onClose={()=>{setOpenModal(false)}}>
  //       <SignUpForm setOpenModal={setOpenModal}/>
  //     </Modal>
  //   }
  //   </>
  //   )
  // }

  return (
  <>
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit'>Login</button>
      </div>
      <br/>
    <button type='submit' onClick={demonLogin}>Demo User</button>
    </form>
    <br/>
    <button onClick={()=>setOpenModal(true)}>Register</button>

    {openModal &&
      <Modal onClose={()=>{setOpenModal(false)}}>
        <SignUpForm setOpenModal={setOpenModal}/>
      </Modal>
    }
    
  </>
  );
};

export default LoginForm;
