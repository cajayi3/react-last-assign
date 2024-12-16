import { Link } from 'react-router-dom';
import React from 'react';
import Button from './Button';
import '../../src/css/App.css';
import { useAuth0 } from '@auth0/auth0-react';

const Nav: React.FC = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const signOutonClick = () => {
        logout({ logoutParams: { returnTo: window.location.origin }});
    };

    const signInOnClick = () => {
        loginWithRedirect();
    };

              return (
                <nav className='navbar'>
                    <ul className='navbar-list'>
                        <li className='navbar-item'>
                            <Link to='/'>Home</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to='/About/About'>About</Link>
                        </li>
                        <li className='navbar-item'>
                            <Link to='/Dashboard/Dashboard'>Characters</Link>
                        </li>
                        {
                        isAuthenticated ? (
                        <Button 
                            className="navbar-auth"
                            onClick={ signOutonClick }>
                            Log Out
                        </Button>
                        ) : (
                        <Button 
                            className="navbar-auth"
                            onClick={ signInOnClick }>
                            Log In
                        </Button>
                        )}
                    </ul>
                    <input type='text' placeholder='Search...' />
                    
                </nav>
            )
        };


export default Nav;