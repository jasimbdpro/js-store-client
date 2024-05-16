import React from 'react';
import logo from '../../images/logo.png'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <img src={logo} alt="" />
            <nav>
                <a href="/ema-john-simple/shop">Shop</a>
                <a href="/ema-john-simple/review">Order Review</a>
                <a href="/ema-john-simple/inventory">Manage Inventory</a>
            </nav>
        </div>
    );
};

export default Header;