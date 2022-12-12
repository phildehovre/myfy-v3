import React from 'react'
import './HamburgerMenu.scss'
function Dropdown({ show }) {

    // Styling in HamburgerMenu.scss

    return (
        <>
            {
                show &&
                <div className='dropdown-ctn'>
                    <li className='menu-item'>Settings</li>
                    <li className='menu-item'>watchlist</li>
                    <li className='menu-item'>Discover</li>
                </div>
            }
        </>
    )
}

export default Dropdown