import React from 'react'
import {Link} from 'react-router-dom'
 
const Footer = () => {
  return (
    <div className='footer'>
        <h4 className='mt-3'>All Right Reserved <span style={{color:'blue'}}>&copy;</span></h4>
        <p>
          <Link to='/about'>ABOUT</Link>
          |
          <Link to='/contact'>CONTACT</Link>
          |
          <Link to='/policy'>POLICY</Link>
        </p>
    </div>
  )
}

export default Footer