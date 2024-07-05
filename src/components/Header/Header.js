import React from 'react';
import logo from '../../images/logo.png'
import './Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header'>
            <Link to="/">
                <img src={logo} alt="" />
            </Link>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <Link to="/login">Login</Link>
            </nav>
        </div>
    );
};

export default Header;