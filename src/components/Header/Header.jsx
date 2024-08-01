import React, { useContext } from 'react';
import logo from '../../images/logo.png'
import './Header.css'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    // eslint-disable-next-line no-unused-vars
    const [loggedInUserShared, setLoggedInUserShared] = useContext(UserContext);
    return (
        <div className='header'>
            <Link to="/">
                <img src={logo} alt="" />
            </Link>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <button onClick={() => { setLoggedInUserShared({}) }}>Sign out</button>
            </nav>
        </div>
    );
};

export default Header;