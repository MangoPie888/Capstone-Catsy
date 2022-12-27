import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const ProfileMenu = () => {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <div>
      <ul>
        <li>{sessionUser.first_name}</li>
        <li>{sessionUser.email}</li>
        <LogoutButton />
      </ul>
    </div>
  )
}

export default ProfileMenu
