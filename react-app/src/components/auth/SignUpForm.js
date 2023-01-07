import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./SignUpForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if(password !==repeatPassword){
      setErrors(["password and confirmed password doesn't match"])
    }

    if (password === repeatPassword) {
      console.log("-------firstName",firstName)
      console.log("??????????????lastName",lastName)
      console.log("??????????????Email",email)
     
      const data = await dispatch(signUp(firstName,lastName, email, password));
      if (data) {                                                                                                                                                                 
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='sign-up-container'>

      <div className='title-container'>
        <h3>Create your account</h3>
        <p>Registration is easy.</p>
      </div>

    <form className='sign-up-form' onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div className='sign-up-error-div' key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>First Name<span>*</span></label>
        <input
        size={30}
          
          type='text'
          name='firstName'
          onChange={updateFirstName}
          value={firstName}
          required
        ></input>
      </div>
      <div>
        <label>Last Name<span>*</span></label>
        <input
        size={30}
          required
          type='text'
          name='lastName'
          onChange={updateLastName}
          value={lastName}
        ></input>
      </div>
      <div>
        <label>Email address<span>*</span></label>
        <input
        size={30}
          required
          type='email'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password<span>*</span></label>
        <input
        size={30}
          required
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password<span>*</span></label>
        <input
        size={30}
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>

      <div className='sign-up-register-btn-div'>
      <button className='register-btn-signup' type='submit'>Register</button>
      </div>
    </form>
  

    </div>
  );
};

export default SignUpForm;
