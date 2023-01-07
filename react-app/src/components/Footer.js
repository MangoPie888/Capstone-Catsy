import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import github from '../assets/github.svg'

const Footer = () => {
  return (
    <div className='footer-container'>
    
     <p>Let's connect</p>
      <a href='https://github.com/MangoPie888/Capstone-Catsy'>
        <img src={github} alt='github-logo' />
      </a>
    </div>
  )
}

export default Footer
