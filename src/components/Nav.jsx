import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Nav.scss'
import { } from '../config/firebase'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import SearchBar from './SearchBar'
import HamburgerMenu from './HamburgerMenu'

function Nav() {

    const [user, setUser] = useState(false);

    const auth = getAuth();

    const handleSignOut = async () => {
        const res = await signOut(auth)

    };

    useEffect(() => {
        onAuthStateChanged(auth, () => { setUser(auth.currentUser) })
    });


    const onSuccess = (data) => {
        console.log(data.data)
    };

    const onError = (error) => {
        console.log(error)
    };

    return (
        <div className='navbar-ctn'>
            <Link className='nav-btn logo' to='/'>MyFi</Link>
            < SearchBar />
            <div className='buttons-ctn'>
                <Link className='nav-btn' to='/'>Home</Link>
                <Link className='nav-btn' to='/discover'>Discover</Link>
                {auth.currentUser &&
                    <Link className='nav-btn' to='/watchlist'>Watchlist</Link>
                }
                <Link className='nav-btn' to='/login'>Login</Link>
                {
                    !auth.currentUser
                        ? <Link className='nav-btn' to='/signup'>Sign up</Link>
                        : <div className='nav-btn' onClick={() => handleSignOut()}>Log out</div>
                }
                <HamburgerMenu user={auth.currentUser} />
            </div>
        </div>
    )
};

export default Nav;