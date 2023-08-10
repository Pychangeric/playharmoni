import React from 'react'
import Links from '../Links/Links'
import './Sidebar.css'
import Logo from '../Logo/Logo'
function Sidebar() {
   return (

 <div className='sidebar'>
   <div className='logo'>
     <Logo />
  </div>
  <Links />
 
 </div>
   )
 }

export default Sidebar