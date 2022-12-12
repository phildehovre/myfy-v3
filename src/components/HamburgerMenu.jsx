import React, { useState } from 'react'
import './HamburgerMenu.scss'
import Dropdown from './Dropdown'

function HamburgerMenu() {

    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className='menu-wrapper' onClick={() => { setShowMenu(!showMenu) }}>
            <div className='menu_icon-ctn' ></div>
            <Dropdown show={showMenu} />
        </div>
    )
}

export default HamburgerMenu