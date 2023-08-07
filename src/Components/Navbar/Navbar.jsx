import React from 'react'
import {Link} from 'react-dom'
function Navbar() {
  return (
    <div>
        <nav>
            <ul>
                <li><Link to='/search'>Search</Link></li>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/account'>Account</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar